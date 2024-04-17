import { useGetCategory } from "../../service/query/useGetCategory";
import { Table, Space, Button, message, Image, Input, Pagination } from "antd";
import type { TableProps } from "antd";
import { useDeleteCategory } from "../../service/mutation/useDeleteCategory";
import { DataType } from "./type";
import { nanoid } from "@reduxjs/toolkit";
import React, { BaseSyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../config/query-client";
import { SearchOutlined } from "@ant-design/icons";
import useDebounce from "../../hook/useDebounce";
import { useGetSearchCategory } from "./service/query/useGetSearchCategory";
interface DataTypeS {
  id: number;
  title: string;
  image: string;
  num: number;
}

export const Category = () => {
  const [input, setInput] = React.useState<string | undefined>(undefined);
  let newInput = useDebounce(input);
  const { data: searchData, isPending: searchPending } =
    useGetSearchCategory(newInput);
  const changeInput = (value: BaseSyntheticEvent) => {
    if (value.target.value?.length > 2) {
      setInput(value.target.value);
    }
    if (value.target.value?.length <= 2) {
      setInput(undefined);
    }
  };

  const [id, setId] = React.useState<DataType>({
    id: 0,
    title: "lorem",
    image: "lorem",
  });

  const navigate = useNavigate();
  const { mutate } = useDeleteCategory(id);
  const [page, setPage] = React.useState<number>(1);
  const { data: userData, isLoading } = useGetCategory(page);

  let n = 1;
  const deleteCategory = (newData: DataType) => {
    setId(newData);
    mutate(undefined, {
      onSuccess: (res) => {
        console.log(res);
        client.invalidateQueries({ queryKey: ["category"] });
        message.success("Delete category");
      },
      onError: (error) => {
        console.log(error);
        message.error(error.message);
      },
    });
  };
  const columns: TableProps<DataTypeS>["columns"] = [
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

  const data = userData?.data.results?.map((item) => ({
    title: item.title,
    image: item.image,
    id: Number(item.id),
    num: n++,
  }));
  return (
    <div>
      <div
        style={{
          marginBottom: "40px",
          display: "flex",
          alignItems: "center",
          gap: "150px",
        }}
      >
        <Button
          size="large"
          onClick={() => navigate("/app/create-category")}
          type="primary"
        >
          Create Category
        </Button>
        <div style={{ position: "relative" }}>
          <Input
            onChange={changeInput}
            style={{ width: "650px" }}
            size="large"
            addonAfter={<SearchOutlined />}
            placeholder="Category name"
          />
          {input != undefined && input?.length > 2 && !searchPending && (
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
              {searchData?.results?.map((i, index) => {
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
                    onClick={() => navigate(`edit-category/${i.id}`)}
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
        loading={isLoading}
        pagination={false}
        columns={columns}
        dataSource={data}
      />
      <div style={{ textAlign: "end" }}>
        <Pagination
          defaultPageSize={1}
          total={userData?.pageSize}
          pageSize={5}
          simple
          onChange={(page) => setPage((page + 1) * 5)}
        />
      </div>
    </div>
  );
};
