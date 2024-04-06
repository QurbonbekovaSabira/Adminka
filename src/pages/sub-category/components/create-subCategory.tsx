import React from "react";
import type { UploadFile, UploadProps } from "antd";
import { SubmitData } from "../../../type";
import { usePostCategory } from "../../category/service/mutation/usePostCategory";
import { SubCategoryFrom } from "../../../components/subCategory-from";
import { message } from "antd";
import { useGetCategoryFull } from "../service/query/useGetCategoryFull";
export const CreateSubCategory: React.FC<any> = (setActive) => {
  const { mutate, isPending } = usePostCategory();
  const { data } = useGetCategoryFull();
  const item: any = [];
  data?.results?.map((data) =>
    item.push({
      value: data.id,
      label: data.title,
      key: data.id,
    })
  );
  
  const [onChange, setOnChane] = React.useState<string>(item[0]?.key);
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const handleChangeInput: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);

  const handleChange = (value: string) => {
    setOnChane(value);
  };

  const submit = (subCategory: SubmitData) => {
    const formData = new FormData();
    formData.append("title", subCategory.title);
    formData.append("image", subCategory.image.file);
    formData.append("parent", String(onChange));
    mutate(formData, {
      onSuccess: (res) => {
        message.success("Created sub category");
        console.log(res.data.id);

        setActive.setActive({
          active: "2",
          title: subCategory.title,
          id: Number(res.data.id),
        });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  return (
    <div>
      <SubCategoryFrom
        onFinish={submit}
        defaultValue={item[0]?.label}
        items={item}
        onChangeSelect={handleChange}
        onChangeImage={handleChangeInput}
        loading={isPending}
        fileList={fileList}
      />
    </div>
  );
};
