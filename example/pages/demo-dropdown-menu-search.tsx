import React, { FC, useState } from "react";
import { css } from "@emotion/css";
import { DocDemo, DocBlock, DocSnippet } from "@worktools/doc-frame";
import { default as DropdownMenu } from "../../src/dropdown-menu";
import { IMenuListItem } from "../../src/menu-list";

let items: IMenuListItem[] = [
  {
    value: "a",
    title: "A",
  },
  {
    value: "b",
    title: "使用 optionLabelProp 指定回填到选择框的 Option 属性。uses B",
  },
  {
    value: "c",
    title: "多选，从已有条目中选择。",
  },
  {
    value: "d",
    title: "弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。",
  },
];

let DemoDropdownMenuSearch: FC<{ className?: string }> = React.memo((props) => {
  let [selected, setSelected] = useState<string>(null);

  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={props.className}>
      <DocDemo title="带搜索框的下拉菜单">
        <DocBlock content={searchMenuDescription} />
        <DocSnippet code={codeSearchMenu} />

        <DropdownMenu
          showSearch
          allowClear
          className={styleShortInput}
          value={selected}
          items={items}
          onSelect={(value) => setSelected(value as string)}
          placeholder={"请选择"}
          searchPlaceholder={"搜索内容"}
          searchWait={600}
        />
      </DocDemo>
    </div>
  );
});

export default DemoDropdownMenuSearch;

let codeSearchMenu = `
<DropdownMenu
  showSearch
  allowClear
  className={styleShortInput}
  value={selected}
  items={demoData}
  onSelect={(value) => {}}
  placeholder={"请选择"}
  searchWait={600}
  searchPlaceholder={"搜索内容"}
  onSearch={(val) => {}}
/>
`;

let searchMenuDescription = `
\`onSearch\`属性存在时，关闭组件内部搜索功能， \`onSearch\`回调最新的搜索值，便于异步获取数据。
`;

let styleShortInput = css`
  width: 220px;
`;
