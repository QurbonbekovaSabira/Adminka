import { useGetCategory } from "../../service/query/useGetCategory";
import { Table, Space, Button, message, Image, Input } from "antd";
import type { TableProps } from "antd";
import { useDeleteCategory } from "../../service/mutation/useDeleteCategory";
import { DataType } from "./type";
import { nanoid } from "@reduxjs/toolkit";
import React, { BaseSyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { SkeletonTable } from "../../components/skeleton-table";
import { client } from "../../config/query-client";
import { SearchOutlined } from "@ant-design/icons";
import useDebounce from "../../hook/useDebounce";
import { useCategorySearch } from "./service/query/useCategorySearch";
import { SearchDataType } from "./type";

interface Props {
  count: number;
  next: null | string;
  previous: null | string;
  results: {
    id: number;
    title: string;
    image: string;
    children: { id: string; title: string; image: string }[];
  }[];
}

export const Category = () => {
  const [input, setInput] = React.useState<string>("");
  let newInput = useDebounce(input);
  const { mutate: searchMutate, isPending } = useCategorySearch();
  const [search, setSearch] = React.useState([] as SearchDataType[]);

  const changeInput = (value: BaseSyntheticEvent) => {
    if (value.target.value?.length > 2) {
      setInput(value.target.value);
      searchMutate(newInput, {
        onSuccess: (res: Props) => {
          setSearch(res.results);
        },
      });
    }
    if (value.target.value?.length <= 2) {
      setInput("");
    }
  };

  const [id, setId] = React.useState<DataType>({
    id: 0,
    title: "lorem",
    image: "lorem",
  });

  const navigate = useNavigate();
  const { mutate } = useDeleteCategory(id);
  const { data: userData, isLoading } = useGetCategory();

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
  const data = userData?.results?.map((item: DataType) => ({
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
            placeholder="large size"
          />
          {input?.length > 2 && !isPending && (
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
              {search?.map((i, index) => {
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
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
