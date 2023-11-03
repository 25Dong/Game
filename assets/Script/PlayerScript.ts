// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

/**
 * 玩家(飞机)
 */
@ccclass
export default class PlayerScript extends cc.Component {

    //子弹的与预设体
    @property(cc.Prefab)
    bulletPre: cc.Prefab = null;

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        //移动
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            this.node.setPosition(event.getLocation())
        }, this);

        //攻击：每间隔0.5秒创建一个字段
        this.schedule(()=>{
            let bullet =  cc.instantiate(this.bulletPre);
            bullet.setParent(cc.director.getScene());
            bullet.x = this.node.x;
            bullet.y = this.node.y + 60;
        },0.5)

        //开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
    }

    // update (dt) {}
}
