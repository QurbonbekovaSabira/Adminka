import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Switch,
  Upload,
  UploadFile,
  UploadProps,
  Image,
  GetProp,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SubmitProduct } from "../pages/product/type";
import React from "react";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
interface PropsType {
  submit: (value: SubmitProduct) => void;
  loading?: boolean;
  fileList: UploadFile[];
  onChange: UploadProps["onChange"];
  initialValue?: {
    category?: string;
    title: string | undefined;
    image: string | undefined;
    price?: string;
  };
  options: { value: number; label: string; key: number }[];
}

export const ProductForm: React.FC<PropsType> = ({
  submit,
  onChange,
  initialValue,
  fileList,
  loading,
  options,
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
    <>
      <Form onFinish={submit} layout="vertical" style={{ maxWidth: 600 }}>
        <p style={{ marginBottom: "10px" }}></p>
        <Form.Item
          label="Category"
          name={"category"}
          style={{ marginBottom: "20px" }}
          rules={[{ required: true }]}
        >
          <Select options={options} defaultValue={options[0]?.label} />
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
          initialValue={initialValue?.title}
          name="title"
          rules={[{ required: true }]}
          label="Product name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={initialValue?.price}
          name={"price"}
          rules={[{ required: true }]}
          label="Price"
        >
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
            onChange={onChange}
            onPreview={handlePreview}
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
            <Image src={initialValue?.image} />
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
        <Button loading={loading} type="primary" size="large" htmlType="submit">
          Send
        </Button>
      </Form>
    </>
  );
};
