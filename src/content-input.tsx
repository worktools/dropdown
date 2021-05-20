import React, { FC, ReactNode } from "react";
import { css, cx } from "@emotion/css";
import { rowParted, center, expand } from "@worktools/flex-styles";
import { GlobalThemeVariables } from "./theme";
import { ChevronDown, X } from "react-feather";

let ContentInput: FC<{
  content: ReactNode;
  className?: string;
  placeholder?: string;
  emptyLocale?: string;
  disabled?: boolean;
  allowClear?: boolean;
  placeholderClassName?: string;
  onClear?: () => void;
  isActive?: boolean;
}> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div
      className={cx(rowParted, styleContainer, GlobalThemeVariables.contentInput, props.disabled ? styleDisabled : null, props.className)}
      style={props.isActive ? { borderColor: "#3674ff" } : null}
      data-area="dropdown-input"
    >
      <span className={cx(styleValue, GlobalThemeVariables.contentInputValue)}>
        {props.content || (
          <span className={cx(stylePlaceholder, GlobalThemeVariables.contentInputPlaceholder, props.placeholderClassName)}>
            {props.placeholder || "Please select"}
          </span>
        )}
      </span>
      <ChevronDown
        size={16}
        color="hsl(0deg 0% 88%)"
        className={cx(styleIcon, GlobalThemeVariables.contentInputIcon)}
        style={props.isActive ? { transform: "rotate(180deg)" } : null}
      />
      {props.allowClear && props.content != null ? (
        <X
          color="hsl(0deg 0% 88%)"
          className={cx(styleRemoveIcon, GlobalThemeVariables.contentInputRemoveIcon, "allow-clear")}
          onClick={(event) => {
            event.stopPropagation();
            if (props.onClear != null) {
              props.onClear();
            } else {
              console.warn("onClear not implemented on ContentInput");
            }
          }}
        />
      ) : null}
    </div>
  );
});

export default ContentInput;

let styleContainer = css`
  height: 32px;
  line-height: 32px;
  padding: 0 12px;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  min-width: 120px;
  display: inline-flex;
  position: relative;
  background-color: white;

  transition-property: border-color;
  transition-duration: 300ms;

  &:hover {
    border-color: #3674ff;
  }

  .allow-clear {
    opacity: 0;
  }

  &:hover .allow-clear {
    opacity: 1;
  }
`;

let stylePlaceholder = css`
  color: #979797;
  font-size: 14px;
  user-select: none;
`;

let styleIcon = css`
  color: #e1e1e1;
  user-select: none;
  margin-left: 8px;
  font-size: 20px !important;
  transform: rotate(0deg);
  transition-property: transform;
  transition-duration: 300ms;
`;

let styleRemoveIcon = css`
  font-size: 10px;
  position: absolute;
  right: 12px;
  height: 13px;
  width: 13px;
  line-height: 12px;
  text-align: center;
  background-color: hsla(0, 0%, 80%);
  border-radius: 8px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: hsla(0, 0%, 75%);
  }
`;

let styleDisabled = css`
  background-color: hsl(0, 0%, 96%);
  cursor: not-allowed;
  color: hsla(0, 0%, 0%, 0.25);
`;

let styleValue = css`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  line-height: 34px;
  height: 32px;
  color: #323232;
`;
