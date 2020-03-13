import React, { Component } from 'react';
import Ripple from '../Ripple/Ripple.js';


/*eslint-disable no-undef*/
class ThreeWrap extends Component {

  constructor(props) {
    super(props);

    this.state  = {
      loaded: false,
      box: "",
      width: window.innerWidth,   // ширина сцены (по умолчанию все окно)
      height: window.innerHeight,   // высота сцены (по умолчанию все окно)
  
      scene: new THREE.Scene(),
      camera: new THREE.Camera(),
      renderer: new THREE.WebGLRenderer(),
      mouse: "",
    }
  }

  componentDidMount() {
    window.addEventListener("load", () => {
      const box = document.querySelector(".scene-wrap");
      const width = box.clientWidth;
      const height = box.clientHeight;
      this.state.renderer.setSize( width, height );
      // this.state.renderer.setPixelRatio(window.devicePixelRatio);
    
      this.setState ({
        box: box,
        width: width,
        height: height,
        loaded: true,
      })
      box.appendChild( this.state.renderer.domElement );
  
      window.addEventListener("resize", this.updateSize);
      document.querySelector(".headLink").ondragstart = function () { return false; };
    })
  }

  componentWillUnmount() {
    console.log("unmount")
  }

  updateSize = () => {
    const width = this.state.box.clientWidth;
    const height = this.state.box.clientHeight;

    this.setState ({
      width: width,
      height: height,
      // camera: {
      //   // ...this.state.camera,
      //   aspect: width / height
      // },
    });

    // this.state.camera.updateProjectionMartix();
    this.state.renderer.setSize( width, height );
  }

  updateMesh = (mesh) => {
    this.state.scene.add(mesh);
  }

  updateRenderer = () => {
    this.state.renderer.render( this.state.scene, this.state.camera );
  }

  setRenderTarget = (texture) => {
    this.state.renderer.render( this.state.scene, this.state.camera, texture, true );
    // this.state.renderer.setRenderTarget(texture);
  }

  render() {
    return (
      <div className="three-wrap">
        <div className="scene-wrap">
        </div>
        {
          this.state.loaded && 
          <Ripple
            updateMesh = {this.updateMesh}
            updateRenderer = {this.updateRenderer}
            setRenderTarget = {this.setRenderTarget}
            pWidth = {this.state.width}
            pHeight = {this.state.height}
            pBox = {this.state.box}
          /> 
        }
      </div>
    )
  }
}


export default ThreeWrap;