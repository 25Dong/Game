

const { ccclass, property } = cc._decorator;

const Input = {}
const State = {
    stand: 1,
    attack: 2
}
@ccclass
export default class NewClass extends cc.Component {

    @property
    heroSate: number = State.stand;

    sp: cc.Vec2 = cc.v2(0, 0);

    speed: number = 200;

    //当前播放的动画
    curPlayerAnima: string = 'idle';

    //动画组件
    animationComponent: cc.Animation;

    onLoad() {
        cc.systemEvent.on('keydown', this.onKeyDown, this);
        cc.systemEvent.on('keyup', this.onKeyUp, this);

        this.animationComponent = this.node.getComponent(cc.Animation);
    }

    onDestroy() {
        cc.systemEvent.on('keydown', this.onKeyDown, this);
        cc.systemEvent.on('keyup', this.onKeyUp, this);
    }

    onKeyDown(e) {
        Input[e.keyCode] = 1;
    }

    onKeyUp(e) {
        Input[e.keyCode] = 0;
    }

    start() {

    }

    update(dt) {
        let _anima = this.curPlayerAnima;

        let scaleX = Math.abs(this.node.scaleX);
        let lv = this.node.getComponent(cc.RigidBody).linearVelocity;
        if (Input[cc.macro.KEY.a] || Input[cc.macro.KEY.left]) {
            this.sp.x = -1;
            this.node.scaleX = - scaleX;
            _anima = 'run'
        }
        else if (Input[cc.macro.KEY.d] || Input[cc.macro.KEY.right]) {
            this.sp.x = 1;
            this.node.scaleX = scaleX;
            _anima = 'run'
        } else {
            this.sp.x = 0;
            _anima = 'idle'
        }
        if (this.sp.x) {
            lv.x = this.sp.x * this.speed;
        } else {
            lv.x = 0;
        }
        this.node.getComponent(cc.RigidBody).linearVelocity = lv;

        if (_anima) {
            this.setAnimation(_anima);
        }
    }

    setAnimation(newAnimation: string) {
        if (this.curPlayerAnima == newAnimation) {
            return;
        }

        this.curPlayerAnima = newAnimation;
        this.animationComponent.play(this.curPlayerAnima);
    }
}
