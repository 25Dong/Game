import BirdScript from "./BirdScript";

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
        //如果游戏结束了管道就不用移动了
        const scene = cc.director.getScene();
        const birdNode = scene.getChildByName("bird");
        const gameOver = birdNode.getComponent(BirdScript).isGameOver();
        if (gameOver) {
            return;
        }

        //向左移动
        for (let node of this.node.children) {
            node.x -= dt * this.speed;
            if (node.x < -257) {
                node.x = 288;
                //调整管道位置
                node.y = Math.random() * 100 - 30;
                let pipeUpNode = node.children[0];
                pipeUpNode.y +=Math.random() + 60;
                console.log("pipeUpNode {}",pipeUpNode)
            }
        }
    }
}
