function Store3D() {
    this.scene = null;//场景
    this.camera = null;//相机
    this.renderer = null;//渲染器
    this.objects = [];//场景中所有对象的集合
}

/**
 * 初始化仓库所有插件
 */
Store3D.prototype.initMain = function () {
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initBuilding();
    this.initLight();
},
    /**
     * 仓库整体开始运行
     */
    Store3D.prototype.start = function () {
        this.initMain();
        this.animate();
    },

    /**
     初始化场景，仅仅需要有句话就可以生命一个场景，非常简单
     **/
    Store3D.prototype.initScene = function () {
        this.scene = new THREE.Scene();
    },
    /**
     初始化场景，因为我们做的工厂模型，尽可能的接近于真实情景，采用透视相机
     **/
    Store3D.prototype.initCamera = function () {
        //声明一个透视相机，
        // 视角：60，
        // 纵横比aspect:全屏，使用的是浏览器的宽度/高度
        //近平面near：0.1
        //远平面视角far:10000
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
        /*
        设置相机位置，注意threejs中的坐标系采用的是右手坐标系
         */
        this.camera.position.x = 0;
        this.camera.position.y = 1600;
        this.camera.position.z = 1000;
        //相机的朝向
        this.camera.lookAt(0, 0, 0);
        //将相机放到场景中
        this.scene.add(this.camera);
    },
    /**
     声名渲染器
     **/
    Store3D.prototype.initRenderer = function () {
        this.renderer = new THREE.WebGLRenderer(
            {
                antialias: true,//是否开启反锯齿，设置为true开启反锯齿。
                alpha: true,//是否可以设置背景色透明。
                logarithmicDepthBuffer: true//模型的重叠部位便不停的闪烁起来。这便是Z-Fighting问题，为解决这个问题，我们可以采用该种方法
            }
        );
        this.renderer.setSize(window.innerWidth, window.innerHeight);//渲染器的尺寸与windows的尺寸相同
        this.renderer.setClearColor(0x39609B);//设置渲染的背景颜色
        this.renderer.setPixelRatio(window.devicePixelRatio);//设置渲染器的分辨率与浏览器电脑本身的分辨率相同
        //将渲染器添加到我们的网页中，可以将渲染的内容在网页中显示出来
        let container = document.getElementById("container");
        container.appendChild(this.renderer.domElement);
    },
    /**
     * 初始化灯光
     */
    Store3D.prototype.initLight=function(){
        //首先添加个环境光
        let ambient = new THREE.AmbientLight(0xffffff, 1); //AmbientLight,影响整个场景的光源
        ambient.position.set(0, 0, 0);
        this.addObject(ambient);
        //添加平行光,平行光类似于太阳光
        let directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);//模拟远处类似太阳的光源
        directionalLight.position.set(0, 200, 0);
        this.addObject(directionalLight);
        //设置点光源
        let pointLight1=new THREE.PointLight(0xffffff, 0.3);
        pointLight1.position.set(-500,200,0);
        this.addObject(pointLight1);
        let pointLight2=new THREE.PointLight(0xffffff, 0.3);
        pointLight2.position.set(500,200,0);
        this.addObject(pointLight2);
    },

    /**
     * 向场景中添加物体，并记录到
     */
    Store3D.prototype.addObject = function (object) {
        this.scene.add(object);
        this.objects.push(object);
    },
    /**
     创建建筑物
     */
    Store3D.prototype.initBuilding = function () {
        let buildingData = buildingObjects.objects;
        for (let i = 0; i < buildingData.length; i++) {
            let object = buildingData[i];
            switch (object.objectType) {
                case "cube":
                    let cube = new Cube(object);
                    this.addObject(cube);
            }
        }
    },
    
    /**
     * 定时重复刷新
     */
    Store3D.prototype.animate = function () {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }



