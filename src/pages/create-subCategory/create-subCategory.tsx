import { useGetCategory } from "../../service/query/useGetCategory";
import React from "react";
import { Select, Form, Button, Input, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SubmitData } from "../../type";
import { usePostCategory } from "../create-category/service/mutation/usePostCategory";
export const CreateSubCategory: React.FC = () => {
  const { mutate, isPending } = usePostCategory();
  const { data } = useGetCategory();
  const newData = data?.results.filter((item) => item.children.length === 0);
  const item: any = [];
  newData?.map((data) =>
    item.push({
      value: data.id,
      label: data.title,
      key: data.id,
    })
  );

  const [onChange, setOnChane] = React.useState<string>(item[0].label);
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const handleChangeInput: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);
  const handleChange = (value: string) => {
    setOnChane(value);
  };

  const submit = (subCategory: SubmitData) => {
    console.log(subCategory);
    const formData = new FormData();
    formData.append("title", subCategory.title);
    formData.append("image", subCategory.image.file);
    formData.append("parent", String(onChange));
    mutate(formData, {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Select
          defaultValue={item[1]}
          style={{ width: 200 }}
          onChange={handleChange}
          options={item}
        />
      </div>
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
        <Form.Item>
          <Button loading={isPending} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
