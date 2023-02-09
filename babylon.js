const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  // var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(-35,10,-10 ), scene);

  // // This targets the camera to scene origin
  // camera.setTarget(BABYLON.Vector3.Zero());

  // camera.attachControl(canvas, true);
  // const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
  // const myPoints = [
  //     new BABYLON.Vector3(-2, -1, 0),
  //     new BABYLON.Vector3(0, 1, 0),
  //     new BABYLON.Vector3(2, -1, 0),
  //     new BABYLON.Vector3(2, -1, 0),
  //     new BABYLON.Vector3(2, -1, 3),
  //     new BABYLON.Vector3(1, -2, 3),
  //     new BABYLON.Vector3(1, -2, 0),
  //     new BABYLON.Vector3(2, -1, 0),
  //     new BABYLON.Vector3(1, -2, 0),
  //     new BABYLON.Vector3(1, 0, 0),
  //     new BABYLON.Vector3(-1, -2, 0),
  //     new BABYLON.Vector3(-1, 0, 0),
  //     new BABYLON.Vector3(1, -2, 0),
  //     new BABYLON.Vector3(0, -1, 0),
  //     new BABYLON.Vector3(0, 1, 0),
  //     new BABYLON.Vector3(-2, -1, 0),
  //     new BABYLON.Vector3(-2, -1, 0),
  //     new BABYLON.Vector3(-2, -1, 3),
  //     new BABYLON.Vector3(-1, -2, 3),
  //     new BABYLON.Vector3(-1, -2, 0),
  //     new BABYLON.Vector3(-2, -1, 0),
  //     new BABYLON.Vector3(-1, -2, 0),
  //     new BABYLON.Vector3(-1, -2, 1.5),
  //     new BABYLON.Vector3(0, -1, 1.5),
  //     new BABYLON.Vector3(1, -2, 1.5),
  //     new BABYLON.Vector3(1, -2, 3),
  //     new BABYLON.Vector3(0, -1, 3),
  //     new BABYLON.Vector3(0, -1, 1.5),
  //     new BABYLON.Vector3(0, -1, 3),
  //     new BABYLON.Vector3(-1, -2, 3)
  // ]

  // // Create our own manager:
  // var FreeCameraKeyboardRotateInput = function () {
  //     this._keys = [];
  //     this.keysLeft = [37];
  //     this.keysRight = [39];
  //     this.sensibility = 0.01;
  // }

  // const lines = BABYLON.MeshBuilder.CreateLines("lines", {points: myPoints});

  //底色設定
  scene.clearColor = new BABYLON.Color4(0, 0, 0.1, 1);

  //相機設定
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI / -3,
    Math.PI / 3,
    3,
    new BABYLON.Vector3(0, 1, 0)
  );

  camera.attachControl(canvas, true);
  camera.lowerAlphaLimit = -Math.PI / 2 - Math.PI / 4;
  camera.upperAlphaLimit = -Math.PI / 2 + Math.PI / 2;
  camera.lowerBetaLimit = Math.PI / 2 - Math.PI / 6;
  camera.upperBetaLimit = Math.PI / 5 + Math.PI / 6;
  camera.lowerRadiusLimit = -Math.PI / 0.5;
  camera.upperRadiusLimit = Math.PI / 0.5;
  camera.wheelPrecision = 500000; //电脑滚轮速度 越小灵敏都越高
  camera.pinchPrecision = 500000;
  camera.inertia; //相机惯性
  camera.targetScreenOffset.x = 0; //相机X轴偏移量
  camera.targetScreenOffset.y = 1; //相机Y轴偏移量

  //光照設定
  var light01 = new BABYLON.SpotLight(
    "spotLight1",
    new BABYLON.Vector3(0, 1.5, 0),
    new BABYLON.Vector3(0, -110, 0),
    Math.PI / 1,
    50,
    scene
  );
  light01.intensity = 20;
  light01.diffuse = new BABYLON.Color3(0, 0.5, 0.5);
  light01.specular = new BABYLON.Color3(0.5, 0.5, 0);

  const hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData(
    "environment.env",
    scene
  );

  hdrTexture.gammaSpace = false;

  scene.environmentTexture = hdrTexture;

  const light03 = new BABYLON.HemisphericLight(
    "Hemi0",
    new BABYLON.Vector3(5, 1, 5),
    scene
  );

  //物件引入
  BABYLON.SceneLoader.ImportMesh(
    "",
    "",
    "cubeMove.glb",
    scene,
    function (newMeshes, particleSystems, skeletons, animationGroups) {
      var hero = newMeshes[0];

      //Scale the model down
      hero.scaling.scaleInPlace(0.5);
    }
  );


  return scene;
};

const sceneToRender = createScene();
engine.runRenderLoop(function () {
  sceneToRender.render();
});
