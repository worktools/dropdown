import React, { FC, useState } from "react";
import { css } from "@emotion/css";
import { DocDemo, DocSnippet, DocBlock } from "@worktools/doc-frame";
import MenuTree, { IMenuTreeItem } from "../../src/menu-tree";
import { treeData } from "./data-dropdown-tree";

let DemoMenuTree: FC<{}> = React.memo((props) => {
  let [selected, setSelected] = useState(null as string);

  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  return (
    <div>
      <DocBlock content={content} />
      <DocDemo title="Menu Tree">
        <MenuTree
          selected={selected}
          data={treeData}
          onChange={(value) => {
            console.log("selecting", value);
            setSelected(value);
          }}
        />
        <DocSnippet code={code} />
      </DocDemo>
    </div>
  );
});

export default DemoMenuTree;

let content = `
\`MenuTree\` 组件可以单独使用.
`;

let code = `
let [selected, setSelected] = useState(null as string);

let treeData = [
  {
    value: 'a',
    display: 'A',
    children: []
  }
];

<MenuTree
  selected={selected}
  data={treeData}
  onChange={(value) => {
    setSelected(value);
  }}
/>
`;
