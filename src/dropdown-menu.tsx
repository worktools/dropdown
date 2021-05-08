import React, { FC, useMemo, ReactNode, useState } from "react";
import { css, cx } from "@emotion/css";
import DropdownArea from "./dropdown-area";
import MenuList, { MenuValue, IMenuListItem } from "./menu-list";
import { rowParted, center, rowCenter, expand, row, Space } from "@worktools/flex-styles";
import ContentInput from "./content-input";
import { useDebouncedCallback } from "use-debounce";
import { Search, XCircle } from "react-feather";

export interface IDropdownMenuProps {
  value: MenuValue;
  items: IMenuListItem[];
  onSelect: (value: MenuValue) => void;
  className?: string;
  menuClassName?: string;
  itemClassName?: string;
  placeholder?: string;
  emptyLocale?: string;
  placeholderClassName?: string;
  menuWidth?: number;
  disabled?: boolean;
  allowClear?: boolean;
  renderValue?: (x: any) => ReactNode;
  followWheel?: boolean;
  /**
   * search param
   * 当存在onSearch时，内部search失效，onSearch回调最新的搜索值。一般用于需要异步加载数据时。
   */
  showSearch?: boolean;
  onSearch?: (text: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;
  searchWait?: number;
}

let DropdownMenu: FC<IDropdownMenuProps> = (props) => {
  /** Methods */
  /** Effects */
  /** Renderers */

  let selectedItem = props.items.find((item) => item.value === props.value);
  let content = selectedItem?.title;

  if (props.value != null && props.renderValue != null) {
    content = props.renderValue(content);
  }

  let [active, setActive] = useState<boolean>(false);
  let [searchValue, setSearchValue] = useState<string>("");

  let inputElement = useMemo(
    () => (
      <ContentInput
        disabled={props.disabled}
        className={props.className}
        content={content}
        isActive={active}
        placeholderClassName={props.placeholderClassName}
        placeholder={props.placeholder}
        allowClear={props.allowClear}
        onClear={() => {
          props.onSelect(null);
        }}
      />
    ),
    [props.disabled, props.value, props.items, active]
  );

  if (props.disabled) {
    return inputElement;
  }

  const [debouncedChange] = useDebouncedCallback((val: string, event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    if (props.onSearch) {
      props.onSearch(val, event);
    }
  }, props.searchWait || 0);

  let onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setSearchValue(val);
    debouncedChange(val, event);
  };

  let renderSearch = () => {
    return (
      <div className={cx(styleSearch)}>
        <input
          style={{ paddingRight: searchValue.length > 0 ? 50 : 30 }}
          value={searchValue}
          placeholder={props.searchPlaceholder}
          className={styleSearchInput}
          onChange={onSearchChange}
        />
        <span className={cx(styleSearchIcon, rowCenter)}>
          {searchValue.length > 0 ? (
            <>
              <XCircle
                onClick={(event) => {
                  event.stopPropagation();
                  setSearchValue("");
                  if (props.onSearch) {
                    props.onSearch("", null);
                  }
                }}
                className={styleSearchClearIcon}
              />
              <Space width={2} />
            </>
          ) : null}

          <Search />
        </span>
      </div>
    );
  };

  const items = props.showSearch ? (props.onSearch ? props.items : props.items.filter((d) => `${d.title}`.indexOf(searchValue) > -1)) : props.items;

  return (
    <DropdownArea
      hideClose={true}
      width={props.menuWidth}
      cardClassName={styleMenu}
      adjustingPosition
      followWheel={props.followWheel}
      onExpand={(expand: boolean) => {
        setActive(expand);
        if (!expand) {
          setSearchValue("");
        }
      }}
      renderContent={(onClose) => {
        if (items.length === 0) {
          return (
            <>
              {props.showSearch ? renderSearch() : null}
              <div className={cx(center, styleEmptyList)}>{props.emptyLocale || DropdownMenu.defaultProps.emptyLocale}</div>
            </>
          );
        }
        return (
          <>
            {props.showSearch ? renderSearch() : null}
            <MenuList
              value={props.value}
              items={items}
              className={props.menuClassName}
              itemClassName={props.itemClassName}
              onSelect={(value) => {
                onClose();
                props.onSelect(value);
              }}
            />
          </>
        );
      }}
    >
      {inputElement}
    </DropdownArea>
  );
};

export default DropdownMenu;

DropdownMenu.defaultProps = {
  emptyLocale: "No data",
};

let styleMenu = css`
  min-height: 8px;
`;

let styleEmptyList = css`
  font-size: 12px;
  color: hsl(0, 0%, 75%);
  user-select: none;
  padding: 12px;
`;

let styleSearch = css`
  position: relative;
  padding: 8px 12px;
`;

let styleSearchInput = css`
  width: 100%;
  height: 32px;
  line-height: 32px;
  border-radius: 2px;
  border: 1px solid hsla(0, 0%, 91%, 1);
  padding-left: 12px;
  font-size: 14px;
  color: hsla(0, 0%, 20%, 1);

  :hover,
  :focus {
    outline: none;
    border-color: #3674ff !important;
    box-shadow: 0 0 1px #0635ab !important;
  }
  :active {
    box-shadow: none;
  }
  ::placeholder {
    color: hsla(0, 0%, 59%, 1);
  }
`;

let styleSearchIcon = css`
  position: absolute;
  font-size: 23px;
  right: 15px;
  top: 13px;
  line-height: 23px;
  color: hsla(0, 0%, 59%, 1);
`;

let styleSearchClearIcon = css`
  color: rgba(0, 0, 0, 0.25);
  font-size: 15px;
  cursor: pointer;
`;
