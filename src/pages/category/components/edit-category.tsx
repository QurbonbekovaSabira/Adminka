import { useParams } from "react-router-dom";
import { useGetCategoryId } from "../../../service/query/useGetCategoryId";
import { usePutCategory } from "../service/mutation/usePutCategory";
import { Skeleton, Tabs } from "antd";
import { CategoryForm } from "../../../components/category-form";
import type { UploadFile, UploadProps } from "antd";
import { SubmitData } from "../../../type";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, Space, Button, message, Image } from "antd";
import type { TableProps } from "antd";
import { nanoid } from "@reduxjs/toolkit";
import { DataType } from "../type";
import { useDeleteCategory } from "../../../service/mutation/useDeleteCategory";
export const EditCategory = () => {
  const { id } = useParams();
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const navigate = useNavigate();
  const { data, isLoading } = useGetCategoryId(Number(id));
  const { mutate, isPending } = usePutCategory(Number(id));
  const [deleteId, setId] = React.useState<DataType>({
    id: 0,
    title: "",
    image: "",
  });
  const { mutate: deleteMutate, isPending: deletePending } =
    useDeleteCategory(deleteId);

  const submit = (value: SubmitData) => {
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
  const deleteCategory = (allData: DataType) => {
    setId(allData);
    deleteMutate(undefined, {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (img) => {
        return (
          <div>
            <Image
              style={{ width: "50px", height: "50px", objectFit: "contain" }}
              src={img}
              alt="img"
            />
          </div>
        );
      },
    },
    {
      title: "Changes",
      dataIndex: "buttons",
      render: (_, allData) => (
        <Space size="middle" key={nanoid()}>
          <Button
            loading={deletePending}
            onClick={() => deleteCategory(allData)}
            type="primary"
          >
            Delete
          </Button>
          <Button
            onClick={() => navigate(`/app/edit-category/${allData.id}`)}
            type="default"
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];
  const childrenData = data?.children?.map((item: DataType) => ({
    title: item.title,
    image: item.image,
    id: item.id,
  }));
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
            label: "Category",
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
            label: "Sub category",
            children: <Table columns={columns} dataSource={childrenData} />,
          },
        ]}
      />
    </div>
  );
};
