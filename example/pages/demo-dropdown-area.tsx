import React, { FC, useState } from "react";
import { css, cx } from "@emotion/css";
import DropdownArea from "../../src/dropdown-area";
import { expand } from "@worktools/flex-styles";
import { DocDemo, DocSnippet, DocBlock } from "@worktools/doc-frame";

let DemoDropdownArea: FC<{}> = (props) => {
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(expand, styleContainer)}>
      <DocDemo title="Default">
        <DocBlock content={contentDefault} />
        <DocSnippet code={codeHideTitle} />
        <DropdownArea className={styleTrigger} renderContent={(onClose) => "Some content"}>
          <div>No title</div>
        </DropdownArea>
      </DocDemo>

      <DocDemo title="With a title">
        <DocSnippet code={codeDropdownArea} />
        <DropdownArea className={styleTrigger} title="A title" renderContent={(onClose) => "Some content"}>
          <div>Content with title</div>
        </DropdownArea>
      </DocDemo>

      <DocDemo title="Hide close">
        <DocSnippet code={codeHideClose} />
        <DropdownArea className={styleTrigger} renderContent={(onClose) => "Some content"} hideClose>
          <div>No close button</div>
        </DropdownArea>
      </DocDemo>

      <DocDemo title="Align to right">
        <DocSnippet code={codeAlignRight} />
        <DropdownArea className={styleTrigger} renderContent={(onClose) => "Some content"} hideClose alignToRight>
          <div>Align to right</div>
        </DropdownArea>
      </DocDemo>

      <DocDemo title="Control width">
        <DocSnippet code={codeWidth} />
        <DropdownArea width={400} className={styleTrigger} renderContent={(onClose) => "Some content"}>
          <div>Content</div>
        </DropdownArea>
      </DocDemo>

      <DocDemo title="Width as trigger area">
        <DocSnippet code={codeWidthInherited} />
        <DropdownArea className={cx(styleTrigger, styleWider)} renderContent={(onClose) => "Some content"} hideClose>
          <div>Width inherited</div>
        </DropdownArea>
      </DocDemo>

      <DocDemo title="Close from inside menu">
        <DocSnippet code={codeCloseInside} />
        <DropdownArea
          className={cx(styleTrigger)}
          renderContent={(onClose) => (
            <div>
              Some content
              <button onClick={onClose}>Close</button>
            </div>
          )}
          hideClose
        >
          <div>A close button</div>
        </DropdownArea>
      </DocDemo>
    </div>
  );
};

export default DemoDropdownArea;

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

let codeDropdownArea = `
<DropdownArea
  className={styleTrigger}
  title="A title"
  renderContent={(onClose) => "Some content"}
  >
  <div>Content with title</div>
</DropdownArea>
`;

let codeHideTitle = `
<DropdownArea
  className={styleTrigger}
  renderContent={(onClose) => "Some content"}
  >
  <div>No title</div>
</DropdownArea>
`;

let codeHideClose = `
<DropdownArea
  className={styleTrigger}
  hideClose
  renderContent={(onClose) => "Some content"}
  >
  <div>No close button</div>
</DropdownArea>
`;

let codeAlignRight = `
<DropdownArea
  className={styleTrigger}
  hideClose
  alignToRight
  renderContent={(onClose) => "Some content"}
  >
  <div>Align to right</div>
</DropdownArea>
`;

let codeWidthInherited = `
<DropdownArea
  className={cx(styleTrigger, styleWider)}
  hideClose
  renderContent={(onClose) => "Some content"}
  >
  <div>Width inherited</div>
</DropdownArea>
`;

let codeCloseInside = `
<DropdownArea
  className={cx(styleTrigger)}
  renderContent={(onClose) => (
    <div>
      Some content
      <button onClick={onClose}>Close</button>
    </div>
  )}
  hideClose
  >
  <div>A close button</div>
</DropdownArea>
`;

let codeWidth = `
<DropdownArea
  width={400}
  className={styleTrigger}
  renderContent={(onClose) => "Some content"}
  >
  <div>Content</div>
</DropdownArea>
`;

let contentDefault = `
DropdownArea 默认弹出无内容的一个弹层, 方便根据业务定制.
需要下拉菜单样式请使用 DropdownMenu 组件.
目前当前组件对弹层超出屏幕边缘的情况只是做了基本的处理, 参考后方章节.
`;
