
const { ccclass, property } = cc._decorator;

/**
 * 生命周期
 */
@ccclass
export default class GameLisfScrip extends cc.Component {


    onLoad() {
        console.info("onLoad");
        this.hiddenGameOverButton();
    }

    start() {

    }

    // update (dt) {}

    afterGameOver() {
        this.showGameOverButton();
    }

    showGameOverButton() {
        var nodeName = this.node.name;
        console.log("cur nodeName is {}",nodeName);
        if(nodeName== 'gameOver'){
            this.node.active = true;
        }
    }

    hiddenGameOverButton() {
        var nodeName = this.node.name;
        console.log("cur nodeName is {}",nodeName);
        if(nodeName== 'gameOver'){
            this.node.active = false;
        }
        
    }

    clickButton() {
        console.info("click")
        cc.director.loadScene('Bird');
    }

    clickStartButton() {
        console.info("clickStartButton");

        cc.director.loadScene('Bird');
    }
}
