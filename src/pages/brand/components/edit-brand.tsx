import { useParams } from "react-router-dom";
import { CategoryForm } from "../../../components/category-form";
import { message, type UploadFile, type UploadProps } from "antd";
import { useEditBrand } from "../service/mutation/useEditBrand";
import React from "react";
import { SubmitData } from "../../../type";
import { useNavigate } from "react-router-dom";
import { useGetBrandId } from "../service/query/useGetBrandId";
export const EditBrand = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { mutate, isPending } = useEditBrand(Number(id));
  const { data } = useGetBrandId(Number(id));


  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const submit = (value: SubmitData) => {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("title", value.title);
    formData.append("image", value.image.file);
    mutate(formData, {
      onSuccess: () => {
        navigate("/app/brand");
      },
      onError: (error) => {
        message.error(error.message)
      },
    });
  };

  return (
    <div>
      <CategoryForm
        name="Brand"
        loading={isPending}
        onChange={handleChange}
        fileList={fileList}
        onFinish={submit}
        initialValue={{ title: data?.title, image: data?.image }}
      />
    </div>
  );
};
