import { UploadFile, UploadProps, message } from "antd";
import { useGetSubCategoryFull } from "../../../service/query/useGetSubCategoryFull";
import React from "react";
import { usePostProduct } from "../service/mutation/usePostProduct";
import { useNavigate } from "react-router-dom";
import { SubmitProduct } from "../type";
import { ProductForm } from "../../../components/product-form";
export const ProductCreate = () => {
  const { data, isLoading } = useGetSubCategoryFull();
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const navigate = useNavigate();
  const { mutate, isPending } = usePostProduct();
  const item: any = [];
  data?.results.map((subCategory) =>
    item.push({
      value: subCategory.id,
      label: subCategory.title,
      key: subCategory.id,
    })
  );
  const handleChangeInput: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);

  const submit = (value: SubmitProduct) => {
    console.log(value);
    const formData = new FormData();
    formData.append("title", value.title);
    formData.append("image", value.image.file);
    if (value.isNew === undefined) {
      formData.append("is_new", "false");
    } else {
      formData.append("is_new", String(value.isNew));
    }
    if (value.is_available === undefined) {
      formData.append("is_available", "false");
    } else {
      formData.append("is_available", String(value.is_available));
    }
    formData.append("category", String(value.category));
    formData.append("price", value.price.toString());

    mutate(formData, {
      onSuccess: () => {
        message.success("Product created");
        navigate("/app/product");
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };
  return (
    <div>
      <ProductForm
        loading={isPending || isLoading}
        submit={submit}
        options={item}
        onChange={handleChangeInput}
        fileList={fileList}
      />
    </div>
  );
};
