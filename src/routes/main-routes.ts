import { SubCategory } from "../pages/sub-category/sub-category";
import { Category } from "../pages/category/category";
import React from "react";
import { CreateTab } from "../pages/category/components/category-tab";
import { EditCategory } from "../pages/category/components/edit-category";
import { EditSubCategory } from "../pages/sub-category/components/edit-subCategory";
import { Brand } from "../pages/brand/brand";
import { EditBrand } from "../pages/brand/components/edit-brand";
import { CreateBrand } from "../pages/brand/components/create-brand";
import { CreateSubCategoryTab } from "../pages/sub-category/components/create-subCategory-tab";
import { Atribute } from "../pages/atribute/atribute";
import { NotFound } from "../pages/not-found/not-found";
import { CreateAtributes } from "../pages/atribute/components/create-atributes";
import { AtributePageEditAtribute } from "../pages/atribute/components/atributePage-edit-atribute";
import { Product } from "../pages/product/product";
import { ProductCreate } from "../pages/product/components/productCreate";
import { ProductEdit } from "../pages/product/components/productEdit";
import { ProductVariant } from "../pages/product-variant/product-variant";
import { CreateProductVariant } from "../pages/product-variant/components/create-product-variant";
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
    component: CreateTab,
    path: "create-category",
  },
  {
    component: CreateSubCategoryTab,
    path: "create-sub-category",
  },
  {
    component: EditCategory,
    path: "edit-category/:id",
  },
  {
    component: EditSubCategory,
    path: "edit-sub-category/:id",
  },
  {
    component: Brand,
    path: "brand",
  },
  {
    component: EditBrand,
    path: "edit-brand/:id",
  },
  {
    component: CreateBrand,
    path: "create-brand",
  },
  {
    component: Atribute,
    path: "atribute",
  },
  {
    component: CreateAtributes,
    path: "create-atribute",
  },
  {
    component: NotFound,
    path: "*",
  },
  {
    component: AtributePageEditAtribute,
    path: "edit-atribute/:id",
  },
  {
    component: Product,
    path: "product",
  },
  {
    component: ProductCreate,
    path: "product-create",
  },
  {
    component: ProductEdit,
    path: "product-edit/:id",
  },
  {
    component: ProductVariant,
    path: "product-variant",
  },
  {
    component:CreateProductVariant,
    path:"create-product-variant"
  }
];
