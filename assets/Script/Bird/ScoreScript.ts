
const {ccclass, property} = cc._decorator;

/**
 * 分数
 */
@ccclass
export default class ScoreScript extends cc.Component {

    /**
     * 分数
     */
    score: number = 0;

    start () {

    }

    update (dt) {
        let label = this.node.getComponent(cc.Label);
        label.string = this.score+'';
    }

    increaseScore(){
        this.score++;
    }

    getScore(): number{
        return this.score;
    }
}
