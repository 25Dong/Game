// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import EnemyScript from "./EnemyScript";

const { ccclass, property } = cc._decorator;

/**
 *子弹
 */
@ccclass
export default class Bullet extends cc.Component {

    //子弹的飞行速度
    @property
    speed: number = 800;

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    update(dt) {
        var bgheight = 1280;
        this.node.y += this.speed * dt;
        //如果超出屏幕的边界就销毁
        if (this.node.y > bgheight) {
            this.node.destroy()
        }
    }

    /**
     * 子弹发生碰撞会自动回调
     * @param enemy 被字段碰撞到物品（敌人）
     */
    onCollisionEnter(enemy) {
        if (enemy.tag == 1) {//1为子弹预设体的类型
            //碰撞到子弹
            enemy.getComponent(EnemyScript).onCollisionByBullet();
            //子弹销毁
            this.node.destroy();
        }
    }
}
