import { message } from "antd";
import type { UploadFile, UploadProps } from "antd";
import React from "react";
import { usePostCategory } from "../service/mutation/usePostCategory";
import { SubmitData } from "../../../type";
import { CategoryForm } from "../../../components/category-form";
import { Type } from "../../../type";

export const CreateCategoryComp: React.FC<Type> = (setActive) => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const { mutate, isPending } = usePostCategory();
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const submit = (value: SubmitData) => {
    const formData = new FormData();

    formData.append("title", value.title);
    formData.append("image", value.image.file);
    formData.append("parent", "");
    mutate(formData, {
      onSuccess: (res) => {
        message.success("Category cretated");
        setActive.setActive({
          active: "2",
          title: value.title,
          id: res?.data?.id,
        });
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };

  return (
    <div>
      <CategoryForm
        onChange={handleChange}
        fileList={fileList}
        loading={isPending}
        onFinish={submit}
      />
    </div>
  );
};
