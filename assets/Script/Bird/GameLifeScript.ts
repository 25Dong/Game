
const {ccclass, property} = cc._decorator;

/**
 * 生命周期
 */
@ccclass
export default class GameLisfScrip extends cc.Component {


    onLoad() {
        this.hiddenButton();
    }

    start () {

    }

    // update (dt) {}

    afterGameOver(){
        this.showButton();
    }

    showButton(){
        this.node.active =true;
    }

    hiddenButton(){
        // this.node.active =false;
    }

    clickButton(){
        console.info("click")
        cc.director.loadScene('Bird');
    }
}
