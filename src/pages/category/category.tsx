import { useGetCategory } from "../../service/query/useGetCategory";
import { Table, Space, Button, message, Image } from "antd";
import type { TableProps } from "antd";
import { useDeleteCategory } from "../../service/mutation/useDeleteCategory";
import { DataType } from "./type";
import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { useNavigate } from "react-router-dom";
import { SkeletonTable } from "../../components/skeleton-table";
export const Category = () => {
  const [id, setId] = React.useState<DataType>({
    id: 0,
    title: "lorem",
    image: "lorem",
  });
  const navigate = useNavigate();
  const { mutate } = useDeleteCategory(id);
  const { data: userData, isLoading } = useGetCategory();
  const deleteCategory = (newData: DataType) => {
    setId(newData);
    mutate(undefined, {
      onSuccess: (res) => {
        console.log(res);
        message.success("Delete category");
      },
      onError: (error) => {
        console.log(error);
        message.error(error.message);
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
          <Button onClick={() => deleteCategory(allData)} type="primary">
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
  const data = userData?.results?.map((item: DataType) => ({
    title: item.title,
    image: item.image,
    id: item.id,
  }));
  if (isLoading) {
    return <SkeletonTable />;
  }
  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <Button
          size="large"
          onClick={() => navigate("/app/create-category")}
          type="primary"
        >
          Create Category
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
