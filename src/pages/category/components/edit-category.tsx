import { useParams } from "react-router-dom";
import { useGetCategoryId } from "../../../service/query/useGetCategoryId";
import { usePutCategory } from "../service/mutation/usePutCategory";
import { Skeleton, Tabs, message } from "antd";
import { CategoryForm } from "../../../components/category-form";
import type { UploadFile, UploadProps } from "antd";
import { SubmitData } from "../../../type";
import React from "react";
import { useNavigate } from "react-router-dom";

export const EditCategory = () => {
  const { id } = useParams();
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const navigate = useNavigate();
  const { data, isLoading } = useGetCategoryId(Number(id));
  const { mutate, isPending } = usePutCategory(Number(id));
  const submit = (value: SubmitData) => {
    console.log(value);

    const formData = new FormData();
    formData.append("title", value.title);
    formData.append("image", value.image.file);
    formData.append("parent", "");
    formData.append("id", data?.id);
    mutate(formData, {
      onSuccess: () => {
        message.success("category update");
        navigate("/app");
      },
      onError: (error) => {
        message.error(error.message);
        console.log(error);
      },
    });
  };

  const handleChangeInput: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);
  if (isLoading) {
    return (
      <div>
        <>
          <div style={{ marginBottom: "20px", display: "block" }}>
            <Skeleton.Button size="small" />
          </div>
          <Skeleton.Input size="large" />
        </>
      </div>
    );
  }

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "Tab 1",
            key: "1",
            children: (
              <CategoryForm
                fileList={fileList}
                loading={isPending}
                onFinish={submit}
                onChange={handleChangeInput}
                initialValue={{ title: data.title, image: data.image }}
              />
            ),
          },
          {
            key: "2",
            label: <a href="#">Subcategory</a>,
          },
        ]}
      />
    </div>
  );
};
