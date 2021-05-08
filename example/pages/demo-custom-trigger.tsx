import React, { FC } from "react";
import { css } from "@emotion/css";
import { DocDemo, DocSnippet, DocBlock } from "@worktools/doc-frame";
import DropdownArea from "../../src/dropdown-area";

let DemoCustomTrigger: FC<{}> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div>
      <DocDemo title="Custom trigger">
        <DocBlock content={contentTrigger} />
        <DocSnippet code={codeTrigger} />
        <DropdownArea
          className={styleTrigger}
          title="A title"
          renderContent={(onClose) => "Some content"}
          renderTrigger={(openMenu, closeMenu) => {
            return (
              <input
                className={styleInput}
                placeholder={"Custom trigger"}
                onChange={(event) => {
                  if (event.target.value === "") {
                    closeMenu();
                  } else {
                    openMenu();
                  }
                }}
              />
            );
          }}
        />
      </DocDemo>
    </div>
  );
});

export default DemoCustomTrigger;

let codeTrigger = `
<DropdownArea
  className={styleTrigger}
  title="A title"
  renderContent={(onClose) => "Some content"}
  renderTrigger={(openMenu, closeMenu) => {
    return (
      <input
        className={styleInput}
        placeholder={"Custom trigger"}
        onChange={(event) => {
          if (event.target.value === "") {
            closeMenu();
          } else {
            openMenu();
          }
        }}
      />
    );
  }}
/>
`;

let styleTrigger = css`
  background-color: #ddd;
  margin: 16px;
  padding: 8px;
`;

let styleInput = css`
  line-height: 24px;
  font-size: 14px;
  padding: 0 8px;
  outline: none;
`;

let contentTrigger = `
默认情况下 \`props.children\` 的点击事件会触发弹层打开.
如果需要定制, 就用 \`renderTrigger\` 方法来重新定义, 并通过 \`openMenu\` \`closeMenu\` 参数控制.
`;
