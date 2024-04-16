import { Button, Form, Input, Upload } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { PlusOutlined } from "@ant-design/icons";
interface Type {
  title: string;
  description: string;
  image: {
    file: File;
  };
}
interface Props {
  submit: (value: Type) => void;
  isPending?: boolean;
  initialValues?: {
    title?: string | undefined;
    image?: string | undefined;
    description?: string | undefined | null;
  };
}

export const BannersForm = ({ initialValues, submit, isPending }: Props) => {
  return (
    <div>
      <Form
        onFinish={submit}
        layout="vertical"
        style={{ width: "600px", marginLeft: "115px" }}
      >
        <Form.Item
          initialValue={initialValues?.title}
          required={true}
          label="Title"
          name={"title"}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Image" name="image">
          <Upload.Dragger
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
        <Form.Item
          initialValue={
            initialValues?.description !== "undefined"
              ? initialValues?.description
              : ""
          }
          required={true}
          label="Description"
          name={"description"}
        >
          <ReactQuill
            style={{
              display: "block",
              height: "150px",
            }}
            theme="snow"
          />
        </Form.Item>
        <Button
          loading={isPending}
          style={{ marginTop: "35px" }}
          type="primary"
          size="large"
          htmlType="submit"
        >
          Send
        </Button>
      </Form>
    </div>
  );
};
