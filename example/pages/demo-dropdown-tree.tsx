import React, { FC, useState } from "react";
import { css } from "@emotion/css";
import DropdownTree from "../../src/dropdown-tree";
import { DocDemo, DocSidebar, DocSnippet, DocBlock } from "@worktools/doc-frame";
import { treeData } from "./data-dropdown-tree";

let code = `
let treeData = [
  {
    value: 'a',
    display: 'A',
    children: []
  }
];

<DropdownTree
  value={selected}
  items={treeData}
  className={styleArea}
  placeholder={"请选择"}
  cardClassName={styleMenu}
  allowClear
  style={{ maxHeight: 300, width: 300, background: "black" }}
  onSelect={(value) => {
    setSelected(value);
  }}
/>

let styleMenu = css\`
  min-width: 240px;
\`;

let styleArea = css\`
  width: 200px;
\`;
`;

let customCode = `
<DropdownTree
  value={selected}
  items={treeData}
  className={styleArea}
  placeholder={"请选择"}
  cardClassName={styleMenu}
  allowClear
  style={{ maxHeight: 300, width: 300, background: "black" }}
  onSelect={(value) => {
    setSelected(value);
  }}
  renderValue={(x) => {
    return \`CUSTOM \${x}\`;
  }}
/>
`;

let contentCustom = `
\`renderValue\` 可以用于修改选中项的显示内容。
\`style\`在外层传入卡片宽度和最大高度，内置滚动条。
在style中传入的样式可部分覆盖已有弹出卡片样式
`;

let contentDisabled = `
\`disabled\` 属性可以设置禁用点击.
`;

let DemoDropdownTree: FC<{}> = React.memo((props) => {
  let [selected, setSelected] = useState(null as string);

  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div>
      <DocDemo title="Dropdown Tree">
        <DropdownTree
          value={selected}
          items={treeData}
          className={styleArea}
          placeholder={"请选择"}
          cardClassName={styleMenu}
          allowClear
          style={{ maxHeight: 300, width: 300 }}
          onSelect={(value) => {
            setSelected(value);
          }}
        />
        <DocSnippet code={code} />

        <DocBlock content={contentDisabled} />
      </DocDemo>

      <DocDemo title="Dropdown Tree">
        <DropdownTree
          value={selected}
          items={treeData}
          className={styleArea}
          placeholder={"请选择"}
          cardClassName={styleMenu}
          allowClear
          onSelect={(value) => {
            setSelected(value);
          }}
          renderValue={(x) => {
            return `CUSTOM ${x}`;
          }}
        />
        <DocBlock content={contentCustom} />
        <DocSnippet code={customCode} />
      </DocDemo>
    </div>
  );
});

export default DemoDropdownTree;

let styleMenu = css`
  min-width: 250px;
`;

let styleArea = css`
  width: 200px;
`;
