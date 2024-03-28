import { Select, Form, Button, Input, Upload, Image } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { SubmitData } from "../type";

interface PropsType {
  defaultValue: string;
  items: {
    value: number;
    label: string;
    key: string;
  }[];
  onChangeSelect: (value: string) => void;
  onChangeImage: UploadProps["onChange"];
  onFinish: (subcategory: SubmitData) => void;
  loading: boolean;
  fileList: UploadFile[];
  initialValue?: {
    title: string;
    image: string;
  };
}

export const SubCategoryFrom: React.FC<PropsType> = ({
  defaultValue,
  fileList,
  items,
  loading,
  onChangeImage,
  onChangeSelect,
  onFinish,
  initialValue,
}) => {
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ marginBottom: "10px" }}>Category</h4>
        <Select
          defaultValue={defaultValue}
          style={{ width: 200 }}
          onChange={onChangeSelect}
          options={items}
        />
      </div>
      <Form
        name="basic"
        layout="vertical"
        style={{ maxWidth: 600 }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Form.Item
          label="Sub category name"
          name="title"
          initialValue={initialValue?.title}
          rules={[{ required: true, message: "Please input category name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Image" name="image">
          <Upload.Dragger
            beforeUpload={() => false}
            maxCount={1}
            multiple={false}
            listType="picture-card"
            fileList={fileList}
            onChange={onChangeImage}
          >
            {fileList.length >= 8 ? null : (
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            )}
          </Upload.Dragger>
        </Form.Item>

        <Form.Item>
          {initialValue && !fileList.length && (
            <div style={{ marginBottom: "20px", marginTop: "20px" }}>
              <Image src={initialValue?.image} />
            </div>
          )}
          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
