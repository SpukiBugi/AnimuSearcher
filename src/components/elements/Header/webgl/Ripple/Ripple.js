import React, { Component } from 'react';

import fragmentShader from './shaders/fragmentShader.js';
import vertexShader from './shaders/vertexShader.js';

const image = "/images/head_back_sc.jpg";

let geometry = "";
let material = "";
let uniforms = "";
let mesh = "";

let rtTexture = "";
let rtTexture2 = "";

let mouse = {
  x: 0,
  y: 0
};
let press_time = "";


/*eslint-disable no-undef*/
class Ripple extends Component {

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.initMesh();
  }

  // Инициализация меша
  initMesh = () => {
    let divisor = 1 / 8;
    let textureFraction = 1 / 1;

    const loader = new THREE.TextureLoader();

    let texture, environment, pooltex;
    loader.load(
      '/images/noise.png',
      (tex) => {
        texture = tex;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.minFilter = THREE.LinearFilter;
        
        loader.load( 
          '/images/env_lat-lon.png',
          function environment_load(tex) {
            environment = tex;
            environment.wrapS = THREE.RepeatWrapping;
            environment.wrapT = THREE.RepeatWrapping;
            environment.minFilter = THREE.NearestMipMapNearestFilter;
            
            loader.load(
              image,
              function environment_load(tex) {
                pooltex = tex;
                pooltex.wrapS = THREE.RepeatWrapping;
                pooltex.wrapT = THREE.RepeatWrapping;
                pooltex.minFilter = THREE.NearestMipMapNearestFilter;
                
                onTexLoad();
                animate();
              }
            )
          }
        );
      }
    );

    let onTexLoad = () => {
      geometry = new THREE.PlaneBufferGeometry( 2, 2 );

      rtTexture = new THREE.WebGLRenderTarget(Math.floor(this.props.pWidth * textureFraction), Math.floor(this.props.pHeight * textureFraction), { type: THREE.FloatType, minFilter: THREE.NearestMipMapNearestFilter });
      
      rtTexture2 = new THREE.WebGLRenderTarget(Math.floor(this.props.pWidth * textureFraction), Math.floor(this.props.pHeight * textureFraction), { type: THREE.FloatType, minFilter: THREE.NearestMipMapNearestFilter });
      
      let scale;
      let offset = new THREE.Vector2();

      uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2() },
        u_img: { type: "v2", value: new THREE.Vector2(pooltex.image.width, pooltex.image.height)},
        u_noise: { type: "t", value: texture },
        u_buffer: { type: "t", value: rtTexture.texture },
        u_texture: { type: "t", value: pooltex }, 
        u_environment: { type: "t", value: environment },
        u_mouse: { type: "v3", value: new THREE.Vector3() },
        u_frame: { type: "i", value: -1. },
        u_renderpass: { type: 'b', value: false },
        u_scale: {type: "f", value: scale},
        u_offset: {type: "v2", value: offset}
      };

      material = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      } );
      material.extensions.derivatives = true;

      mesh = new THREE.Mesh( geometry, material );

      this.props.updateMesh(mesh);
  

      let onWindowResize = () => {
        const width = this.props.pBox.clientWidth;
        const height = this.props.pBox.clientHeight;
        
        uniforms.u_resolution.value.x = width;
        uniforms.u_resolution.value.y = height;
        rtTexture = new THREE.WebGLRenderTarget(width * textureFraction, height * textureFraction);
        rtTexture2 = new THREE.WebGLRenderTarget(width * textureFraction, height * textureFraction);
        
        uniforms.u_frame.value = -1;

        /** Замуты с позицией и размером изображения */
        const width_ratio = this.props.pWidth / pooltex.image.width;
        const height_ratio = this.props.pHeight / pooltex.image.height;

        scale = Math.max(width_ratio, height_ratio);
        uniforms.u_scale.value = scale;

        let img_height = pooltex.image.height * scale;
        let img_width = pooltex.image.width * scale;
        let box_height = this.props.pHeight;
        let box_width = this.props.pWidth;
        uniforms.u_offset.value.y = ( img_height - box_height) / img_height;
        uniforms.u_offset.value.x = 0;

        /** Смещение позиции направо на телефонах */
        if (window.innerWidth < 760) {
          uniforms.u_offset.value.x = (img_width - box_width) / img_width;
        }
      };

      onWindowResize();
      window.addEventListener( 'resize', onWindowResize, false );

      let ripple = (e)=> {
        clearTimeout(press_time);
        uniforms.u_mouse.value.z = 1;
        let ratio = this.props.pHeight / this.props.pWidth;
        if(this.props.pHeight > this.props.pWidth) {
          mouse.x = (e.pageX - this.props.pWidth / 2) / this.props.pWidth;
          mouse.y = (e.pageY - this.props.pHeight / 2) / this.props.pHeight * -1 * ratio;
        } else {
          mouse.x = (e.pageX - this.props.pWidth / 2) / this.props.pWidth / ratio;
          mouse.y = (e.pageY - this.props.pHeight / 2) / this.props.pHeight * -1;
        }

        press_time = setTimeout(() => {
          uniforms.u_mouse.value.z = 0;
        }, 100)
        
        // e.preventDefault();
      }
  
      this.props.pBox.addEventListener('pointermove', ripple);
      this.props.pBox.addEventListener('click', ripple);
      this.props.pBox.addEventListener('mouseout', ()=> {
        uniforms.u_mouse.value.z = 0;
      });
    };

    let animate = (delta) => {
      requestAnimationFrame( animate );
      render(delta);
    };

    let render = (delta) => {
      uniforms.u_frame.value++;
      
      uniforms.u_mouse.value.x += ( mouse.x - uniforms.u_mouse.value.x ) * divisor;
      uniforms.u_mouse.value.y += ( mouse.y - uniforms.u_mouse.value.y ) * divisor;
      
      this.props.updateRenderer();
      renderTexture(delta);
    };

    let renderTexture = (delta) => {      
      let odims = uniforms.u_resolution.value.clone();
      uniforms.u_resolution.value.x = this.props.pWidth * textureFraction;
      uniforms.u_resolution.value.y = this.props.pHeight * textureFraction;

      uniforms.u_buffer.value = rtTexture2.texture;
      
      uniforms.u_renderpass.value = true;
      
      window.rtTexture = rtTexture;
      this.props.setRenderTarget(rtTexture);
      
      let buffer = rtTexture;
      rtTexture = rtTexture2;
      rtTexture2 = buffer;

      uniforms.u_buffer.value = rtTexture.texture;
      uniforms.u_resolution.value = odims;
      uniforms.u_renderpass.value = false;
    }
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}


export default Ripple;