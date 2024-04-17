import { useParams } from "react-router-dom";
import { useGetProductId } from "../service/query/useGetProductId";
import { Spin, UploadFile, UploadProps, message } from "antd";
import { useGetSubCategoryFull } from "../../../service/query/useGetSubCategoryFull";
import React from "react";
import { SubmitProduct } from "../type";
import { usePatchProduct } from "../service/mutation/usePatchProduct";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "../../../components/product-form";
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
      <ProductForm
        loading={subCategoryLoading || isPending}
        submit={submit}
        onChange={handleChangeInput}
        options={item}
        fileList={fileList}
        initialValue={{
          category: selectProduct,
          title: data?.title,
          price: data?.price,
          image: data?.image,
        }}
      />
    </div>
  );
};
