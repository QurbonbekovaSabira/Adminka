import { useGetCategory } from "../../service/query/useGetCategory";
import { Table, Space, Button } from "antd";
import type { TableProps } from "antd";
import { useDeleteCategory } from "../../service/mutation/useDeleteCategory";
import { DataType } from "./type";
import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton, Image } from "antd";
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
  const data = userData?.results?.map((item) => ({
    title: item.title,
    image: item.image,
    id: item.id,
  }));
  if (isLoading) {
    return (
      <div style={{ paddingTop: "35px" }}>
        <div style={{ marginBottom: "30px" }}>
          <Skeleton.Button block={false} active={false} size="large" />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            marginBottom: "20px",
          }}
        >
          <Skeleton.Input active={true} size="large" />
          <Skeleton.Button block={false} active={false} size="default" />
          <Skeleton.Image active />
          <Space>
            <Skeleton.Button block={false} active={false} size="default" />
            <Skeleton.Button block={false} active={false} size="default" />
          </Space>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            marginBottom: "20px",
          }}
        >
          <Skeleton.Input active={true} size="large" />
          <Skeleton.Button block={false} active={false} size="default" />
          <Skeleton.Image active />
          <Space>
            <Skeleton.Button block={false} active={false} size="default" />
            <Skeleton.Button block={false} active={false} size="default" />
          </Space>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            marginBottom: "20px",
          }}
        >
          <Skeleton.Input active={true} size="large" />
          <Skeleton.Button block={false} active={false} size="default" />
          <Skeleton.Image active />
          <Space>
            <Skeleton.Button block={false} active={false} size="default" />
            <Skeleton.Button block={false} active={false} size="default" />
          </Space>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            marginBottom: "20px",
          }}
        >
          <Skeleton.Input active={true} size="large" />
          <Skeleton.Button block={false} active={false} size="default" />
          <Skeleton.Image active />
          <Space>
            <Skeleton.Button block={false} active={false} size="default" />
            <Skeleton.Button block={false} active={false} size="default" />
          </Space>
        </div>
      </div>
    );
  }
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
