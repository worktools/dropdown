import React, { FC, useState, ReactNode } from "react";
import { css, cx } from "@emotion/css";
import { rowMiddle, center } from "@worktools/flex-styles";

import { ClampText } from "@worktools/jimo-basics";
import { GlobalThemeVariables } from "./theme";
import { ChevronLeft, ChevronDown } from "react-feather";

let countAll = (xs: IMenuTreeItem[]): number => {
  if (xs == null) {
    return 0;
  }
  return xs
    .map((x) => {
      return 1 + countAll(x.children);
    })
    .reduce((x, y) => x + y, 0);
};

export interface IMenuTreeItem {
  key?: string;
  value: string;
  display: ReactNode;
  disabled?: boolean;
  children?: IMenuTreeItem[];
}

let MenuTreeItem: FC<{
  selected: string;
  data: IMenuTreeItem;
  onChange: (vaule: string) => void;
  className?: string;
  itemClassName?: string;
  level?: number;
}> = React.memo((props) => {
  let [folded, setFolded] = useState(false);

  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  let children = props.data.children || [];
  let childrenSize = countAll(children);

  return (
    <div>
      <div
        className={cx(rowMiddle, styleItem, GlobalThemeVariables.menuTreeItem, props.data.disabled ? styleDisabled : null, props.itemClassName)}
        style={{ paddingLeft: props.level * 16 + 6 }}
        onClick={() => {
          if (props.data.disabled) {
            console.warn("Selecting disabled item", props.data);
            return;
          }
          props.onChange(props.data.value);
        }}
      >
        <div className={cx(center, stylePrepend)}>
          {children.length == 0 ? null : folded ? (
            <ChevronLeft
              onClick={(event: React.MouseEvent) => {
                event.stopPropagation();
                setFolded(false);
              }}
            />
          ) : (
            <ChevronDown
              onClick={(event: React.MouseEvent) => {
                event.stopPropagation();
                setFolded(true);
              }}
            />
          )}
        </div>
        <div
          className={cx(styleDisplay, props.selected === props.data.value ? styleSelected : null)}
          data-action={props.data.key || props.data.value || props.data.display}
        >
          <ClampText text={props.data.display} addTooltip />
        </div>
      </div>
      <div className={cx(styleMenuContainer, folded ? styleFolded : null)}>
        {folded ? (
          <div className={stylePlaceholder} style={{ height: 38 * childrenSize }}></div>
        ) : (
          children.map((child, idx) => {
            return (
              <MenuTreeItem
                key={idx}
                data={child}
                selected={props.selected}
                onChange={props.onChange}
                level={props.level + 1}
                itemClassName={props.itemClassName}
              />
            );
          })
        )}
      </div>
    </div>
  );
});

let MenuTree: FC<{
  selected: string;
  data: IMenuTreeItem[];
  onChange: (vaule: string) => void;
  className?: string;
  itemClassName?: string;
}> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  return (
    <div className={cx(styleContainer, GlobalThemeVariables.menuTree, props.className)}>
      {props.data.map((item, idx) => {
        return <MenuTreeItem key={idx} data={item} itemClassName={props.className} level={0} selected={props.selected} onChange={props.onChange} />;
      })}
    </div>
  );
});

export default MenuTree;

let styleItem = css`
  font-size: 14px;
  line-height: 37px;
  border-bottom: 1px solid hsla(0, 0%, 91%, 1);
  cursor: pointer;
  color: hsla(0, 0%, 20%, 1);
`;

let stylePrepend = css`
  width: 16px;
  font-size: 18px;
  margin-right: 4px;
  color: hsla(0, 0%, 59%, 1);

  :hover {
    color: hsla(0, 0%, 20%, 1);
  }
`;

let styleMenuContainer = css`
  transition-duration: 240ms;
  transition-property: opacity;
  /* max-height: 1000px; */
  opacity: 1;
`;

let styleFolded = css`
  max-height: 0px;
  overflow: hidden;
  opacity: 0;
`;

let stylePlaceholder = css`
  height: 40px;
`;

let styleSelected = css`
  background: rgba(242, 245, 251, 1);
  color: hsla(221, 100%, 61%, 1);

  :hover {
    background: rgba(242, 245, 251, 1);
  }
`;

let styleContainer = css`
  padding: 0 10px;
`;

let styleDisabled = css`
  cursor: not-allowed;
  color: #aaa;
  font-style: italic;

  :hover {
    background-color: white;
  }
`;

let styleDisplay = css`
  width: calc(100% - 20px);
  padding-left: 2px;

  :hover {
    background: hsla(220, 53%, 97%, 1);
  }
`;
