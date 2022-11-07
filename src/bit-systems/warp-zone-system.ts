import { hasComponent } from "bitecs";
import { HubsWorld } from "../app";
import { MyHeadCollider, Rigidbody, WarpZone } from "../bit-components";
import { changeHub } from "../change-hub";
import { anyEntityWith } from "../utils/bit-utils";
import { createAndRedirectToNewHub } from "../utils/phoenix-utils";

let isWarping = false;
let newRoom = "";
export function warpZoneSystem(world: HubsWorld, physicsSystem: any){
  if(isWarping) {
    return;
  }
  const myHead = anyEntityWith(world, MyHeadCollider);

  const collisions = physicsSystem.getCollisions(Rigidbody.bodyId[myHead]);
  for (let i = 0; i < collisions.length; i++) {
    const bodyData = physicsSystem.bodyUuidToData.get(collisions[i]);
    const collidedEid = bodyData && bodyData.object3D && bodyData.object3D.eid;
    if (hasComponent(world, WarpZone, collidedEid)) {
      console.log("WARP!", collidedEid);
      isWarping = true;
      if(newRoom == ""){
        createAndRedirectToNewHub(null, APP.getString(WarpZone.roomId[collidedEid]), true);
        console.log(APP.getString(WarpZone.roomId[collidedEid]));
      }else{
      changeHub( APP.getString(WarpZone.roomId[collidedEid]), true).finally(()=>{
        setTimeout(() =>{
          isWarping = false;
        }, 5000);
      });
    }
      
    }
  }
  
}