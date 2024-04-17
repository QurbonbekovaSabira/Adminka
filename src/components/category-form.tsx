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
  GetProp,
} from "antd";
import { SubmitData } from "../type";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
interface PropsType {
  onFinish: (value: SubmitData) => void;
  loading?: boolean;
  fileList: UploadFile[];
  onChange: UploadProps["onChange"];
  name?: string;
  initialValue?: {
    title: string | undefined;
    image: string | undefined;
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
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
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
          onPreview={handlePreview}
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
        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
