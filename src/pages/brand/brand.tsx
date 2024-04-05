import {
  Table,
  Space,
  Button,
  message,
  Image,
  Select,
  Input,
  Pagination,
} from "antd";
import type { TableProps } from "antd";
import { nanoid } from "@reduxjs/toolkit";
import { DataType } from "../category/type";
import { useDeleteBrand } from "./service/mutation/useDeleteBrand";
import React, { BaseSyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useFilterBrand } from "./service/query/useFilterBrand";
import {
  SearchOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { useGetSearchBrand } from "./service/query/useGetSearchBrand";
import useDebounce from "../../hook/useDebounce";
interface Type {
  title: string;
  id: number;
  image: string;
}
export const Brand = () => {
  const navigate = useNavigate();
  const [deleteId, setId] = React.useState<number | undefined>(undefined);
  const { mutate, isPending } = useDeleteBrand(deleteId);
  const [type, setType] = React.useState<string>("id");
  const [text, setText] = React.useState<string | undefined>(undefined);
  const inputText = useDebounce(text);
  const { data: searchData } = useGetSearchBrand(inputText);

  const search = (value: BaseSyntheticEvent) => {
    if (value.target.value.length >= 2) {
      setText(value.target.value);
    }
    if (value.target.value.length < 2) {
      setText(undefined);
    }
  };
  const chnageSelect = (text: string) => {
    setType(text);
  };
  const [page, setPage] = React.useState<number>(1);
  const { data, isLoading } = useFilterBrand(type, page);
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
  ];

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
  let n = 1;
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "O/N",
      dataIndex: "num",
      key: "num",
    },
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
            onClick={() => navigate(`/app/edit-brand/${allData.id}`)}
            type="default"
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];
  const userData = data?.data?.results?.map((item: DataType) => ({
    title: item.title,
    image: item.image,
    id: item.id,
    num: n++,
  }));

  return (
    <div>
      <div
        style={{
          marginBottom: "30px",
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => navigate("/app/create-brand")}
          type="primary"
          size="large"
        >
          Create Brand
        </Button>
        <div style={{ position: "relative" }}>
          <Input
            style={{ width: "650px" }}
            size="large"
            addonAfter={<SearchOutlined />}
            placeholder="Brand name"
            onChange={search}
          />
          {text !== undefined && text?.length >= 2 && (
            <div
              style={{
                zIndex: "100",
                position: "absolute",
                top: "50px",
                width: "100%",
                background: "#fff",
                display: "flex",
                gap: "15px",
                flexDirection: "column",
                paddingTop: "15px",
                paddingBottom: "15px",
                boxShadow: " 8px 8px 24px 0px rgba(66, 68, 90, 1)",
                height: "500px",
                overflowY: "scroll",
              }}
              className="boxScroll"
            >
              {searchData?.results?.map((i: Type, index: number) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      gap: "30px",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      padding: "10px",
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                    className="box"
                    key={index}
                    onClick={() => navigate(`/app/edit-brand/${i.id}`)}
                  >
                    <h4>{i.title}</h4>
                    <img
                      style={{
                        width: "40px",
                        border: "1px solid #00000045",
                        padding: "4px",
                      }}
                      src={i.image}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <Space wrap>
          <Select
            size="large"
            style={{ width: "200px" }}
            defaultValue={type}
            key={nanoid()}
            options={options}
            onChange={chnageSelect}
          />
        </Space>
      </div>
      <Table
        style={{ marginBottom: "30px" }}
        pagination={false}
        loading={isLoading}
        columns={columns}
        dataSource={userData}
      />
      <div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Pagination
            onChange={(value) => setPage((value - 1) * 5)}
            defaultPageSize={1}
            pageSize={5}
            total={data?.pageSize}
          />
        </div>
      </div>
    </div>
  );
};
