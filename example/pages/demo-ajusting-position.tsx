import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import { DocDemo, DocSnippet, DocBlock } from "@worktools/doc-frame";
import DropdownArea from "../../src/dropdown-area";

let DemoAjustingPosition: FC<{}> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div>
      <DocDemo title="Detect edge">
        <DocBlock content={contentEdge} />
        <DocSnippet code={codeEdge} />
        <DropdownArea className={cx(styleTrigger)} width={400} renderContent={(onClose) => "Some content"} hideClose>
          <div>detect edge</div>
        </DropdownArea>
      </DocDemo>

      <DocDemo title="Position">
        <DocBlock content={content} />
        <DocSnippet code={code} />
        <DropdownArea
          className={styleTrigger}
          adjustingPosition
          renderContent={(onClose) => {
            return <div style={{ height: 240 }}>No close button</div>;
          }}
          hideClose
        >
          Auto adjusting position
        </DropdownArea>
      </DocDemo>
    </div>
  );
});

export default DemoAjustingPosition;

let styleTrigger = css`
  background-color: #ddd;
  margin: 16px;
  padding: 8px;
`;

let codeEdge = `
<DropdownArea
  className={cx(styleTrigger)}
  width={400}
  hideClose
  renderContent={(onClose) => "Some content"}
  >
  <div>detect edge</div>
</DropdownArea>
`;

let content = `
下方空间不够的时候, 菜单会改为往上弹出.
`;

let code = `
<DropdownArea
  className={styleTrigger}
  adjustingPosition
  renderContent={(onClose) => {
    return <div style={{ height: 240 }}>No close button</div>;
  }}
  hideClose
>
  Auto adjusting position
</DropdownArea>
`;

let contentEdge = `
超出屏幕横向区域的卡片会被纠正回到屏幕内.
`;
