import { addComponent } from "bitecs";
import { HubsWorld } from "../app";
import { PhysicsShape, Rigidbody, WarpZone } from "../bit-components";
import { COLLISION_LAYERS } from "../constants";
import { RIGIDBODY_FLAGS } from "../systems/bit-physics";

export function inflateWarpZone(world: HubsWorld, eid: number, { roomId}: { roomId: string}){
  
  addComponent(world, WarpZone, eid);
    WarpZone.roomId[eid] = APP.getSid(roomId)!;

    addComponent(world, Rigidbody, eid);
    Rigidbody.collisionGroup[eid] = COLLISION_LAYERS.WARP_ZONES;
    Rigidbody.collisionMask[eid] = COLLISION_LAYERS.AVATAR;
    Rigidbody.flags[eid] = RIGIDBODY_FLAGS.DISABLE_COLLISIONS;

    addComponent(world, PhysicsShape, eid);
    PhysicsShape.halfExtents[eid].set([
      0.5,
      0.5,
      0.5
    ]);
}