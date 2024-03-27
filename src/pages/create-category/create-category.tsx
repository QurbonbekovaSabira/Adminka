import { Tabs } from "antd";
import { CreateCategoryComp } from "./components/create-categoryComp";
import { CreateSubCategory } from "./components/create-sub-category";
import React from "react";
import { ActiveType } from "./type";
export const CreateCategory = () => {
  const [active, setActive] = React.useState<ActiveType>({
    active: 1,
    title: "",
    id: null,
  });
  console.log(active);

  return (
    <Tabs
      activeKey={String(active.active)}
      items={[
        {
          label: "Tab 1",
          key: "1",
          children: <CreateCategoryComp setActive={setActive} />,
        },
        {
          label: "Tab 2",
          disabled: true,
          key: "2",
          children: <CreateSubCategory {...active} />,
        },
      ]}
    />
  );
};
