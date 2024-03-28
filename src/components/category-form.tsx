import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Upload,
  UploadFile,
  Image,
  UploadProps,
} from "antd";
import { SubmitData } from "../type";

interface PropsType {
  onFinish: (value: SubmitData) => void;
  loading?: boolean;
  fileList: UploadFile[];
  onChange: UploadProps["onChange"];
  name?: string;
  initialValue?: {
    title: string;
    image: string;
  };
}
export const CategoryForm: React.FC<PropsType> = ({
  onFinish,
  loading,
  fileList,
  onChange,
  initialValue,
  name,
}) => {
  return (
    <Form
      name="basic"
      layout="vertical"
      style={{ maxWidth: 600 }}
      initialValues={{}}
      onFinish={onFinish}
    >
      <Form.Item
        label={name ? name : "Category"}
        name="title"
        initialValue={initialValue?.title}
        rules={[{ required: true, message: "Please input category name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Image" name="image">
        <Upload.Dragger
          onChange={onChange}
          beforeUpload={() => false}
          maxCount={1}
          multiple={false}
          listType="picture-card"
        >
          <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload.Dragger>
      </Form.Item>
      <Form.Item>
        {initialValue && !fileList.length && (
          <div style={{ marginBottom: "20px" }}>
            <Image
              style={{ width: "80px", height: "80px" }}
              src={initialValue.image}
            />
          </div>
        )}
        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
