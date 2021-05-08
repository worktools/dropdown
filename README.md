## Meson Dropdown

[![npm](https://img.shields.io/npm/v/@worktools/dropdown)](https://www.npmjs.com/package/@worktools/dropdown)

> A collection of components of displaying information.

### Preview

[dropdown-area](http://r.tiye.me/worktools/dropdown/#/dropdown-area)
[dropdown-menu](http://r.tiye.me/worktools/dropdown/#/dropdown-menu)

### Usage

```bash
yarn add @worktools/dropdown
```

* Dropdown area

Demos http://r.tiye.me/worktools/dropdown/#/dropdown-area

```tsx
import { DropdownArea } from "@worktools/dropdown"

// make sure you got container element in HTML
// <div class="meson-dropdown-container"></div>

<DropdownArea className={styleTrigger} renderContent={(onClose) => "Some content"} hideClose>
  <div>No close button</div>
</DropdownArea>
```

* Dropdown Menu

```tsx
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

<DropdownMenu className={styleShortInput}
              value={selected}
              allowClear={false}
              items={items}
              onSelect={(value) => setSelected(value as string)}
              disabled={false}
              placeholder={"请选择"}
              emptyLocale={"没有数据"}  />
```

### Workflow

https://github.com/worktools/ts-workflow

### License

MIT
