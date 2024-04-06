import { nanoid } from "@reduxjs/toolkit";
import { useGetProduct } from "./service/query/useGetProduct";
import {
  Button,
  Space,
  Table,
  Image,
  TableProps,
  Pagination,
  message,
} from "antd";
import { DataType } from "../category/type";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteProduct } from "./service/mutation/useDeleteProduct";
import { client } from "../../config/query-client";
export const Product = () => {
  const [page, setPage] = React.useState<number>(1);
  const { data, isLoading } = useGetProduct(page);
  const navigate = useNavigate();
  console.log(data?.data.results);

  const [id, setId] = React.useState<undefined | number>(undefined);
  const { mutate, isPending } = useDeleteProduct(id);
  const deleteProduct = (id: number) => {
    console.log(id);
    setId(id);
    mutate(undefined, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["get-product"] });
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "O/N",
      dataIndex: "num",
      key: "num",
    },
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
      key: "buttons",
      render: (_, allData) => (
        <Space size="middle" key={nanoid()}>
          <Button onClick={() => deleteProduct(allData.id)} type="primary">
            Delete
          </Button>
          <Button
            onClick={() => navigate(`/app/product-edit/${allData.id}`)}
            type="default"
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];
  let n = 1;
  const userData = data?.data.results?.map((item: DataType) => ({
    title: item.title,
    image: item.image,
    id: item.id,
    num: n++,
  }));
  return (
    <div>
      <Button
        onClick={() => navigate("/app/product-create")}
        style={{ marginBottom: "30px" }}
        type="primary"
        size="large"
      >
        Create Product
      </Button>
      <Table
        style={{ marginBottom: "30px" }}
        columns={columns}
        dataSource={userData}
        loading={isLoading || isPending}
        pagination={false}
      />
      <Pagination
        style={{ textAlign: "end" }}
        onChange={(page) => setPage((page - 1) * 5)}
        defaultPageSize={5}
        total={data?.pageSize}
      />
    </div>
  );
};
