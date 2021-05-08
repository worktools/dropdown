import { css, cx } from "@emotion/css";
import { CSSTransition } from "react-transition-group";
import EventEmitter from "eventemitter3";

let transitionDurationEnter = 120;
let transitionDurationExit = 300;
let relativeOffset = 4; /** 菜单相对弹出位置有一个上下偏差, 以免形成遮挡 */

let containerName = "meson-dropdown-container";

import React, { FC, useEffect, useState, ReactNode, CSSProperties, useRef, Ref } from "react";
import ReactDOM from "react-dom";
import { rowParted, column } from "@worktools/flex-styles";
import { checkIfDomTreeContains } from "./dom";
import { GlobalThemeVariables } from "./theme";

type FuncVoid = () => void;

interface IUseDropdownAreaProps {
  title?: string;
  /** 弹出的卡片的样式 */
  cardClassName?: string;
  /** 菜单对准右侧, 从右往左弹出 */
  alignToRight?: boolean;
  width?: number;
  renderContent: (closeMenu: FuncVoid) => ReactNode;
  hideClose?: boolean;
  // 设置弹出卡片样式
  cardStyle?: CSSProperties;

  /** 强行监听 wheel 事件, 重新设置弹出菜单的位置 */
  followWheel?: boolean;

  /** 监听打开、关闭 */
  onExpand?: (visible: boolean) => void;

  /** hard code position transforming when necessary */
  transformCardPosition?: (p: IPosition) => IPosition;
  showArrow?: boolean;

  /** DEPRECATED */
  guessHeight?: number;
  /** DEPRECATED */
  adjustingPosition?: true;
}

interface IProps extends IUseDropdownAreaProps {
  /** trigger 区域的样式 */
  className?: string;
  style?: CSSProperties;

  /** optional, by default, the area responds to click event,
   * there are cases we want to control how the menu is created
   */
  renderTrigger?: (openMenu: FuncVoid, closeMenu: FuncVoid) => ReactNode;
}

interface IPosition {
  top: number;
  left: number;
  angleTop: number;
  angleLeft: number;
  atBottom: boolean;
}

export let useDropdownArea = (props: IUseDropdownAreaProps) => {
  let [visible, setVisible] = useState(false);
  let [position, setPosition] = useState({} as IPosition);
  let [inheritedWidth, setInheritedWidth] = useState(null as number);

  let el = useRef<HTMLDivElement>(null);
  let triggerEl = useRef<HTMLDivElement>(null);
  let cardEl = useRef<HTMLDivElement>(null);
  let openTimeRef = useRef(0);
  let containerElRef = useRef<HTMLDivElement>();

  // adding more margin when arrow is displayed
  let arrowOffset = 4;
  if (!props.showArrow) {
    arrowOffset = 0;
  }

  /** Methods */

  let handlePopPosition = () => {
    let rect = triggerEl.current.getBoundingClientRect();

    // TODO, 目前用法高度比较简单, 但是复杂的情况还是可能出现宽度改变以后高度不准确
    let cardHeight = cardEl.current.offsetHeight;

    // 计算过程当中, 宽度还没准确设定好, 按照设定逻辑提前计算
    // props.width 或者按照触发元素的宽度, 但是最小值 100px
    let cardWidth = Math.max(props.width || rect.width, 100);

    // 如果计算宽度超出显示区域, 往左弹出
    let almostOut = false;
    let reachingBottom = false;

    almostOut = rect.left + cardWidth + relativeOffset > window.innerWidth;

    reachingBottom = rect.bottom + arrowOffset + cardHeight + relativeOffset > window.innerHeight;

    let positionTop = rect.bottom + arrowOffset + relativeOffset;

    if (reachingBottom) {
      if (rect.top > cardHeight) {
        positionTop = rect.top - relativeOffset - cardHeight - arrowOffset;
      } else {
        positionTop = window.innerHeight - relativeOffset - cardHeight;
      }
    }

    let positionLeft = Math.max(rect.left, relativeOffset);
    if (almostOut) {
      positionLeft = window.innerWidth - relativeOffset - cardWidth;
    }

    if (props.alignToRight) {
      positionLeft = Math.min(rect.right - cardWidth, window.innerWidth - relativeOffset - cardWidth);
    }

    // console.log("xPostion:", xPosition, rect);
    // console.log("width:", almostOut, props.alignToRight, cardWidth, window.innerWidth);

    setInheritedWidth(rect.width);

    setPosition({
      left: positionLeft,
      top: positionTop,

      atBottom: reachingBottom,
      //
      angleLeft: rect.left + rect.width / 2,
      angleTop: reachingBottom ? rect.top - relativeOffset - arrowOffset : rect.bottom + relativeOffset + arrowOffset,
    });
  };

  let openMenu = () => {
    if (visible) {
      return;
    }

    setVisible(true);

    // 记录打开时间, 打开过程关闭点击响应
    openTimeRef.current = Date.now();
  };

  let onClickClose = (event: MouseEvent | React.MouseEvent) => {
    // 点击在卡片内, 不要关闭菜单
    let insidePopCard = checkIfDomTreeContains(containerElRef.current, event.target as HTMLElement);
    if (insidePopCard) {
      return;
    }

    // 打开过程当中不响应点击事件
    if (Date.now() - openTimeRef.current > transitionDurationEnter) {
      setVisible(false);
    }
  };

  let onUserClose = () => {
    setVisible(false);
  };

  /** Effects */

  if (el.current == null) {
    el.current = document.createElement("div");
  }

  useEffect(() => {
    let root = document.querySelector(`.${containerName}`);

    if (root == null) {
      console.error(`Required a container element in body: <div class="${containerName}" />`);
      return;
    }

    root.appendChild(el.current);

    window.addEventListener("click", onClickClose);

    return () => {
      let root = document.querySelector(`.${containerName}`);

      if (root == null) {
        console.error(`Required a container element in body: <div class="${containerName}" />`);
        return;
      }

      root.removeChild(el.current);

      window.removeEventListener("click", onClickClose);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      // 如果计算宽度超出显示区域, 往左弹出

      handlePopPosition();
    }
  }, [visible]);

  // bypass closure issue with a ref
  let wheelChangeHandler = useRef<FuncVoid>();
  wheelChangeHandler.current = () => {
    if (visible) {
      handlePopPosition();
    }
  };

  useEffect(() => {
    if (props.followWheel) {
      let onWindowWheelChange = () => {
        wheelChangeHandler.current();
      };
      window.addEventListener("wheel", onWindowWheelChange);
      return () => {
        window.removeEventListener("wheel", onWindowWheelChange);
      };
    }
  }, []);

  // this is a change listener, leading call is skipped on purpose, visible state may got mirrored in parent
  let readyToEmitChange = useRef(false);
  useEffect(() => {
    if (readyToEmitChange.current) {
      props.onExpand?.(visible);
    } else {
      readyToEmitChange.current = true;
    }
  }, [visible]);

  /** Renderers */

  // transform card position when necessary
  if (props.transformCardPosition != null) {
    position = props.transformCardPosition(position);
  }

  let renderDropdown = () => {
    let getSvg = (color: string, width: number, height: number) => (
      <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
        <path
          d="M22 20.586L41.799.786a1 1 0 1 1 1.414 1.415L23.414 22l19.8 19.799a1 1 0 1 1-1.415 1.414L22 23.414l-19.799 19.8a1 1 0 0 1-1.414-1.415L20.586 22 .786 2.201A1 1 0 0 1 2.202.787L22 20.586z"
          fill={color}
          fillRule="nonzero"
        />
      </svg>
    );

    return ReactDOM.createPortal(
      <div className={styleDownAnimations} ref={containerElRef}>
        <CSSTransition in={visible} unmountOnExit={true} classNames="dropdown" timeout={transitionDurationExit}>
          <div
            className={cx(column, stylePopPage, "popup-card", props.cardClassName)}
            ref={cardEl}
            style={{
              overflow: "auto",
              width: props.width || inheritedWidth,
              top: position.top,
              left: position.left,
              ...props.cardStyle,
            }}
            data-action="dropdown-area"
          >
            {props.title ? (
              <div className={cx(rowParted, styleHeader)}>
                <span>{props.title}</span>
              </div>
            ) : null}
            {props.hideClose ? null : (
              <span className={cx(styleCloseIcon, GlobalThemeVariables.closeIcon)} onClick={onUserClose}>
                {getSvg("#aaa", 14, 14)}
              </span>
            )}
            {props.renderContent(onUserClose)}
          </div>
        </CSSTransition>
        {props.showArrow ? (
          <CSSTransition in={visible} unmountOnExit={true} classNames="dropdown" timeout={transitionDurationExit}>
            <div
              className={cx("popup-card", styleArrowWrapper)}
              style={{
                left: position.angleLeft,
                top: position.angleTop,
              }}
            >
              <div
                className={styleArrow}
                style={{
                  // magic numbers to position angle
                  transform: position.atBottom ? "translate(-9px, 9px) rotate(-135deg)" : "rotate(45deg) translate(0px, -2px)",
                }}
              ></div>
            </div>
          </CSSTransition>
        ) : null}
      </div>,
      el.current
    );
  };

  let ui = renderDropdown();

  let internalState = {
    visible,
  };

  return [ui, triggerEl, openMenu, onUserClose, internalState] as [ReactNode, Ref<HTMLDivElement>, typeof openMenu, typeof onUserClose, typeof internalState];
};

let DropdownArea: FC<IProps> = React.memo((props) => {
  let [ui, triggerEl, openMenu, onClose] = useDropdownArea(props);

  /** Plugins */
  /** Methods */

  let onTriggerClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    openMenu();
  };

  /** Effects */
  /** Renderers */

  if (props.renderTrigger != null) {
    return (
      <>
        <div className={cx(styleTrigger, props.className)} style={props.style} ref={triggerEl}>
          {props.renderTrigger(openMenu, onClose)}
        </div>
        {ui}
      </>
    );
  }

  return (
    <>
      <div className={cx(styleTrigger, props.className)} style={props.style} onClick={onTriggerClick} ref={triggerEl}>
        {props.children}
      </div>
      {ui}
    </>
  );
});

export default DropdownArea;

let styleDownAnimations = css`
  .dropdown-enter {
    opacity: 0;

    &.popup-card {
      transform: translate(0, -5px) scale(1);
    }
  }
  .dropdown-enter.dropdown-enter-active {
    opacity: 1;
    transition-duration: ${transitionDurationEnter}ms;
    &.popup-card {
      transform: translate(0px, 0px);
      transition-duration: ${transitionDurationEnter}ms;
    }
  }
  .dropdown-exit {
    opacity: 1;

    &.popup-card {
      transform: translate(0px, 0px);
    }
  }
  .dropdown-exit.dropdown-exit-active {
    opacity: 0;
    transition-duration: ${transitionDurationExit}ms;

    &.popup-card {
      transform: translate(0px, -5px) scale(1);
      transition: ${transitionDurationExit}ms;
    }
  }
`;

let stylePopPage = css`
  border-radius: 2px;

  margin: auto;
  z-index: 1000; /* same as antd popups */

  position: fixed;

  background-color: white;
  box-shadow: 0px 1px 4px 0px rgba(2, 41, 128, 0.2);

  min-width: 220px;
  min-height: 80px;
  max-height: 360px;

  transform-origin: 50% -50%;

  transition-timing-function: linear;
`;

let styleHeader = css`
  padding: 0 16px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid hsl(0, 0%, 91%);
`;

let styleCloseIcon = css`
  color: #aaa;
  cursor: pointer;
  font-size: 12px;
  position: absolute;
  top: 14px;
  right: 16px;
`;

let styleTrigger = css`
  cursor: pointer;
  display: inline-block;
`;

let styleArrow = css`
  width: 8px;
  height: 8px;
  border-width: 4px;
  border-style: solid;
  border-color: white transparent transparent white;
  pointer-events: none;

  transform-origin: 50% -50%;
  box-shadow: -1px -1px 2px hsla(0, 0%, 0%, 0.09);
`;

let styleArrowWrapper = css`
  position: fixed;
  z-index: 1001;
  transition-timing-function: linear;
`;
