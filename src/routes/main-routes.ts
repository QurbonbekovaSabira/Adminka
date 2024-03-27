import { SubCategory } from "../pages/sub-category/sub-category";
import { Category } from "../pages/category/category";
import React from "react";
import { CreateCategory } from "../pages/create-category/create-category";
interface mainRoutesType {
  component: React.FC;
  path?: string;
}
export const mainRoutes: mainRoutesType[] = [
  {
    component: Category,
  },
  {
    component: SubCategory,
    path: "subCategory",
  },
  {
    component: CreateCategory,
    path: "create-category",
  },
];
