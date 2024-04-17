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
  Input,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { DataType } from "../category/type";
import React, { BaseSyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteProduct } from "./service/mutation/useDeleteProduct";
import { client } from "../../config/query-client";
import useDebounce from "../../hook/useDebounce";
import { useGetSearchProduct } from "./service/query/useGetSearchProduct";
export const Product = () => {
  const [page, setPage] = React.useState<number>(1);
  const { data, isLoading } = useGetProduct(page);
  const navigate = useNavigate();

  const [input, setInput] = React.useState<string | undefined>(undefined);
  let newInput = useDebounce(input);
  const { data: searchData } = useGetSearchProduct(newInput);

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
  const changeInput = (value: BaseSyntheticEvent) => {
    if (value.target.value.length >= 2) {
      setInput(value.target.value);
    }
    if (value.target.value.length < 2) {
      setInput(undefined);
    }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "30px",
          gap: "150px",
        }}
      >
        <Button
          onClick={() => navigate("/app/product-create")}
          type="primary"
          size="large"
        >
          Create Product
        </Button>
        <div style={{ position: "relative" }}>
          <Input
            placeholder="Product name"
            style={{ width: "650px" }}
            addonAfter={<SearchOutlined />}
            size="large"
            onChange={changeInput}
          />
          {input !== undefined && input?.length >= 2 && (
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
                height: "250px",
                overflowY: "scroll",
              }}
              className="boxScroll"
            >
              {searchData?.results.map((i, index) => {
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
                    onClick={() => navigate(`/app/product-edit/${i?.id}`)}
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
      </div>
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
        simple
      />
    </div>
  );
};
