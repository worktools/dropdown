import React, { FC } from "react";
import { css } from "@emotion/css";
import DropdownArea from "../../src/dropdown-area";
import { DocDemo, DocBlock } from "@worktools/doc-frame";

let DemoFollowWheel: FC<{}> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div>
      <DocDemo title="Respond to scrolling">
        <DocBlock content={content} />
        <DocBlock content="scroll..." />
        <DocBlock content="scroll..." />
        <DocBlock content="scroll..." />

        <DropdownArea followWheel className={styleTrigger} title="A title" renderContent={(onClose) => "Some content"}>
          <div>Content with title</div>
        </DropdownArea>

        <DocBlock content="scroll..." />
        <DocBlock content="scroll..." />
        <DocBlock content="scroll..." />
        <DocBlock content="scroll..." />
        <DocBlock content="scroll..." />
      </DocDemo>
    </div>
  );
});

export default DemoFollowWheel;

let styleTrigger = css`
  background-color: #ddd;
  margin: 16px;
  padding: 8px;
`;

let content = `
开启 \`followWheel\` 可以激活对 \`window\` 对象上的 \`wheel\` 事件的监听, 每次事件触发重新计算位置.

(该功能为试验功能. 目前无法响应方向键等操作引起的滚动, 而且对鼠标滚轮操作位置计算有较大偏差.)
`;
