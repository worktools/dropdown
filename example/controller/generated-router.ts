import queryString from "query-string";

type Id = string;

function switchPath(x: string) {
  location.hash = `#${x}`;
}

function qsStringify(queries: { [k: string]: string }) {
  return queryString.stringify(queries);
}

// generated

// Generated with router-code-generator@0.2.7

export let genRouter = {
  home: {
    name: "home",
    raw: "home",
    path: () => `/home`,
    go: () => switchPath(`/home`),
  },
  dropdownArea: {
    name: "dropdown-area",
    raw: "dropdown-area",
    path: () => `/dropdown-area`,
    go: () => switchPath(`/dropdown-area`),
  },
  hooksArea: {
    name: "hooks-area",
    raw: "hooks-area",
    path: () => `/hooks-area`,
    go: () => switchPath(`/hooks-area`),
  },
  dropdownAreaScroll: {
    name: "dropdown-area-scroll",
    raw: "dropdown-area-scroll",
    path: () => `/dropdown-area-scroll`,
    go: () => switchPath(`/dropdown-area-scroll`),
  },
  customTrigger: {
    name: "custom-trigger",
    raw: "custom-trigger",
    path: () => `/custom-trigger`,
    go: () => switchPath(`/custom-trigger`),
  },
  dropdownMenu: {
    name: "dropdown-menu",
    raw: "dropdown-menu",
    path: () => `/dropdown-menu`,
    go: () => switchPath(`/dropdown-menu`),
  },
  contentInput: {
    name: "content-input",
    raw: "content-input",
    path: () => `/content-input`,
    go: () => switchPath(`/content-input`),
  },
  menuTree: {
    name: "menu-tree",
    raw: "menu-tree",
    path: () => `/menu-tree`,
    go: () => switchPath(`/menu-tree`),
  },
  dropdownTree: {
    name: "dropdown-tree",
    raw: "dropdown-tree",
    path: () => `/dropdown-tree`,
    go: () => switchPath(`/dropdown-tree`),
  },
  ajustingPosition: {
    name: "ajusting-position",
    raw: "ajusting-position",
    path: () => `/ajusting-position`,
    go: () => switchPath(`/ajusting-position`),
  },
  followWheel: {
    name: "follow-wheel",
    raw: "follow-wheel",
    path: () => `/follow-wheel`,
    go: () => switchPath(`/follow-wheel`),
  },
  dropdownMenuSearch: {
    name: "dropdown-menu-search",
    raw: "dropdown-menu-search",
    path: () => `/dropdown-menu-search`,
    go: () => switchPath(`/dropdown-menu-search`),
  },
  angle: {
    name: "angle",
    raw: "angle",
    path: () => `/angle`,
    go: () => switchPath(`/angle`),
  },
  customTheme: {
    name: "custom-theme",
    raw: "custom-theme",
    path: () => `/custom-theme`,
    go: () => switchPath(`/custom-theme`),
  },
  $: {
    name: "home",
    raw: "",
    path: () => `/`,
    go: () => switchPath(`/`),
  },
};

/** Deprecating, use GenRouterTypeTree["next"] instead */
export type GenRouterTypeMain = GenRouterTypeTree["next"];

export interface GenRouterTypeTree {
  next:
    | GenRouterTypeTree["home"]
    | GenRouterTypeTree["dropdownArea"]
    | GenRouterTypeTree["hooksArea"]
    | GenRouterTypeTree["dropdownAreaScroll"]
    | GenRouterTypeTree["customTrigger"]
    | GenRouterTypeTree["dropdownMenu"]
    | GenRouterTypeTree["contentInput"]
    | GenRouterTypeTree["menuTree"]
    | GenRouterTypeTree["dropdownTree"]
    | GenRouterTypeTree["ajustingPosition"]
    | GenRouterTypeTree["followWheel"]
    | GenRouterTypeTree["dropdownMenuSearch"]
    | GenRouterTypeTree["angle"]
    | GenRouterTypeTree["customTheme"]
    | GenRouterTypeTree["$"];
  home: {
    name: "home";
    params: {};
    query: {};
    next: null;
  };
  dropdownArea: {
    name: "dropdown-area";
    params: {};
    query: {};
    next: null;
  };
  hooksArea: {
    name: "hooks-area";
    params: {};
    query: {};
    next: null;
  };
  dropdownAreaScroll: {
    name: "dropdown-area-scroll";
    params: {};
    query: {};
    next: null;
  };
  customTrigger: {
    name: "custom-trigger";
    params: {};
    query: {};
    next: null;
  };
  dropdownMenu: {
    name: "dropdown-menu";
    params: {};
    query: {};
    next: null;
  };
  contentInput: {
    name: "content-input";
    params: {};
    query: {};
    next: null;
  };
  menuTree: {
    name: "menu-tree";
    params: {};
    query: {};
    next: null;
  };
  dropdownTree: {
    name: "dropdown-tree";
    params: {};
    query: {};
    next: null;
  };
  ajustingPosition: {
    name: "ajusting-position";
    params: {};
    query: {};
    next: null;
  };
  followWheel: {
    name: "follow-wheel";
    params: {};
    query: {};
    next: null;
  };
  dropdownMenuSearch: {
    name: "dropdown-menu-search";
    params: {};
    query: {};
    next: null;
  };
  angle: {
    name: "angle";
    params: {};
    query: {};
    next: null;
  };
  customTheme: {
    name: "custom-theme";
    params: {};
    query: {};
    next: null;
  };
  $: {
    name: "home";
    params: {};
    query: {};
    next: null;
  };
}
