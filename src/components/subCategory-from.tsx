import { Select, Form, Button, Input, Upload, Image } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
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

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
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
            onPreview={handlePreview}
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
