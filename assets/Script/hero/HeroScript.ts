

const { ccclass, property } = cc._decorator;

const Input = {}
const State = {
    idle: 1,
    attack: 2,
    run: 3
}
/**
 * Hero
 */
@ccclass
export default class Hero extends cc.Component {

    /**
     * 状态（默认为站立状态）
     */
    private heroSate: number = State.idle;
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

    private attackProgress: number = -1;

    onLoad() {
        //绑定事件
        cc.systemEvent.on('keydown', this.onKeyDown, this);
        cc.systemEvent.on('keyup', this.onKeyUp, this);

        this.animationComponent = this.node.getComponent(cc.Animation);
        this.animationComponent.on('stop', this.onAnimationStop, this);
    }

    onDestroy() {
        //解绑事件
        cc.systemEvent.off('keydown', this.onKeyDown, this);
        cc.systemEvent.off('keyup', this.onKeyUp, this);
        this.animationComponent.off('stop', this.onAnimationStop, this);
    }

    onKeyDown(e) {
        Input[e.keyCode] = 1;
        if (Input[cc.macro.KEY.q]) {
            this.attackProgress = (this.attackProgress + 1) % 3;
        }
        // console.log("onKeyDown key:{}", e.keyCode)
    }

    onKeyUp(e) {
        Input[e.keyCode] = 0;

        //console.log("onKeyUp key:{}", e.keyCode)
    }

    onAnimationStop() {
        // console.log("onAnimationStop{}", this);
        setTimeout(() => {
            this.heroSate = State.idle;
        }, 1000);
    }

    start() {

    }

    update(dt) {
        //维护状态
        if (Input[cc.macro.KEY.q]) {
            this.heroSate = State.attack;
        } else if (Input[cc.macro.KEY.a] || Input[cc.macro.KEY.left]
            || Input[cc.macro.KEY.d] || Input[cc.macro.KEY.right]) {
            this.heroSate = State.run;
        } else {
            // this.heroSate = State.idle;
        }

        //根据当前状态做出对应行为
        if (this.heroSate == State.attack) {
            //播放攻击动画
            if (this.attackProgress == 0) {
                this.setAnimation('attack1');
            } else if (this.attackProgress == 1) {
                this.setAnimation('attack2');
            } else if (this.attackProgress == 2) {
                this.setAnimation('attack3');
            }
            return;
        }

        if (this.heroSate == State.run) {
            let scaleX = Math.abs(this.node.scaleX);
            let lv = this.node.getComponent(cc.RigidBody).linearVelocity;
            if (Input[cc.macro.KEY.a] || Input[cc.macro.KEY.left]) {
                this.sp.x = -1;
                this.node.scaleX = - scaleX;
            }
            else if (Input[cc.macro.KEY.d] || Input[cc.macro.KEY.right]) {
                this.sp.x = 1;
                this.node.scaleX = scaleX;
            }
            this.setAnimation('run');
            lv.x = this.sp.x * this.speed;
            this.node.getComponent(cc.RigidBody).linearVelocity = lv;
            return
        }

        if (this.heroSate == State.idle) {
            this.resetAttackProgress();
            this.setAnimation('idle');
            return;
        }
    }

    setAnimation(newAnimation: string) {
        if (this.curPlayerAnima == newAnimation) {
            return;
        }

        this.curPlayerAnima = newAnimation;
        this.animationComponent.play(this.curPlayerAnima);
        console.log("curPlayerAnima :{}", this.curPlayerAnima)
    }

    private resetAttackProgress() {
        this.attackProgress = -1;
    }
}
