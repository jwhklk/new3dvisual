import React from 'react';
import { connect } from 'react-redux';
let resizetimecontent = null;

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    onWindowResize=()=> {
        window.clearTimeout(resizetimecontent);
        resizetimecontent = window.setTimeout(()=>{
        	console.log("reload modelName");
			this.load3d({
	        	loadfile : `obj/${this.props.showmodel}.obj`,
	        	loadmtl : `obj/${this.props.showmodel}.mtl`
			});
        }, 500)
    }

    load3d =(v)=>{
      	const threeConfig = v;
		// console.log("threeConfig");
		// console.log(threeConfig);
      	const THREE = window.THREE;
      	var OBJLoader2Example = (function () {
				var Validator = THREE.LoaderSupport.Validator;
				function OBJLoader2Example( elementToBindTo ) {
					this.renderer = null;
					this.canvas = elementToBindTo;
					this.aspectRatio = 1;
					// this.recalcAspectRatio();
					this.scene = null;
					this.cameraDefaults = {
						posCamera: new THREE.Vector3( 0.0, 1000.0, 2000.0 ),
						posCameraTarget: new THREE.Vector3( 0, 0, 0 ),
						near: 0.1,
						far: 1000000,
						fov: 45
					};
					this.camera = null;
					this.cameraTarget = this.cameraDefaults.posCameraTarget;
					this.controls = null;
				}
				OBJLoader2Example.prototype.initGL = function () {
					this.renderer = new THREE.WebGLRenderer( {
						canvas: this.canvas,
            			preserveDrawingBuffer:true,
            			precision:'highp',
						antialias: true,
						autoClear: true
					} );
					this.renderer.setClearColor( 0xEEEEEE );//0x1f2428
					this.scene = new THREE.Scene();
					this.camera = new THREE.PerspectiveCamera( this.cameraDefaults.fov, this.aspectRatio, this.cameraDefaults.near, this.cameraDefaults.far );

					// this.camera.setFocalLength ( 330 );
					// this.camera.lookAt( this.cameraTarget );

					this.resetCamera();
					this.controls = new THREE.TrackballControls( this.camera, this.renderer.domElement );
					// this.controls = new THREE.FirstPersonControls( this.camera, this.renderer.domElement );

					// this.controls.movementSpeed = 500;
		   //          this.controls.lookSpeed = 0.1;
		   //          this.controls.lookVertical = true;

					var ambientLight = new THREE.AmbientLight( 0xFFFFFF ); //0xFFFFFF
					var directionalLight1 = new THREE.DirectionalLight( 0xC0C090 );//0xC0C090
					var directionalLight2 = new THREE.DirectionalLight( 0xC0C090 );//0xC0C090
					directionalLight1.position.set( -100, -50, 100 );
					directionalLight2.position.set( 100, 50, -100 );
					this.scene.add( directionalLight1 );
					this.scene.add( directionalLight2 );
					this.scene.add( ambientLight );
					// var helper = new THREE.GridHelper( 1200000, 60, 0xFF4444, 0x404040 );
					// this.scene.add( helper );
				};
				OBJLoader2Example.prototype.initContent = function () {
					var modelName = 'female02';
					this._reportProgress( { detail: { text: 'Loading: ' + modelName } } );
					var scope = this;
					var objLoader = new THREE.OBJLoader2();
					var callbackOnLoad = ( event )=> {
						scope.scene.add( event.detail.loaderRootNode );
						console.log(event);
						console.log( 'Loading complete: ' + event.detail.modelName );

						var objects = event.detail.loaderRootNode;
						// console.log(objects)
						// objects.children[10].geometry.computeBoundingBox();
						// console.log(objects);
						// console.log(objects.children[10].geometry.boundingBox.max.x);
						// objects.rotation.x = THREE.Math.degToRad( 45 );
						// objects.rotation.y = THREE.Math.degToRad( 45 );
						console.log(scope.cameraTarget);
						// for ( var i = 0; i < objects.children.length; i ++ ) {
						// 	objects.children[i].lookAt( scope.cameraTarget );
						// }

						this.camera.aspect = this.aspectRatio;
						// console.log(this.cameraTarget);
						this.camera.lookAt( this.cameraTarget );
						this.camera.updateProjectionMatrix();

						console.log(this.camera);

						// console.log(- ( objects.children[10].geometry.boundingBox.max.x + objects.children[10].geometry.boundingBox.min.x ) / 2);
			            // console.log(- ( objects.children[10].geometry.boundingBox.max.y + objects.children[10].geometry.boundingBox.min.y ) / 2);
			            // console.log(- ( objects.children[10].geometry.boundingBox.max.z + objects.children[10].geometry.boundingBox.min.z ) / 2);
			            // console.log( objects.children[10].geometry.center() );
						console.log(objects.children[10]);
						scope._reportProgress( { detail: { text: '' } } );
					};
					// https://threejs.org/examples/obj/male02/
					var onLoadMtl = function ( materials ) {
						objLoader.setModelName( modelName );
						objLoader.setMaterials( materials );
						objLoader.setUseIndices( true );
						objLoader.setDisregardNormals( false );
						objLoader.getLogger().setDebug( true );
						objLoader.load( threeConfig.loadfile, callbackOnLoad, null, null, null, false );
					};
					objLoader.loadMtl( threeConfig.loadmtl, 'center', null, onLoadMtl );

				};
				OBJLoader2Example.prototype._reportProgress = function( event ) {
					var output = Validator.verifyInput( event.detail.text, '' );
					console.log( 'Progress: ' + output );
				};
				OBJLoader2Example.prototype.resizeDisplayGL = function () {
					this.controls.handleResize();
					this.recalcAspectRatio();
					this.renderer.setSize( this.canvas.offsetWidth, this.canvas.offsetHeight, false );
					this.updateCamera();
				};
				OBJLoader2Example.prototype.recalcAspectRatio = function () {
					this.aspectRatio = ( this.canvas.offsetHeight === 0 ) ? 1 : this.canvas.offsetWidth / this.canvas.offsetHeight;
				};
				OBJLoader2Example.prototype.resetCamera = function () {
					this.camera.position.copy( this.cameraDefaults.posCamera );
					this.cameraTarget.copy( this.cameraDefaults.posCameraTarget );
					// this.updateCamera();
				};
				OBJLoader2Example.prototype.updateCamera = function () {
					this.camera.aspect = this.aspectRatio;
					// console.log(this.cameraTarget);
					this.camera.lookAt( this.cameraTarget );
					this.camera.updateProjectionMatrix();
					// console.log(this.camera);
				};
				OBJLoader2Example.prototype.render = function () {
					if ( ! this.renderer.autoClear ) this.renderer.clear();
					this.controls.update();
					this.renderer.render( this.scene, this.camera );
				};
				return OBJLoader2Example;
			})();
			var app = new OBJLoader2Example( document.getElementById( 'example' ) );
			var resizeWindow = function () {
				app.resizeDisplayGL();
			};
			var render = function () {
				requestAnimationFrame( render );
				app.render();
			};
			window.addEventListener( 'resize', resizeWindow, false );
			console.log( 'Starting initialisation phase...' );
			app.initGL();
			app.resizeDisplayGL();
			app.initContent();
			render();
    }

    componentDidMount() {
      	this.load3d({
        	loadfile : `obj/${this.props.showmodel}.obj`,
        	loadmtl : `obj/${this.props.showmodel}.mtl`
		});
		window.addEventListener('resize', this.onWindowResize);
		window.setTimeout(()=>{
			this.load3d({
	        	loadfile : `obj/${this.props.showmodel}.obj`,
	        	loadmtl : `obj/${this.props.showmodel}.mtl`
			});
		},500);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    componentWillReceiveProps (nextProps) {
		if(nextProps.showmodel !== this.props.showmodel){
			this.load3d({
	        	loadfile : `obj/${nextProps.showmodel}.obj`,
	        	loadmtl : `obj/${nextProps.showmodel}.mtl`
			});
		}
		window.removeEventListener('resize', this.onWindowResize);
	}

    render() {
        return (
            <div id="glFullscreen">
            	<canvas id="example"></canvas>
          	</div>
        );
    }
}

const mapStateToProps = ({data:{showmodel}}) => {
    return { showmodel };
}
export default connect(mapStateToProps)(Page);
