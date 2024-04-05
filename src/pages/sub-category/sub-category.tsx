import { useGetSubCategory } from "./service/query/useGetSubCategory";
import { Table, Image, Space, Button, message, Pagination } from "antd";
import type { TableProps } from "antd";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { DataType } from "../category/type";
import { useDeleteCategory } from "../../service/mutation/useDeleteCategory";
import { SkeletonTable } from "../../components/skeleton-table";
import { client } from "../../config/query-client";
import React from "react";
export const SubCategory = () => {
  const [page, setPage] = React.useState<number>(1);
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
      onSuccess: () => {
        message.success("Success");
        client.invalidateQueries({ queryKey: ["get-subcategory"] });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  let n = 1;
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
          <Button
            onClick={() => navigate(`/app/edit-sub-category/${allData.id}`)}
            type="default"
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const userData = data?.data?.results?.map((item: any) => ({
    title: item.title,
    image: item.image,
    id: item.id,
    num: n++,
  }));
  if (isLoading) {
    return <SkeletonTable />;
  }
  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <Button
          size="large"
          loading={isPending}
          onClick={() => navigate("/app/create-sub-category")}
          type="primary"
        >
          Create Subcategory
        </Button>
      </div>
      <Table
        style={{ marginBottom: "30px" }}
        pagination={false}
        columns={columns}
        dataSource={userData}
      />
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Pagination
          onChange={(value) => setPage((value - 1) * 5)}
          defaultPageSize={1}
          total={data?.pageSize}
          pageSize={5}
        />
      </div>
    </div>
  );
};
