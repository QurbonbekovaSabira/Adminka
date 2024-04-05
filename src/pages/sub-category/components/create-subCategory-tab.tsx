import { Tabs } from "antd";
import { CreateSubCategory } from "./create-subCategory";
import { CreateAtribute } from "./create-atribute";
import React from "react";
import { ActiveType } from "../../category/type";
export const CreateSubCategoryTab = () => {
  const [active, setActive] = React.useState<ActiveType>({
    active: "1",
    title: "",
    id: null,
  });

  return (
    <Tabs
      activeKey={active.active}
      items={[
        {
          label: "Sub category",
          key: "1",
          children: <CreateSubCategory setActive={setActive} />,
        },
        {
          label: "Atribute",
          key: "2",
          children: <CreateAtribute {...active} />,
        },
      ]}
    />
  );
};
