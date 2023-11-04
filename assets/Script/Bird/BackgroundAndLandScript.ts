import BirdScript from "./BirdScript";

const {ccclass, property} = cc._decorator;

/**
 * 背景和地面的脚本
 */
@ccclass
export default class BackgroundAndLandScript extends cc.Component {

    //速度
    @property
    speed: number = 4;

    //背景宽度
    @property
    width: number = 288;

    //小鸟脚本(从界面拖动小鸟节点给该属性赋值)
    @property(BirdScript)
    birdScrpt: BirdScript = null;

    start () {
        //点击监听
        for(let node of this.node.children){
            node.on(cc.Node.EventType.MOUSE_DOWN,()=>{
                this.birdScrpt.fly();
            })
        }
    }

    update(dt) {
        //向左移动
        for(let node of this.node.children){
            node.x -= dt * this.speed;
            if(node.x < -this.width){
                node.x += this.width * 2;
            }
        }
    }
}
