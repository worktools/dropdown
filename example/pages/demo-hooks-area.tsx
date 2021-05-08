import React, { FC, Ref } from "react";
import { css } from "@emotion/css";
import { DocDemo, DocSnippet, DocBlock } from "@worktools/doc-frame";
import { useDropdownArea } from "../../src/dropdown-area";

let DemoHooksArea: FC<{}> = React.memo((props) => {
  /** Plugins */

  let [ui, triggerRef, openMenu, closeMenu, internalState] = useDropdownArea({
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
          ref={triggerRef as Ref<any>}
          onClick={(event) => {
            openMenu();
          }}
        >
          open menu
        </button>
        {ui}

        <DocSnippet code={code} />
      </DocDemo>
    </div>
  );
});

export default DemoHooksArea;

let code = `
let [ui, triggerRef, openMenu, closeMenu, internalState] = useDropdownArea({
  renderContent: () => {
    return <div>Some content in menu</div>;
  },
});

<div>
  <button
    ref={triggerRef as Ref<any>}
    onClick={(event) => {
      openMenu();
      event.stopPropagation();
    }}
  >
    open menu
  </button>
  {ui}
</div>
`;

let content = `
DropdownArea 也提供了一个 Hooks API, 用在界面减少对 DOM 结构的侵入性, 也方便插件写法的业务开发.

不过这个写法要注意处理事件冒泡免得直接触发关闭.
`;
