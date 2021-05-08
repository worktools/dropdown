import { css } from "@emotion/css";

let emptyStyle = css``;

/** 全局主题配置入口, 通过 emotion 方式修改, 基于 mutable reference */
export let GlobalThemeVariables = {
  // card
  closeIcon: emptyStyle,

  // content input
  contentInput: emptyStyle,
  contentInputValue: emptyStyle,
  contentInputIcon: emptyStyle,
  contentInputPlaceholder: emptyStyle,
  contentInputRemoveIcon: emptyStyle,

  // menu
  menuList: emptyStyle,
  menuListItem: emptyStyle,
  menuListItemSelected: emptyStyle,

  // menu tree
  menuTree: emptyStyle,
  menuTreeItem: emptyStyle,
};

export let attachDropdownThemeVariables = (customVariables: Partial<typeof GlobalThemeVariables>): void => {
  Object.assign(GlobalThemeVariables, customVariables);
};
