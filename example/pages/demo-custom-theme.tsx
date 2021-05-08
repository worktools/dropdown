import React, { FC } from "react";
import { css } from "@emotion/css";
import { JimoButton } from "@worktools/jimo-basics";
import { attachDropdownThemeVariables } from "../../src/theme";
import { DocBlock, DocDemo, DocSnippet } from "@worktools/doc-frame";

let CustomThemePage: FC<{ className?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={props.className}>
      <DocDemo title={"Custom Theme"}>
        <JimoButton
          text="设置深色样式"
          onClick={() => {
            attachDropdownThemeVariables({
              closeIcon: styleCloseIcon,
              contentInput: styleContentInput,
              menuTreeItem: styleMenuTreeItem,
            });

            alert("切换到其他页面查看");
          }}
        />

        <DocBlock content={content} />

        <DocSnippet code={code} />
      </DocDemo>
    </div>
  );
});

export default CustomThemePage;

let content = `定制主题`;

let code = `
attachDropdownThemeVariables({
  // card
  closeIcon: emptyStyle,

  // content input
  contentInput: emptyStyle,
  contentInputValue: emptyStyle,
  contentInputIcon: emptyStyle,
  contentInputPlaceholder: emptyStyle,
  contentInputRemoveIcon: emptyStyle,

  // menu
  menuList: emptyStyle,
  menuListItem: emptyStyle,
  menuListItemSelected: emptyStyle,

  // menu tree
  menuTree: emptyStyle,
  menuTreeItem: emptyStyle,
});
`;

attachDropdownThemeVariables({});

let styleContentInput = css`
  border-color: hsl(0, 0%, 60%);
`;

let styleCloseIcon = css`
  color: hsl(0, 0%, 60%);
`;

let styleMenuTreeItem = css`
  border-color: hsl(0, 0%, 60%);
`;
