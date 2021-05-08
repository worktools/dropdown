import React, { FC, useMemo, ReactNode, CSSProperties, useState } from "react";
import { css, cx } from "@emotion/css";
import ContentInput from "./content-input";
import { flatMap } from "lodash-es";

import DropdownArea from "./dropdown-area";
import { rowParted, center, expand } from "@worktools/flex-styles";
import MenuTree, { IMenuTreeItem } from "./menu-tree";

let findInTree = (value: string, items: IMenuTreeItem[]): IMenuTreeItem[] => {
  return flatMap(items, (item) => {
    if (item.value === value) {
      return [item];
    } else {
      return findInTree(value, item.children);
    }
  });
};

export interface IDropdownTreeProps {
  value: string;
  items: IMenuTreeItem[];
  onSelect: (value: string) => void;
  className?: string;
  menuClassName?: string;
  cardClassName?: string;
  itemClassName?: string;
  placeholder?: string;
  emptyLocale?: string;
  placeholderClassName?: string;
  menuWidth?: number;
  style?: CSSProperties;
  disabled?: boolean;
  allowClear?: boolean;
  renderValue?: (x: any) => ReactNode;
  followWheel?: boolean;
}

let DropdownTree: FC<IDropdownTreeProps> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  let selectedItem = findInTree(props.value, props.items)[0];
  let content = selectedItem?.display;
  if (props.renderValue && props.value != null) {
    content = props.renderValue(content);
  }

  let [active, setActive] = useState<boolean>(false);

  let inputElement = useMemo(
    () => (
      <ContentInput
        disabled={props.disabled}
        className={props.className}
        content={content}
        placeholderClassName={props.placeholderClassName}
        placeholder={props.placeholder}
        emptyLocale={props.emptyLocale}
        allowClear={props.allowClear}
        isActive={active}
        onClear={() => {
          props.onSelect(null);
        }}
      />
    ),
    [props.disabled, props.value, props.items, content, active]
  );

  if (props.disabled) {
    return inputElement;
  }

  return (
    <DropdownArea
      hideClose={true}
      width={props.menuWidth}
      adjustingPosition
      cardStyle={props.style}
      cardClassName={cx(styleMenu, props.cardClassName)}
      followWheel={props.followWheel}
      onExpand={(expand: boolean) => {
        setActive(expand);
      }}
      renderContent={(onClose) => {
        if (props.items.length === 0) {
          return <div className={cx(center, styleEmptyList)}>{props.emptyLocale || "No data"}</div>;
        }
        return (
          <MenuTree
            selected={props.value as string}
            data={props.items}
            className={props.menuClassName}
            itemClassName={props.itemClassName}
            onChange={(value) => {
              onClose();
              props.onSelect(value);
            }}
          />
        );
      }}
    >
      {inputElement}
    </DropdownArea>
  );
});

export default DropdownTree;

let styleMenu = css`
  min-height: 8px;
`;

let styleEmptyList = css`
  font-size: 12px;
  color: hsl(0, 0%, 75%);
  user-select: none;
  padding: 12px;
`;
