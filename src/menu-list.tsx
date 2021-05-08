import React, { FC, ReactNode } from "react";
import { css, cx } from "@emotion/css";
import { GlobalThemeVariables } from "./theme";

export type MenuValue = string | number;

export interface IMenuListItem {
  key?: string;
  value: MenuValue;
  title: ReactNode;
  className?: string;
  "data-action"?: string;
}

let MenuList: FC<{
  value: MenuValue;
  items: IMenuListItem[];
  className?: string;
  itemClassName?: string;
  onSelect: (value: MenuValue, item?: IMenuListItem) => void;
}> = (props) => {
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(styleContainer, GlobalThemeVariables.menuList, props.className)} data-area="dropdown-menu">
      {props.items.map((item) => {
        return (
          <div
            key={item.key || item.value}
            className={cx(
              styleItem,
              GlobalThemeVariables.menuListItem,
              item.value === props.value ? cx(styleSelected, GlobalThemeVariables.menuListItemSelected) : null,
              props.itemClassName,
              item.className
            )}
            onClick={() => props.onSelect(item.value, item)}
            data-action={item["data-action"] || item.key || item.value || item.title}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default MenuList;

let styleContainer = css``;

let styleItem = css`
  padding: 8px 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  color: #323232;
  user-select: none;
  font-size: 14px;

  &:hover {
    background: rgba(242, 245, 251, 1);
  }
`;

let styleSelected = css`
  background: rgba(242, 245, 251, 1);
  color: #3674ff;

  &:hover {
    background-color: rgba(242, 245, 251, 1);
  }
`;
