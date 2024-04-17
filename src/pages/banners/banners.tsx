import {
  Button,
  Select,
  TableProps,
  Image,
  Space,
  Table,
  message,
  Pagination,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useGetBanners } from "./service/query/useGetBanners";
import React from "react";
import { DataType } from "../category/type";
import { nanoid } from "@reduxjs/toolkit";
import { useDeleteBanners } from "./service/mutation/useDeleteBanners";
import { client } from "../../config/query-client";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
export const Banners = () => {
  const navigate = useNavigate();
  const [id, setId] = React.useState<null | number>(null);
  const { mutate, isPending } = useDeleteBanners(id);
  const chnageSelect = (text: string) => {
    setType(text);
  };
  const [type, setType] = React.useState<string>("id");
  const [page, setPage] = React.useState<number>(1);
  const { data, isLoading } = useGetBanners(type, page);
  const deleteBanners = (id: number) => {
    setId(id);
    mutate(undefined, {
      onSuccess: () => {
        message.success("Banner deleted");
        client.invalidateQueries({ queryKey: ["get-banners"] });
      },
      onError: (error) => {
        message.error(error.message);
        console.log(error);
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
      title: "Banners",
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
          <Button onClick={() => deleteBanners(allData.id)} type="primary">
            Delete
          </Button>
          <Button
            onClick={() => navigate(`/app/edit-banners/${allData.id}`)}
            type="default"
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];
  let n = 1;
  const userData = data?.data?.results?.map((item: DataType) => ({
    title: item.title,
    image: item.image,
    id: item.id,
    num: n++,
  }));
  const options = [
    {
      label: (
        <p>
          ID <ArrowUpOutlined />
        </p>
      ),
      value: "id",
    },
    {
      label: (
        <p>
          ID <ArrowDownOutlined />
        </p>
      ),
      value: "-id",
    },
    {
      label: (
        <p>
          Created at <ArrowUpOutlined />
        </p>
      ),
      value: "created_at",
    },
    {
      label: (
        <p>
          Created at <ArrowDownOutlined />
        </p>
      ),
      value: "-created_at",
    },
    {
      label: (
        <p>
          Updated at <ArrowUpOutlined />
        </p>
      ),
      value: "updated_at",
    },
    {
      label: (
        <p>
          Updated at <ArrowDownOutlined />
        </p>
      ),
      value: "-updated_at",
    },
    {
      label: (
        <p>
          Title <ArrowUpOutlined />
        </p>
      ),
      value: "title",
    },

    {
      label: (
        <p>
          Title <ArrowDownOutlined />
        </p>
      ),
      value: "-title",
    },
    {
      label: (
        <p>
          Description <ArrowUpOutlined />
        </p>
      ),
      value: "description",
    },

    {
      label: (
        <p>
          Description <ArrowDownOutlined />
        </p>
      ),
      value: "-description",
    },
  ];
  const pageChange = (value: number) => {
    setPage(value);
  };
  return (
    <div>
      <div
        style={{
          marginBottom: "25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={() => navigate("/app/create-banners")}
          size="large"
          type="primary"
        >
          Banners
        </Button>
        <Select
          size="large"
          style={{ width: "200px" }}
          defaultValue={type}
          key={nanoid()}
          options={options}
          onChange={chnageSelect}
        />
      </div>
      <Table
        style={{ marginBottom: "30px" }}
        loading={isLoading || isPending}
        pagination={false}
        columns={columns}
        dataSource={userData}
      />
      <Pagination
        style={{ textAlign: "end" }}
        defaultPageSize={1}
        total={data?.pageSize}
        pageSize={5}
        simple
        onChange={pageChange}
      />
    </div>
  );
};
