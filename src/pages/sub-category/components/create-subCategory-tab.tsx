import { Tabs } from "antd";
import { CreateSubCategory } from "./create-subCategory";
import { ActiveType } from "../../category/type";
import React from "react";
import { CreateAtribute } from "./create-atribute";
export const CreateSubCategoryTab = () => {
  const [active, setActive] = React.useState<ActiveType>({
    active: 1,
    title: "",
    id: null,
  });
  return (
    <Tabs
      activeKey={String(active.active)}
      // defaultActiveKey="1"
      items={[
        {
          label: "Sub category",
          key: "1",
          children: <CreateSubCategory setActive={setActive} />,
        },
        {
          label: "Atribute",
          key: "2",
          children: <CreateAtribute active={active} />,
        },
      ]}
    />
  );
};
