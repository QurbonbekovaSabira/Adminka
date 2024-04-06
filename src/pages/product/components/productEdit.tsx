import { useParams } from "react-router-dom";
import { useGetProductId } from "../service/query/useGetProductId";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Spin,
  Switch,
  Upload,
  UploadFile,
  UploadProps,
  Image,
} from "antd";
import { useGetSubCategoryFull } from "../../../service/query/useGetSubCategoryFull";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
interface Type {
  id: number;
  title: string;
  image: string;
  children: {
    id: string;
    title: string;
    image: string;
  }[];
}
[];

export const ProductEdit = () => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const { id } = useParams();
  const { data, isLoading } = useGetProductId(Number(id));
  console.log(data);

  const { data: subCategoryData, isLoading: subCategoryLoading } =
    useGetSubCategoryFull();
  let item: any = [];
  const handleChangeInput: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);
  subCategoryData?.results.map((product) =>
    item.push({
      value: product.id,
      label: product.title,
      key: product.id,
    })
  );

  const submit = (value: string) => {
    console.log(value);
  };
  return (
    <div>
      {(isLoading || subCategoryLoading) && <Spin fullscreen />}
      <Form
        initialValues={data}
        onFinish={submit}
        layout="vertical"
        style={{ maxWidth: 600 }}
      >
        <p style={{ marginBottom: "10px" }}></p>
        <Form.Item
          label="Category"
          name={"category"}
          style={{ marginBottom: "20px" }}
          rules={[{ required: true }]}
        >
          <Select options={item} />
        </Form.Item>
        <Space>
          <Form.Item label="Is New" name={"is_new"}>
            <Switch />
          </Form.Item>

          <Form.Item name={"is_available"} label="Is Available">
            <Switch />
          </Form.Item>
        </Space>
        <Form.Item
          name="title"
          rules={[{ required: true }]}
          label="Product name"
        >
          <Input />
        </Form.Item>
        <Form.Item name={"price"} rules={[{ required: true }]} label="Price">
          <InputNumber
            style={{ width: "100%" }}
            controls={false}
            formatter={(value) =>
              ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value?.replace(/\$\s?|(,*)/g, "") as unknown as number
            }
          />
        </Form.Item>
        <Form.Item label="Image" name="image">
          <Upload.Dragger
            beforeUpload={() => false}
            maxCount={1}
            multiple={false}
            listType="picture-card"
            fileList={fileList}
            onChange={handleChangeInput}
          >
            {fileList.length >= 8 ? null : (
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            )}
          </Upload.Dragger>
        </Form.Item>
        {!fileList.length && (
          <div style={{ width: "100px", marginBottom: "25px" }}>
            <Image src={data?.image} />
          </div>
        )}
        <Button type="primary" size="large" htmlType="submit">
          Send
        </Button>
      </Form>
    </div>
  );
};
