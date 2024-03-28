import { Tabs } from "antd";
import { CreateSubCategory } from "./create-subCategory";
import { ActiveType } from "../../category/type";
import React from "react";
export const CreateSubCategoryTab = () => {
  const [active, setActive] = React.useState<ActiveType>({
    active: 1,
    title: "",
    id: null,
  });
  return (
    <Tabs
      activeKey={String(active.active)}
      items={[
        {
          label: "Sub category",
          key: "1",
          children: <CreateSubCategory setActive={setActive} />,
        },
        {
          label: "Atribute",
          disabled: true,
          key: "2",
          children: <h2>Lorem, ipsum.</h2>,
        },
      ]}
    />
  );
};
