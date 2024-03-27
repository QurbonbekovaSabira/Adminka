import { Form, Input, Button, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import React from "react";
import { usePostCategory } from "../service/mutation/usePostCategory";
import { SubmitData } from "../../../type";

interface Type {
  setActive: React.Dispatch<
    React.SetStateAction<{
      active: number;
      title: string;
      id: number | null;
    }>
  >;
}

export const CreateCategoryComp: React.FC<Type> = (setActive) => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const { mutate, isPending } = usePostCategory();
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const submit = (value: SubmitData) => {
    console.log(value);

    const formData = new FormData();

    formData.append("title", value.title);
    formData.append("image", value.image.file);
    formData.append("parent", "");
    mutate(formData, {
      onSuccess: (res) => {
        console.log(res);
        setActive.setActive({
          active: 2,
          title: value.title,
          id: res?.data?.id,
        });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      style={{ maxWidth: 600 }}
      initialValues={{}}
      onFinish={submit}
    >
      <Form.Item
        label="Category"
        name="title"
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
          onChange={handleChange}
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
        <Button loading={isPending} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
