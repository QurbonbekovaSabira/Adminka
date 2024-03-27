import { useGetCategory } from "./service/query/useGetCategory";
import { Table, Image, Space, Button } from "antd";
import type { TableProps } from "antd";
import { useDeleteCategory } from "./service/mutation/useDeleteCategory";
import { DataType } from "./type";
import { nanoid } from "@reduxjs/toolkit";
import { client } from "../../config/query-client";
import React from "react";
import { useNavigate } from "react-router-dom";
export const Category = () => {
  const [id, setId] = React.useState<DataType>({
    id: 0,
    title: "lorem",
    image: "lorem",
  });
  const navigate = useNavigate();
  const { mutate } = useDeleteCategory(id);
  const { data: userData } = useGetCategory();
  const deleteCategory = (newData: DataType) => {
    setId(newData);
    mutate(undefined, {
      onSuccess: (res) => {
        console.log(res);
        // client.invalidateQueries(["delete-category"]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Category",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (img) => {
        return (
          <div>
            <Image
              style={{ width: "80px", height: "80px" }}
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
          <Button type="default">Edit</Button>
        </Space>
      ),
    },
  ];
  const data = userData?.results?.map((item) => ({
    title: item.title,
    image: item.image,
    id: item.id,
  }));

  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <Button onClick={() => navigate("/app/create-category")} type="primary">
          Create Category
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
