
const { ccclass, property } = cc._decorator;

/**
 * 生命周期
 */
@ccclass
export default class GameLisfScrip extends cc.Component {

    /**
     * 遮罩层
     */
    @property(cc.Node)
    maskLayer: cc.Node = null;

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
        console.log("cur nodeName is {}", nodeName);
        if (nodeName == 'gameOver') {
            this.node.active = true;
        }
    }

    hiddenGameOverButton() {
        var nodeName = this.node.name;
        console.log("cur nodeName is {}", nodeName);
        if (nodeName == 'gameOver') {
            this.node.active = false;
        }

    }

    clickButton() {
        console.info("click")
        cc.director.loadScene('Bird');
    }

    /**
     * 登录页面点击开始游戏按钮
     */
    clickStartButton() {
        console.info("clickStartButton");
        cc.director.preloadScene('Bird');
        this.maskLayer.active = true;
        this.maskLayer.opacity = 1;
        this.maskLayer.color = cc.Color.BLACK;
        
        cc.tween(this.maskLayer).to(.2, { opacity: 255 }).call(() => {
            cc.director.loadScene('Bird');
        }).start();
    }
}
