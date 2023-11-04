

const { ccclass, property } = cc._decorator;

/**
 * 小鸟
 */
@ccclass
export default class BirdScript extends cc.Component {

    onLoad() {
        //开启物理引擎(让小鸟可以往下掉)
        cc.director.getPhysicsManager().enabled = true;
    }

    start() {

    }

    fly() {
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 150);
    }

    onBeginContact(contact, self, other) {
        if (other.tag == 1) {
            console.info("+1");
        } else {
            console.warn("-1");
        }
    }
}
