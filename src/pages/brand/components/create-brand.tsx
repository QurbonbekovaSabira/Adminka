import { UploadProps, UploadFile, message } from "antd";
import { CategoryForm } from "../../../components/category-form";
import React from "react";
import { usePostBrand } from "../service/mutation/usePostBrand";
import { SubmitData } from "../../../type";
import { useNavigate } from "react-router-dom";

export const CreateBrand = () => {
  const { mutate, isPending } = usePostBrand();
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const navigate = useNavigate();
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const submit = (value: SubmitData) => {
    const formData = new FormData();
    formData.append("title", value.title);
    formData.append("image", value.image.file);
    mutate(formData, {
      onSuccess: () => {
        message.success("Created brand");
        navigate("/app/brand");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  return (
    <div>
      <CategoryForm
        fileList={fileList}
        onChange={handleChange}
        onFinish={submit}
        name="Brand"
        loading={isPending}
      />
    </div>
  );
};
