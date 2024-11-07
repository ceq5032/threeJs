
import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';


// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// create a new renderer by instating the canvas element in our HTML // file
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
const geometry = new THREE.BoxGeometry(10, 10, 10);

// Textures
const losTexture = new THREE.TextureLoader().load('images/losAngeles.jpg');
const laTexture = new THREE.TextureLoader().load('images/laLogo.jpg');
const skyTexture = new THREE.TextureLoader().load('images/night_sky.jpg');
const texTexture = new THREE.TextureLoader().load('images/texture.jpg');

//set the color of the basic material in the object parameters `{}`

const material = new THREE.MeshStandardMaterial( { color:0x6347FF, map:laTexture} );

const cube = new THREE.Mesh( geometry, material );
cube.position.z = -25;
cube.position.x = -1;
cube.rotation.x = 2;
cube.rotation.y = .8;


const ico = new THREE.IcosahedronGeometry(15, 1);
const icoMaterial = new THREE.MeshPhongMaterial({ color:0x33AADD, map:texTexture, shininess:75});

const icoMesh = new THREE.Mesh(ico, icoMaterial);
// object.position.set ( x, y, z );
icoMesh.position.set(80, -10, -65)
// icoMesh.position.z= -20;
// icoMesh.position.x= 30;

const sphereGeo = new THREE.SphereGeometry( 20, 32, 16 );
const sphereMaterial = new THREE.MeshBasicMaterial( { map:skyTexture } );
const sphere = new THREE.Mesh( sphereGeo, sphereMaterial ); scene.add( sphere );
// object.position.set ( x, y, z );
sphere.position.set(-80,15,-45)


// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-80, -10, -10);

const pointLight2 = new THREE.PointLight(0xffffff);
pointLight2.position.set(50, 30, -20);

const pointLight3 = new THREE.PointLight(0xffffff);
pointLight3.position.set(200, -100, 50);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(25, -15, -350);


scene.add(pointLight);
scene.add(pointLight2);
scene.add(pointLight3);
scene.background = losTexture;
scene.add(cube);
scene.add(ambientLight);
scene.add(icoMesh);
scene.add(sphere)


//Render the scene:
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(40);
camera.position.setX(-3);
camera.position.setY(10);
renderer.render(scene, camera);

function animate() {
    requestAnimationFrame( animate );
    // slowly rotate the cube:
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    // rotate the icosahedron a little faster in the opposite direction:
    icoMesh.rotation.x += -0.01
    icoMesh.rotation.z += -0.001
    sphere.rotation.x += -0.01
    sphere.rotation.z += -0.001

    renderer.render( scene, camera );
}

animate();


