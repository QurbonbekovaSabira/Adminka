import { useParams } from "react-router-dom";
import { useGetCategoryId } from "../../../service/query/useGetCategoryId";
import { Tabs, UploadFile, UploadProps, message } from "antd";
import { CategoryForm } from "../../../components/category-form";
import React from "react";
import { usePutCategory } from "../../category/service/mutation/usePutCategory";
import { SubmitData } from "../../../type";
import { EditAtribut } from "./edit-atribut";

export const EditSubCategory = () => {
  const { id } = useParams();
  console.log(id);
  const { data } = useGetCategoryId(Number(id));
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const { mutate, isPending: editIsPending } = usePutCategory(Number(id));

  console.log(data?.attributes);

  const submit = (value: SubmitData) => {
    console.log(value);
    const formData = new FormData();
    formData.append("title", value.title);
    formData.append("image", value.image.file);
    formData.append("id", data?.id);
    mutate(formData, {
      onSuccess: () => {
        message.success("Update Subcategory");
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };
  const handleChangeInput: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "Sub category",
            key: "1",
            children: (
              <CategoryForm
                fileList={fileList}
                loading={editIsPending}
                onFinish={submit}
                onChange={handleChangeInput}
                initialValue={{ title: data?.title, image: data?.image }}
                name="Sub category"
              />
            ),
          },
          {
            key: "2",
            label: "Atribute",
            children: <EditAtribut id={id} />,
          },
        ]}
      />
    </div>
  );
};
