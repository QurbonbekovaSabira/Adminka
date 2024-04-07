import {
  Input,
  Form,
  Button,
  Switch,
  Select,
  Space,
  InputNumber,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useGetSubCategoryFull } from "../../../service/query/useGetSubCategoryFull";
import React from "react";
import { usePostProduct } from "../service/mutation/usePostProduct";
import { useNavigate } from "react-router-dom";
import { SubmitProduct } from "../type";

export const ProductCreate = () => {
  const { data } = useGetSubCategoryFull();
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const navigate = useNavigate();
  const { mutate } = usePostProduct();
  const item: any = [];
  data?.results.map((subCategory) =>
    item.push({
      value: subCategory.id,
      label: subCategory.title,
      key: subCategory.id,
    })
  );
  const handleChangeInput: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);

  const submit = (value: SubmitProduct) => {
    console.log(value);
    const formData = new FormData();
    formData.append("title", value.title);
    formData.append("image", value.image.file);
    if (value.isNew === undefined) {
      formData.append("is_new", "false");
    } else {
      formData.append("is_new", String(value.isNew));
    }
    if (value.is_available === undefined) {
      formData.append("is_available", "false");
    } else {
      formData.append("is_available", String(value.is_available));
    }
    formData.append("category", String(value.category));
    formData.append("price", value.price.toString());
   
    mutate(formData, {
      onSuccess: () => {
        message.success("Product created");
        navigate("/app/product");
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };
  return (
    <div>
      <Form onFinish={submit} layout="vertical" style={{ maxWidth: 600 }}>
        <Form.Item
          label="Category"
          name={"category"}
          style={{ marginBottom: "20px" }}
          rules={[{ required: true }]}
        >
          <Select options={item} defaultValue={item[1]?.label} />
        </Form.Item>
        <Space>
          <Form.Item label="Is New" name={"isNew"}>
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

        <Button type="primary" size="large" htmlType="submit">
          Send
        </Button>
      </Form>
    </div>
  );
};
