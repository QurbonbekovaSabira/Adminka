import { SubCategory } from "../pages/sub-category/sub-category";
import { Category } from "../pages/category/category";
import React from "react";
import { CreateCategory } from "../pages/create-category/create-category";
import { CreateSubCategory } from "../pages/create-subCategory/create-subCategory";
import { EditCategory } from "../pages/editCategory/editCategory";
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
  {
    component: CreateSubCategory,
    path: "create-sub-category",
  },
  {
    component: EditCategory,
    path: "edit-category/:id",
  },
];
