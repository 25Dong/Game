
const { ccclass, property } = cc._decorator;
/**
 * 管道
 */
@ccclass
export default class PipeScript extends cc.Component {

    //管道的移动速度
    @property
    speed: number = 10;

    //背景宽度
    @property
    width: number = 288;

    start() {

    }

    update(dt) {
        //向左移动
        for (let node of this.node.children) {
            node.x -= dt * this.speed;
            if (node.x < -257) {
                node.x =288;
                node.y = Math.random() * 100-30;
            }
        }
    }
}
