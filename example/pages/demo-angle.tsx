import React, { FC } from "react";
import { css } from "@emotion/css";
import DropdownArea from "../../src/dropdown-area";
import { DocDemo, DocSnippet, DocBlock } from "@worktools/doc-frame";

let DemoAngle: FC<{ className?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={props.className}>
      <DocDemo title="Card with angle">
        <DocBlock content={content} />
        <DropdownArea className={styleTrigger} renderContent={(onClose) => "Some content"} showArrow>
          <div>No title</div>
        </DropdownArea>

        <DocSnippet code={codeAngle} />
      </DocDemo>
    </div>
  );
});

export default DemoAngle;

let styleTrigger = css`
  background-color: #ddd;
  margin: 16px;
  padding: 8px;
`;

let codeAngle = `
<DropdownArea
  className={styleTrigger}
  renderContent={(onClose) => "Some content"}
  showArrow>
  <div>No title</div>
</DropdownArea>
`;

let content = `
可以开启 \`showArrow\` 显示一个菜单的箭头. 特殊情况可以通过 \`transformCardPosition\` 控制调整显示的位置.
`;
