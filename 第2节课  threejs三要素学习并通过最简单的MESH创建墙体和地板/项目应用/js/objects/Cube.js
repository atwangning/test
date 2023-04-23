/**
 * 立方体类
 * 我们生活中很多的物体都可以归结为立方体类，比如墙体，地板，窗户等都可看成是立方体类
 * @param option
 * @constructor
 */
function Cube(option){
    this.length = option.length || 1;
    this.width = option.width || 1;
    this.height = option.height || 1;

    this.Name = option.objName;

    this.positionX = option.position.x || 0;
    this.positionY = option.position.y || 0;
    this.positionZ = option.position.z || 0;

    this.style=option.style||{color:0xFF0000};
    let curmaterial=CommonFunction.createMaterial(this.width,this.height,this.style);

    let cubeGeometry = new THREE.BoxGeometry(this.length, this.height, this.width);

    let cube = new THREE.Mesh( cubeGeometry, curmaterial );
    cube.name=this.Name;
    cube.position.x=this.positionX;
    cube.position.y=this.positionY;
    cube.position.z=this.positionZ;
    return cube;
}