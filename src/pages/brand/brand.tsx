import { useGetBrand } from "./service/query/useGetBrand";
import { Table, Space, Button, message, Image } from "antd";
import type { TableProps } from "antd";
import { nanoid } from "@reduxjs/toolkit";
import { SkeletonTable } from "../../components/skeleton-table";
import { DataType } from "../category/type";
import { useDeleteBrand } from "./service/mutation/useDeleteBrand";
import React from "react";
import { useNavigate } from "react-router-dom";
export const Brand = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetBrand();
  const [deleteId, setId] = React.useState<number | undefined>(undefined);
  const { mutate, isPending } = useDeleteBrand(deleteId);
  const submit = (id: number) => {
    setId(id);
    mutate(undefined, {
      onSuccess: () => {
        message.success("Delete <brand");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Brand",
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
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
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
            onClick={() => submit(allData.id)}
            loading={isPending}
            type="primary"
          >
            Delete
          </Button>
          <Button
            onClick={() => navigate(`/app/edit-brand/${allData.id}/`)}
            type="default"
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];
  const userData = data?.results?.map((item: DataType) => ({
    title: item.title,
    image: item.image,
    id: item.id,
  }));
  if (isLoading) {
    <SkeletonTable />;
  }

  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <Button
          onClick={() => navigate("/app/create-brand")}
          type="primary"
          size="large"
        >
          Create Brand
        </Button>
      </div>
      <Table columns={columns} dataSource={userData} />
    </div>
  );
};
