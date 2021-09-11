import * as THREE from "three";
import Visuals from "./Visuals";
import gsap from "gsap";

const runThreeCanvas = (): void => {
  console.log(window.location.pathname);
  let canvas: HTMLCanvasElement | null;
  canvas = document.querySelector("#canvas");
  if (canvas) {
    const visuals = new Visuals(canvas);
    visuals.scene.background = new THREE.Color(0x86c166);

    let makeTransition: boolean = false;
    const doTransition = (): void => {
      gsap.to(transitionMaterial.uniforms.uAlpha, { duration: 3, value: 1 });
      window.location.assign(`http://localhost:3000/#mission`);
    };
    const transitionHandler = (e: WheelEvent): void => {
      if (!makeTransition) {
        if (e.deltaY > 100) {
          makeTransition = true;
          doTransition();
          console.log(visuals.text.children.length);
          visuals.createText(
            "WHHHEEEPPPPPPP",
            e.deltaY * (Math.random() - 0.5) * 0.2
          );
        }
      }
    };
    window.addEventListener("wheel", transitionHandler);

    window.addEventListener("hashchange", () => {
      console.log("triggered");
    });

    // transition screen
    const transitionGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    const transitionMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uAlpha: { value: 0 },
      },
      vertexShader: `
    void main ()
    {
      gl_Position = vec4(position, 1.);
    }
  `,
      fragmentShader: `
    uniform float uAlpha;
    void main ()
    {
      gl_FragColor = vec4(0.,0.,0.,uAlpha);
    }
  `,
      transparent: true,
    });
    const transitionScreen = new THREE.Mesh(
      transitionGeometry,
      transitionMaterial
    );
    visuals.scene.add(transitionScreen);

    const tick = (): void => {
      if (makeTransition) {
      }
      visuals.renderer.render(visuals.scene, visuals.camera);
      window.requestAnimationFrame(tick);
    };
    tick();
  }
};
export default runThreeCanvas;
