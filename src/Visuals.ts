import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Visuals {
  canvas;
  scene;
  camera;
  renderer;
  orbitControls;
  fontLoader;
  // text;
  sizes: { width: number; height: number };
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );
    this.camera.position.z = 30;
    this.scene.add(this.camera);
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.configRenderer();
    window.addEventListener("resize", () => this.resize());
    this.orbitControls = new OrbitControls(this.camera, this.canvas);
    this.orbitControls.enableDamping = true;
    this.orbitControls.enabled = false;
    this.fontLoader = new THREE.FontLoader();
    // this.text = new THREE.Group();
    // this.scene.add(this.text);
    // this.createText("Welcome to SafeSpace, join the waiting list");
  }
  configRenderer(): void {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  resize() {
    // Update sizes
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;
    // Update camera
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
    // Update renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  createText(target: THREE.Group, text: string, offsetY: number = 0): void {
    this.fontLoader.load("/fonts/ArkitechStencil_Regular.json", (font) => {
      const textGeometry = new THREE.TextGeometry(text, {
        font,
        size: 1.5,
        height: 0.2,
        curveSegments: 6,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4,
      });

      textGeometry.center();
      const textMaterial = new THREE.MeshBasicMaterial();
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      // textMesh.position.set(2, 2, 2);
      textMesh.position.y += offsetY;
      target.add(textMesh);
    });
  }
}
