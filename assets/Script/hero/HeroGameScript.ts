
const { ccclass, property } = cc._decorator;

const Input = {}
const State = {
    stand: 1,
    attack: 2
}
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    mapNode: cc.Node = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;;

        // this.initMapNode(this.mapNode)

    }

    initMapNode(mapNode: cc.Node) {
        if (mapNode == null) {
            console.log("initMapNode res")
            return;
        }

        let tiledMap = mapNode.getComponent(cc.TiledMap)
        let tiledSize = tiledMap.getTileSize();
        let layer = tiledMap.getLayer('wall');
        let layerSize = layer.getLayerSize();
        console.log("tiledSize :{}", tiledSize);
        for (let i = 0; i < layerSize.width; i++) {
            for (let j = 0; j < layerSize.height; j++) {
                let tiled = layer.getTiledTileAt(i, j, true);
                if (tiled.gid != 0) {
                    console.log("tiled :{} ", tiled)
                    tiled.node.group = 'wall';

                    let body = tiled.node.addComponent(cc.RigidBody);
                    body.type = cc.RigidBodyType.Static;

                    console.log("old :{} {}-{}", tiled.node, tiledSize.width / 2, tiledSize.height / 2)

                    let collider = tiled.node.addComponent(cc.PhysicsBoxCollider);

                    console.log("collider :{} ", collider)
                    collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2);
                    collider.size = tiledSize;
                    //collider.apply();
                }
            }
        }
    }

    start() {

    }

    // update (dt) {}
}
