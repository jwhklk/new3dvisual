/**`
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Tree } from 'antd';
import 'antd/dist/antd.css';
import './devicetree.css';
import Img from '../img/1.png';
const TreeNode = Tree.TreeNode;

class Treelist extends React.Component {
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  render() {
    return (
      <Tree
        showLine
        defaultExpandedKeys={['0-0-0']}
        onSelect={this.onSelect}
      >
        <TreeNode title="parent 1" key="0-0">
          <TreeNode title="parent 1-0" key="0-0-0">
            <TreeNode title="leaf" key="0-0-0-0" className="showicon"><div className="icon"><img src={Img} /></div></TreeNode>
            <TreeNode title="leaf" key="0-0-0-1" className="showicon"><div className="icon"><img src={Img} /></div></TreeNode>
            <TreeNode title="leaf" key="0-0-0-2" className="showicon"><div className="icon"><img src={Img} /></div></TreeNode>
          </TreeNode>
          <TreeNode title="parent 1-1" key="0-0-1">
            <TreeNode title="leaf" key="0-0-1-0" />
          </TreeNode>
          <TreeNode title="parent 1-2" key="0-0-2">
            <TreeNode title="leaf" key="0-0-2-0" />
            <TreeNode title="leaf" key="0-0-2-1" />
          </TreeNode>
        </TreeNode>
      </Tree>
    );
  }
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="devicetreePage">
                <div className="title">
                    产品目录
                </div>
                <div className="search">
                    <input type="text" placeholder="搜索产品关键词" />
                </div>
                <div className="tree">
                    <Treelist />
                </div>
            </div>
        );
    }
}
export default Page;