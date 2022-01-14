import React, { useContext } from "react";
import { IFrameRouterContext } from "./IFrameRouterContext";
import Logo from "../iryl.png";

// Used "/app" prefix to avoid duplicate routes from the inner IFrame and the parent hosting application
export const NAVIGATION_ROUTES = [
  {
    title: "IFrame Route One - Dashboard",
    path: "/",
    displayedURL: "/app/",
    isIFrame: true,
  },
  {
    title: "IFrame Route Two - Events",
    path: "/events",
    displayedURL: "/app/events",
    isIFrame: true,
  },
  {
    title: "IFrame Nested Route - Daily Events",
    displayedURL: "/app/events/daily",
    path: "/events/daily",
    isIFrame: true,
  },
  { title: "Parent Route", path: "/parentRoute" },
  { title: "Parent Nested Route", path: "/parentRoute/nested" },
];

// Render the navigation navbar.
export const Navigation = () => {
  const iframeRouterContext = useContext(IFrameRouterContext);

  return (
    <div className="navigation">
      <ul>
        <div className="logo">
          <img src={Logo} />
          <h2>Navigation</h2>
        </div>
        {NAVIGATION_ROUTES.map((route) => {
          return (
            <li
              key={route.title}
              onClick={() => iframeRouterContext.navigate(route)}
            >
              {route.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
