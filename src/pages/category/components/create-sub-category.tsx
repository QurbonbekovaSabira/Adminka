import React from "react";
import { Form, Input, Button, Upload, message } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { usePostSubCategory } from "../service/mutation/usePostSubCategory";
import { SubmitData } from "../../../type";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useGetCategoryId } from "../../../service/query/useGetCategoryId";
import { ActiveType } from "../type";
export const CreateSubCategory: React.FC<ActiveType> = ({
  active,
  title,
  id,
}) => {
  console.log(title, active, id);
  const { data } = useGetCategoryId(Number(id));
  const navigate = useNavigate();
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  console.log(data);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const { mutate, isPending } = usePostSubCategory();
  const submit = (value: SubmitData) => {
    console.log(value);
    const formData = new FormData();
    formData.append("title", value.title);
    formData.append("image", value.image.file);
    formData.append("parent", String(id));

    mutate(formData, {
      onSuccess: (res) => {
        message.success("Subcategory created");
        console.log(res);
        navigate("/app");
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };
  return (
    <Form
      layout="vertical"
      onFinish={submit}
      name="subCategory"
      style={{ maxWidth: "600px" }}
    >
      <Form.Item
        label="Sub category"
        name={"title"}
        rules={[
          { required: true, message: "Please input sub category username!" },
        ]}
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
      <Button loading={isPending} htmlType="submit" type="primary">
        Send
      </Button>
    </Form>
  );
};
