import BirdScript from "./BirdScript";
import ScoreScript from "./ScoreScript";

const { ccclass, property } = cc._decorator;

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

    //分数脚本
    @property(ScoreScript)
    scoreScript: ScoreScript = null;

    start() {
        for (let node of this.node.children) {
            //鼠标点击监听
            node.on(cc.Node.EventType.MOUSE_DOWN, () => {
                this.birdScrpt.fly();
            })

            //触摸监听
            node.on(cc.Node.EventType.TOUCH_END, () => {
                this.birdScrpt.fly();
            })
        }
    }

    update(dt) {
        //向左移动
        for (let node of this.node.children) {
            const score = this.scoreScript.getScore();
            const curSpeed = this.speed + Math.min(score / 5, 5);
            node.x -= dt * curSpeed;
            if (node.x < -this.width) {
                node.x += this.width * 2;
            }
        }
    }
}
