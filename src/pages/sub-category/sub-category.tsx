import { useGetSubCategory } from "./service/query/useGetSubCategory";
import { Table, Image, Space, Button } from "antd";
import type { TableProps } from "antd";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { DataType } from "../category/type";
import { useDeleteCategory } from "../../service/mutation/useDeleteCategory";
import { Skeleton } from "antd";
import React from "react";
export const SubCategory = () => {
  const { data, isLoading } = useGetSubCategory();
  const [id, setID] = React.useState<DataType>({
    id: 0,
    title: "lorem",
    image: "lorem",
  });
  const { mutate, isPending } = useDeleteCategory(id);
  const navigate = useNavigate();
  const deleteSubCategory = (allData: DataType) => {
    setID(allData);
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
          <Button onClick={() => deleteSubCategory(allData)} type="primary">
            Delete
          </Button>
          <Button type="default">Edit</Button>
        </Space>
      ),
    },
  ];

  const userData = data?.results?.map((item: any) => ({
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
        <Button
          loading={isPending}
          onClick={() => navigate("/app/create-sub-category")}
          type="primary"
        >
          Create Subcategory
        </Button>
      </div>
      <Table columns={columns} dataSource={userData} />
    </div>
  );
};
