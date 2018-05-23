import mime from "mime-types";
import path from "path";

const promisify = func => (...args) => new Promise((resolve, reject) => func(...args, resolve, reject));
const promisifyProgress = func => (arg, progress) => new Promise((resolve) => func(arg, resolve, progress));


const findFiles = (entries) => {
  const files = {
    object: null,
    material: null,
    textures: [],
  };

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    if (entry.directory) {
      continue;
    }

    const fileName = path.basename(entry.filename);
    const isHidden = fileName[0] === '.' || fileName.slice(0, 2) === '__';
    if (isHidden) {
      continue;
    }

    const extension = fileName.slice(-3).toLowerCase();

    switch (extension) {
      case 'obj':
        files.object = entry;
        break;
      case 'mtl':
        files.material = entry;
        break;
      case 'png':
      case 'jpg':
      case 'bmp':
      case 'tif':
      case 'tga':
        files.textures.push(entry);
        break;
      default:
        const type = mime.lookup(extension);
        if (type && type.slice(0, 5) === 'image') {
          files.textures.push(entry);
        }
    }
  }

  return files;
};
const handleError = (error) => {
    // this.setState(error);
};

const createObjectURI = (blob)=> {
    if (!blob) return null;
    return URL.createObjectURL(blob);
  };

const  deleteObjectURI = (uri)=> {
    if (!uri) return;

    URL.revokeObjectURL(uri);
  };

const unzipBlob = (zipFile) => {
    const zip = window.zip;
    let zipReader;

    return promisify(zip.createReader)(new zip.BlobReader(zipFile))
      .then((_zipReader) => {
        zipReader = _zipReader;
        return promisify(zipReader.getEntries.bind(zipReader))();
      })
      .then((entries) => {
        const {object, material, textures} = findFiles(entries);

        if (!object) {
          throw new Error('Mesh file in .OBJ format is not found!');
        }

        // this.setState({
        //   files: [object.filename, material && material.filename, ...textures.map(texture => texture.filename)],
        //   types: ['Object', 'Material', ...textures.map(() => 'Texture')]
        // });

        // +!!var will be 0 if the var is empty and 1 if it isn't
        const filesCount = +!!object + +!!material + textures.length;

        // this.setState({filesCount});

        let totalProgress = 0;

        const onProgress = (index) => {
          return (current, total) => {
            // React goes crazy when I want to show progress
            // this.setState({progress});
            const value = current / total;
            totalProgress += value / filesCount;
            // this.updateProgress(index, value, totalProgress);
          }
        };

        const loadTextures = () => {
          return textures.map((texture, i) =>
            promisifyProgress(texture.getData.bind(texture))(new zip.BlobWriter(mime.contentType(texture.filename.slice(-3))), onProgress(2 + i))
              .then(data => ({name: texture.filename, data})),
          );
        };

        return Promise.all([
          promisifyProgress(object.getData.bind(object))(new zip.BlobWriter('text/plain'), onProgress(0)),
          material ? promisifyProgress(material.getData.bind(material))(new zip.BlobWriter('text/plain'), onProgress(1)) : null,
          ...loadTextures(),
        ]);
      })
      .then(([object, material, ...textures]) => {
        zipReader.close();
        return {object, material, textures};
      })
      .catch(handleError);
  };

const loadurl = (url,callback)=>{
  fetch(url)
      .then(res => res.arrayBuffer())
      .then((buffer) => {
        const blob = new Blob([buffer], {type: 'application/octet-stream'});
        return unzipBlob(blob);
      })
      .then(({object, material, textures}) => {
        const uris = {
          objectUri: createObjectURI(object),
          materialUri: createObjectURI(material),
          textures: textures.map(texture => ({uri: createObjectURI(texture.data), name: texture.name})),
        };

        callback(null,uris);
      })
      .then((e) => {
        console.log(e);
        // callback(null,null);
      })
      .catch((e) => {
          console.log(e);
        // callback(null,null);
      })
}

export {loadurl};
