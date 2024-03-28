import { Tabs } from "antd";
import { CreateCategoryComp } from "./create-categoryComp";
import { CreateSubCategory } from "./create-sub-category";
import React from "react";
import { ActiveType } from "../type";

export const CreateTab = () => {
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
          label: "Category",
          key: "1",
          children: <CreateCategoryComp setActive={setActive} />,
        },
        {
          label: "Sub category",
          disabled: true,
          key: "2",
          children: <CreateSubCategory {...active} />,
        },
      ]}
    />
  );
};
