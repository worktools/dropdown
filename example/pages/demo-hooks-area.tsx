import React, { FC, Ref } from "react";
import { css } from "@emotion/css";
import { DocDemo, DocSnippet, DocBlock } from "@worktools/doc-frame";
import { useDropdownArea } from "../../src/dropdown-area";

let DemoHooksArea: FC<{}> = React.memo((props) => {
  /** Plugins */

  let dropdown = useDropdownArea({
    renderContent: () => {
      return <div>Some content in menu</div>;
    },
  });

  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div>
      <DocDemo title="Hook example for dropdown area">
        <DocBlock content={content} />
        <button
          ref={dropdown.triggerEl as Ref<any>}
          onClick={(event) => {
            dropdown.openMenu();
          }}
        >
          open menu
        </button>
        {dropdown.ui}

        <DocSnippet code={code} />
      </DocDemo>
    </div>
  );
});

export default DemoHooksArea;

let code = `
let dropdown = useDropdownArea({
  renderContent: () => {
    return <div>Some content in menu</div>;
  },
});

<div>
  <button
    ref={dropdown.triggerEl as Ref<any>}
    onClick={(event) => {
      dropdown.openMenu();
      event.stopPropagation();
    }}
  >
    open menu
  </button>
  {dropdown.ui}
</div>
`;

let content = `
DropdownArea 也提供了一个 Hooks API, 用在界面减少对 DOM 结构的侵入性, 也方便插件写法的业务开发.

不过这个写法要注意处理事件冒泡免得直接触发关闭.
`;
