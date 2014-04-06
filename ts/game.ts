/// <reference path='tsdef/three.d.ts' />
class Line {
    geometry: THREE.Geometry;
    material: THREE.LineBasicMaterial;
    color: THREE.Color = new THREE.Color(0x000000);
    line: THREE.Line;
    constructor(start: THREE.Vector3, end: THREE.Vector3, color?: number) {
        if (color) this.color = new THREE.Color(color);
        this.geometry = new THREE.Geometry();
        this.geometry.vertices.push(start);
        this.geometry.vertices.push(end);
        this.material = new THREE.LineBasicMaterial();
        this.material.color = this.color;
        this.line = new THREE.Line(this.geometry, this.material);
    }
}
class Game {
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    width: number = window.innerWidth;
    height: number = window.innerHeight;
    backgroundcolor: THREE.Color = new THREE.Color(0x000000);
    // Axis
    private axislength = 1000;
    private X: Line;
    private Y: Line;
    private Z: Line;
    constructor(container: HTMLElement, width?: number, height?: number, backgroundcolor?: number) {
        if (width) this.width = width;
        if (height) this.height = height;
        if (backgroundcolor) this.backgroundcolor = new THREE.Color(backgroundcolor);
        this.init(container);
        this.initAxis();
    }
    private initAxis() {
        this.X = new Line(
            new THREE.Vector3(-this.axislength, 0, 0),
            new THREE.Vector3(this.axislength, 0, 0),
            0xff0000
        );
        this.Y = new Line(
            new THREE.Vector3(0, -this.axislength, 0),
            new THREE.Vector3(0, this.axislength, 0),
            0x00ff00
        );
        this.Z = new Line(
            new THREE.Vector3(0, 0, -this.axislength),
            new THREE.Vector3(0, 0, this.axislength),
            0x0000ff
        );
    }
    private init(container: HTMLElement): void {
        // Init renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(this.backgroundcolor, 1);
        this.renderer.setSize(this.width, this.height);
        // init scene
        this.scene = new THREE.Scene();
        // init camera
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        this.camera.position.set(0, 0, 100);
//        this.camera.lookAt(this.scene.position);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.scene.add(this.camera);

        container.appendChild(this.renderer.domElement);

        this.renderGame();
    }
    renderGame() {
        this.renderer.render(this.scene, this.camera);
    }
    enableAxis() {
        this.scene.add(this.X.line);
        this.scene.add(this.Y.line);
        this.scene.add(this.Z.line);
        this.renderGame();
    }
    disableAxis() {
        this.scene.remove(this.X.line);
        this.scene.remove(this.Y.line);
        this.scene.remove(this.Z.line);
        this.renderGame();
    }
    drawAnimation() {
//        var cubegeometry = new THREE.CubeGeometry(1,1,1);
//        var cubematerial = new THREE.MeshBasicMaterial({wireframe: true, color: 0x000000});
//        var cube = new THREE.Mesh(cubegeometry, cubematerial);
//        this.scene.add(cube);
//        this.camera.position.set(1, 0.5, 4);
//        var material = new THREE.LineBasicMaterial({
//            color: 0xff0000
//        });
//        var geometry = new THREE.Geometry();
//        geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
//        geometry.vertices.push(new THREE.Vector3(0, 10, 0));
//        geometry.vertices.push(new THREE.Vector3(10, 0, 0));
//
//        var line = new THREE.Line(geometry, material);
//        this.scene.add(line);
        var line = new Line(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(10, -10, 0)
        );
        var radius   = 10,
            segments = 64,
            material = new THREE.LineBasicMaterial( { color: 0x000000 } ),
            geometry = new THREE.CircleGeometry( radius, segments );

        // Remove center vertex
        geometry.vertices.shift();
        var circle = new THREE.Line( geometry, material );
        circle.position.set(0, 10, 0);

        this.scene.add(circle);
        this.scene.add(line.line);
        this.renderGame();
    }
}

var game = new Game(document.body, null, null, 0xffffff);
game.enableAxis();
game.drawAnimation();