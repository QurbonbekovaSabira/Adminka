import { useParams } from "react-router-dom";
import { useGetProductId } from "../service/query/useGetProductId";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Spin,
  Switch,
  Upload,
  UploadFile,
  UploadProps,
  Image,
  message,
} from "antd";
import { useGetSubCategoryFull } from "../../../service/query/useGetSubCategoryFull";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { SubmitProduct } from "../type";
import { usePatchProduct } from "../service/mutation/usePatchProduct";
import { useNavigate } from "react-router-dom";

export const ProductEdit = () => {
  const { id } = useParams();
  const [patchId, setId] = React.useState<number | undefined>(1);
  const navigate = useNavigate();
  const { mutate, isPending } = usePatchProduct(patchId);
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const { data, isLoading } = useGetProductId(Number(id));

  const { data: subCategoryData, isLoading: subCategoryLoading } =
    useGetSubCategoryFull();
  let item: any = [];
  const handleChangeInput: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);
  subCategoryData?.results.map((product) =>
    item.push({
      value: product.id,
      label: product.title,
      key: product.id,
    })
  );

  const submit = (value: SubmitProduct) => {
    setId(Number(id));
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
        message.success("Successfull");
        navigate("/app/product");
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };
  const selectProduct: any = subCategoryData?.results.filter(
    (item) => item.id === data?.category
  );

  if (isLoading) {
    return <Spin fullscreen />;
  }
  return (
    <div>
      {subCategoryLoading && <Spin fullscreen />}
      <Form onFinish={submit} layout="vertical" style={{ maxWidth: 600 }}>
        <p style={{ marginBottom: "10px" }}></p>
        <Form.Item
          label="Category"
          name={"category"}
          style={{ marginBottom: "20px" }}
          rules={[{ required: true }]}
        >
          <Select
            options={item}
            defaultValue={selectProduct && selectProduct[0]?.title}
          />
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
          initialValue={data?.title}
          name="title"
          rules={[{ required: true }]}
          label="Product name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={data?.price}
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
        {!fileList.length && (
          <div style={{ width: "100px", marginBottom: "25px" }}>
            <Image src={data?.image} />
          </div>
        )}
        <Button
          loading={isPending}
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
