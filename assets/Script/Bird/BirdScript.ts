import ScoreScript from "./ScoreScript";


const { ccclass, property } = cc._decorator;

/**
 * 小鸟
 */
@ccclass
export default class BirdScript extends cc.Component {

    //超出屏幕顶部的位置
    overTop: number = 500;

    //是否需要停止运动
    stop: boolean = false;

    onLoad() {
        //开启物理引擎(让小鸟可以往下掉)
        cc.director.getPhysicsManager().enabled = true;
    }

    start() {

    }

    update(dt) {
        if (this.node.y > this.overTop) {
            this.gameOver();
        }
        if (this.stop) {
            const birdRigidBody = this.getComponent(cc.RigidBody);
            birdRigidBody.active = false;
        }
    }

    fly() {
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 120);
    }

    onBeginContact(contact, self, other) {
        if (other.tag == 1) {
            //+1分
            const scene = cc.director.getScene();
            const birdNode = scene.getChildByName("scoreNode");
            birdNode.getComponent(ScoreScript).increaseScore();
        } else {
            this.gameOver();
        }
    }

    /**
     * 游戏结束
     * 1.碰到碰撞体（管道，地面）
     * 2.飞出屏幕顶部
     */
    gameOver() {
        console.info("gameOver")
        this.stop = true;
    }

    /**
     * 游戏是否已经结束了
     * @returns 结束返回true
     */
    isGameOver(): boolean {
        return this.stop;
    }
}
