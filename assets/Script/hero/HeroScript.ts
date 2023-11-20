

const { ccclass, property } = cc._decorator;

const Input = {}
const State = {
    stand: 1,
    attack: 2
}
/**
 * Hero
 */
@ccclass
export default class Hero extends cc.Component {

    /**
     * 状态（默认为站立状态）
     */
    private heroSate: number = State.stand;
    /**
     * 移动方向向量
     */
    private sp: cc.Vec2 = cc.v2(0, 0);
    /**
     * 移动速度
     */
    @property
    private speed: number = 200;
    /**
     * 当前播放的动画
     */
    private curPlayerAnima: string = 'idle';
    /**
     * 动画组件
     */
    private animationComponent: cc.Animation;

    onLoad() {
        //绑定事件
        cc.systemEvent.on('keydown', this.onKeyDown, this);
        cc.systemEvent.on('keyup', this.onKeyUp, this);

        this.animationComponent = this.node.getComponent(cc.Animation);
    }

    onDestroy() {
        //解绑事件
        cc.systemEvent.off('keydown', this.onKeyDown, this);
        cc.systemEvent.off('keyup', this.onKeyUp, this);
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
        //播放的动画
        let _anima: string;
        
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
