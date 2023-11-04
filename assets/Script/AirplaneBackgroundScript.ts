// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

/**
 * 背景
 */
@ccclass
export default class AirplaneBackgroundScript extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    update(dt) {
        //实现背景循环播放
        var bgheight = 1280;
        for (let bgNode of this.node.children) {
            bgNode.y -= 50 * dt;
            if (bgNode.y < -bgheight) {
                console.log('change position');
                bgNode.y += bgheight * 2;
            }
        }
    }
}
