import React, { useState, useRef, useEffect, useMemo } from "react";
import { NAVIGATION_ROUTES } from "./Navigation";
import { useHistory } from "react-router-dom";

export const IFrameActions = {
  NAVIGATION: "NAVIGATION",
  REFRESH: "REFRESH",
};

const initial = {};

export const IFrameRouterContext = React.createContext(initial);

export const IFRAME_APP_URL = "http://localhost:8001";

const getIFrameRoute = () => {
  return NAVIGATION_ROUTES.find(
    (route) => route.displayedURL === window.location.pathname
  );
};
const isInIFrameRoute = () => {
  return !!getIFrameRoute();
};

const getIframeSource = () => {
  const iframeRoute = getIFrameRoute();
  if (iframeRoute) {
    return IFRAME_APP_URL + iframeRoute.path;
  }

  return IFRAME_APP_URL;
};

export const IFrameRouterContextProvider = ({ children }) => {
  const iframeRef = useRef(null);
  // Important that it should only be called once.
  const iframeSrc = useMemo(getIframeSource, []);
  const [iframeVisibility, setIframeVisibility] = useState(isInIFrameRoute());
  const history = useHistory();

  // --------------------------------------------------------------------------
  // Navigates our application, handling both parent routes, and IFrame routes.
  // Use this for all app routing.
  // It makes sure to handle IFrame visibility as well.
  // --------------------------------------------------------------------------
  const navigate = ({ path, isIFrame, displayedURL }) => {
    // Stop navigation to the same path.
    const currentPath = window.location.pathname;
    if (
      (isIFrame && displayedURL === currentPath) ||
      (!isIFrame && path === currentPath)
    ) {
      return;
    }

    if (isIFrame) {
      setIframeVisibility(true);
      if (iframeRef.current) {
        iframeRef.current.contentWindow.postMessage(
          {
            action: IFrameActions.NAVIGATION,
            path,
          },
          IFRAME_APP_URL
        );
        history.push(displayedURL);
      }
    } else {
      setIframeVisibility(false);
      history.push(path);
    }
  };
  const handleBrowserBackForwardEvents = () => {
    // Based on currently updated URL
    if (isInIFrameRoute()) {
      if (iframeRef.current) {
        // Manually handle IFrame navigation
        setIframeVisibility(true); // You might delay this to avoid flickering of previous route in hidden iframe
        const route = getIFrameRoute();
        iframeRef.current.contentWindow.postMessage(
          {
            action: IFrameActions.NAVIGATION,
            path: route.path,
          },
          IFRAME_APP_URL
        );
      }
    } else {
      // BrowserRouter handles the navigation
      setIframeVisibility(false);
    }
  };

  const navigateToMainPage = () => {
    navigate(NAVIGATION_ROUTES.find(({ path }) => path === "/"));
  };

  useEffect(() => {
    console.log("Initial IFrame Visiblity", isInIFrameRoute());

    // Go the child application main route
    if (window.location.pathname === "/") {
      navigateToMainPage();
    }

    if (iframeRef) {
      iframeRef.current.onload = () => {
        console.log("IFrame loaded");
        window.addEventListener("popstate", handleBrowserBackForwardEvents);
      };
    }
    return () => {
      window.removeEventListener("popstate", handleBrowserBackForwardEvents);
    };
  }, []);

  const contextProperties = {
    iframeRef,
    iframeVisibility,
    setIframeVisibility,
    getIFrameRoute,
    isInIFrameRoute,
    navigate,
    iframeSrc,
  };
  return (
    <IFrameRouterContext.Provider value={contextProperties}>
      {children}
    </IFrameRouterContext.Provider>
  );
};
