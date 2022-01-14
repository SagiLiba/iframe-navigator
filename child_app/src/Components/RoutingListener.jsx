import { get } from "lodash";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const IFrameActions = {
  NAVIGATION: "NAVIGATION",
  REFRESH: "REFRESH",
};

// This application is rendered through an IFrame by a parent application.
// Here we are listening for messages from the parent, handling routing, etc...
export const RoutingListener = () => {
  const history = useHistory();

  useEffect(() => {
    window.addEventListener("message", (event) => {
      // Handle specific origin messages:
      // if (event.origin !== PARENT_APPLICATION_URL()) {
      //   console.log('Incorrect origin', event.origin);
      //   return;
      // }

      const data = get(event, "data");
      const action = get(data, "action");

      if (action === IFrameActions.NAVIGATION) {
        const path = get(data, "path");
        path && history.replace(path);
      }
    });
  }, []);

  return <></>;
};
