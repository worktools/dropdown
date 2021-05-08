import React from "react";
import { parseRoutePath, IRouteParseResult } from "@worktools/ruled-router";
import { css, cx } from "@emotion/css";
import { row, fullHeight, fullscreen, expand } from "@worktools/flex-styles";

import { HashRedirect, findRouteTarget } from "@worktools/ruled-router/lib/dom";
import { genRouter, GenRouterTypeTree } from "controller/generated-router";
import { DocSidebar, ISidebarEntry } from "@worktools/doc-frame";
import DemoDropdownArea from "./demo-dropdown-area";
import DemoDropdownAreaScroll from "./demo-dropdown-area-scroll";
import DemoDropdownMenu from "./demo-dropdown-menu";
import DemoContentInput from "./demo-content-input";
import DemoMenuTree from "./demo-menu-tree";
import DemoDropdownTree from "./demo-dropdown-tree";
import DemoAjustingPosition from "./demo-ajusting-position";
import DemoFollowWheel from "./demo-follow-wheel";
import DemoHooksArea from "./demo-hooks-area";
import DemoCustomTrigger from "./demo-custom-trigger";
import DemoDropdownMenuSearch from "./demo-dropdown-menu-search";
import DemoAngle from "./demo-angle";
import CustomThemePage from "./demo-custom-theme";

const renderChildPage = (routerTree: GenRouterTypeTree["next"]) => {
  if (routerTree != null) {
    switch (routerTree.name) {
      case "dropdown-area":
        return <DemoDropdownArea />;
      case "dropdown-area-scroll":
        return <DemoDropdownAreaScroll />;
      case "dropdown-menu":
        return <DemoDropdownMenu />;
      case "dropdown-menu-search":
        return <DemoDropdownMenuSearch />;
      case "content-input":
        return <DemoContentInput />;
      case "menu-tree":
        return <DemoMenuTree />;
      case "dropdown-tree":
        return <DemoDropdownTree />;
      case "ajusting-position":
        return <DemoAjustingPosition />;
      case "follow-wheel":
        return <DemoFollowWheel />;
      case "hooks-area":
        return <DemoHooksArea />;
      case "custom-trigger":
        return <DemoCustomTrigger />;
      case "angle":
        return <DemoAngle />;
      case "custom-theme":
        return <CustomThemePage />;
      default:
        return <HashRedirect to={genRouter.dropdownArea.path()} noDelay />;
    }
  }
  return <div>NOTHING</div>;
};

let items: ISidebarEntry[] = [
  {
    title: "Dropdown area",
    path: genRouter.dropdownArea.name,
  },
  {
    title: "Hooks for dropdown area",
    path: genRouter.hooksArea.name,
  },
  {
    title: "Dropdown area scroll",
    path: genRouter.dropdownAreaScroll.name,
  },
  {
    title: "Position",
    path: genRouter.ajustingPosition.name,
  },
  {
    title: "Custom trigger",
    path: genRouter.customTrigger.name,
  },
  {
    title: "Dropdown menu",
    path: genRouter.dropdownMenu.name,
  },
  {
    title: "Dropdown menu search",
    path: genRouter.dropdownMenuSearch.name,
  },
  {
    title: "Content input",
    path: genRouter.contentInput.name,
  },
  {
    title: "Menu tree",
    path: genRouter.menuTree.name,
  },
  {
    title: "Dropdown tree",
    path: genRouter.dropdownTree.name,
  },
  {
    title: "Follow Wheel",
    path: genRouter.followWheel.name,
  },
  {
    title: "Angle",
    path: genRouter.angle.name,
  },
  {
    title: "Custom Theme",
    path: genRouter.customTheme.name,
  },
];

let onSwitch = (path: string) => {
  let target = findRouteTarget(genRouter, path);
  if (target) {
    target.go();
  } else {
    console.error("Unknown path", path);
  }
};

export default (props: { router: GenRouterTypeTree["next"] }) => {
  return (
    <div className={cx(row, fullscreen, styleContainer)}>
      <DocSidebar title="Dropdown" currentPath={props.router.name} items={items} onSwitch={(item) => onSwitch(item.path)} />
      <div style={{ width: 20 }} />
      <div className={cx(expand, stylePage)}>{renderChildPage(props.router)}</div>
    </div>
  );
};

const styleContainer = css`
  font-family: "Helvetica";
`;

let stylePage = css`
  padding: 40px;
`;
