// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

/**
 * 定时随机生成敌机
 */
@ccclass
export default class NewClass extends cc.Component {

    //敌机的预设体
    @property(cc.Prefab)
    enemyPrefab: cc.Prefab = null;

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        //间隔2秒生成一个敌机
        this.schedule(()=>{
            let ememy =  cc.instantiate(this.enemyPrefab);
            ememy.setParent(cc.director.getScene());
            ememy.y = this.node.y;
            ememy.x = Math.random()*400 + 20
        },2)
    }

    // update (dt) {}
}
