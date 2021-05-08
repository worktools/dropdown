import React, { FC, useState } from "react";
import { css, cx } from "@emotion/css";
import DropdownArea from "../../src/dropdown-area";
import { expand } from "@worktools/flex-styles";
import { DocBlock, DocSnippet, DocDemo } from "@worktools/doc-frame";

const doc = `
\`cardStyle\` 卡片样式，可单独使用或者与DropdownTree结合使用可选地继承父组件传入的style属性
`;

const docCode = `
<DropdownArea
  className={styleTrigger}
  renderContent={(onClose) => content}
  cardStyle={{ maxHeight: 200, width: 300 }}
>
  <div>Card with scroll</div>
</DropdownArea>
`;

const content = (
  <div>
    <ul>
      <li>some content</li>
      <li>some content</li>
      <li>some content</li>
      <li>some content</li>
      <li>some content</li>
      <li>some content</li>
      <li>some content</li>
      <li>some content</li>
      <li>some content</li>
      <li>some content</li>
      <li>some content</li>
      <li>some content</li>
    </ul>
  </div>
);

let DemoDropdownAreaScroll: FC<{}> = (props) => {
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(expand, styleContainer)}>
      <DocDemo title="Drop down area scroll">
        <DocBlock content={doc} />
        <DropdownArea className={styleTrigger} renderContent={(onClose) => content} cardStyle={{ maxHeight: 200, width: 300 }}>
          <div>Card with scroll</div>
        </DropdownArea>
        <DocSnippet code={docCode} />
      </DocDemo>
    </div>
  );
};

export default DemoDropdownAreaScroll;

let styleContainer = css`
  padding: 20px;
`;

let styleTrigger = css`
  background-color: #ddd;
  margin: 16px;
  padding: 8px;
`;

let styleWider = css`
  width: 300px;
`;

let styleInput = css`
  line-height: 24px;
  font-size: 14px;
  padding: 0 8px;
  outline: none;
`;
