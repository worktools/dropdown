import { IMenuTreeItem } from "../../src/menu-tree";

export let treeData: IMenuTreeItem[] = [
  {
    value: "01",
    display: "公司",
    children: [
      {
        value: "02",
        display: "研发",
        children: [
          {
            value: "05",
            display: "前端开发",
          },
          {
            value: "06",
            display: "后端开发",
          },
          {
            value: "07",
            display: "设计部",
            children: [
              {
                value: "08",
                display: "配色",
                disabled: true,
              },
            ],
          },
        ],
      },
      {
        value: "03",
        display: "实施",
      },
      {
        value: "04",
        display: "人事部门",
      },
    ],
  },
];
