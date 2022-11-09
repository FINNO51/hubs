import { generateHubName } from "../utils/name-generation";

import { changeHub } from "../change-hub";
import Store from "../storage/store";
import { getReticulumFetchUrl, isLocalClient } from "./phoenix-utils";

export async function createNewHub(name, sceneId) {
    const createUrl = getReticulumFetchUrl("/api/v1/hubs");
    const payload = { hub: { name: name || generateHubName() } };
  
    if (sceneId) {
      payload.hub.scene_id = sceneId;
    }
  
    const headers = { "content-type": "application/json" };
    const store = new Store();
    if (store.state && store.state.credentials.token) {
      headers.authorization = `bearer ${store.state.credentials.token}`;
    }
  
    let res = await fetch(createUrl, {
      body: JSON.stringify(payload),
      headers,
      method: "POST"
    }).then(r => r.json());
  
    if (res.error === "invalid_token") {
      // Clear the invalid token from store.
      store.update({ credentials: { token: null, email: null } });
  
      // Create hub anonymously
      delete headers.authorization;
      res = await fetch(createUrl, {
        body: JSON.stringify(payload),
        headers,
        method: "POST"
      }).then(r => r.json());
    }
  
    const hub = res;
    let url = hub.url;
  
    const creatorAssignmentToken = hub.creator_assignment_token;
    if (creatorAssignmentToken) {
      store.update({ creatorAssignmentTokens: [{ hubId: hub.hub_id, creatorAssignmentToken: creatorAssignmentToken }] });
  
      // Don't need to store the embed token if there's no creator assignment token, since that means
      // we are the owner and will get the embed token on page load.
      const embedToken = hub.embed_token;
  
      if (embedToken) {
        store.update({ embedTokens: [{ hubId: hub.hub_id, embedToken: embedToken }] });
      }
    }
  
    if (isLocalClient()) {
      url = `/hub.html?hub_id=${hub.hub_id}`;
    }

    changeHub(hub.hub_id,true);

    return hub.hub_id;
  
  }