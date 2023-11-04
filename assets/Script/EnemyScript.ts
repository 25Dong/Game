// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
/**
 * 敌人
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemyScript extends cc.Component {

    //是否死亡
    isDead: boolean = false;

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    update(dt) {
        //向下移动
        if (this.isDead == false) {
            this.node.y -= 300 * dt;
        }

        var bgheight = 1280;
        if (this.node.y < -bgheight) {
            this.node.destroy()
        }
    }

    /**
     * 被子弹碰撞后
     */
    onCollisionByBullet() {
        this.isDead = true;

        //动态加载爆炸图片
        cc.loader.loadRes("bg/gameArts-android", cc.SpriteAtlas, (err, atlas: cc.SpriteAtlas) => {
            const frame = atlas.getSpriteFrame('enemy1_blowup_1');
            this.node.getComponent(cc.Sprite).spriteFrame = frame;
        })

        //延时销毁
        setTimeout(() => {
            this.node.destroy();
        }, 300);
    }
}
