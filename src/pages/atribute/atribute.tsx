import { useGetAtribute } from "./service/query/useGetAtribute";
import { SkeletonTable } from "../../components/skeleton-table";
import {
  Table,
  Space,
  Button,
  message,
  TableProps,
  Spin,
  Pagination,
} from "antd";
import { nanoid } from "@reduxjs/toolkit";
import { useDeleteAtribute } from "../../service/mutation/useDeleteAtribute";
import React from "react";
import { client } from "../../config/query-client";
import { useNavigate } from "react-router-dom";
interface AtributType {
  id: number;
  title: string;
  category_title: { title: string }[];
  category: number[];
}
[];
interface CategoryType {
  id: number;
  title: string;
  category_title: string;
  category: string;
}
export const Atribute = () => {
  const [page, setPage] = React.useState<number>(1);
  const [id, setId] = React.useState<null | number>(null);
  const { data, isPending } = useGetAtribute(page);
  const { mutate, isPending: isDeletePending } = useDeleteAtribute(id);
  const navigate = useNavigate();
  const deleteAtribute = (id: number) => {
    setId(id);
    mutate(undefined, {
      onSuccess: () => {
        message.success("Deleted atribute");
        client.invalidateQueries({ queryKey: ["get-atribute"] });
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };
  let n = 1;
  const columns: TableProps<CategoryType>["columns"] = [
    {
      title: "O/N",
      dataIndex: "num",
      key: "num",
    },
    {
      title: "Sub category",
      dataIndex: "category_title",
      key: "category_title",
    },
    {
      title: "Atribute",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Changes",
      dataIndex: "buttons",
      key: "buttons",
      render: (_, allData) => (
        <Space size="middle" key={nanoid()}>
          <Button
            onClick={() => deleteAtribute(allData.id)}
            key={nanoid()}
            type="primary"
          >
            Delete
          </Button>
          <Button
            onClick={() => navigate(`/app/edit-atribute/${allData.id}`)}
            key={nanoid()}
            type="default"
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];
  const userData = data?.data.results?.map((item: AtributType) => ({
    title: item.title,
    id: item.id,
    category_title: item?.category_title[0]?.title,
    category: item.category[0],
    num: n++,
  }));

  return (
    <>
      {isDeletePending && <Spin fullscreen size="large" />}

      <div>
        <Button
          onClick={() => navigate("/app/create-atribute")}
          style={{ marginBottom: "35px" }}
          type="primary"
          size="large"
        >
          Create Atribute
        </Button>
        <Table
          style={{ marginBottom: "30px" }}
          loading={isPending}
          pagination={false}
          key={nanoid()}
          columns={columns}
          dataSource={userData}
        />
        <div style={{ textAlign: "end" }}>
          <Pagination
            onChange={(page) => setPage((page + 1) * 5)}
            total={data?.data.count}
            pageSize={5}
          />
        </div>
      </div>
    </>
  );
};
