import { useParams } from "react-router-dom";
import { useGetBannerId } from "../service/query/useGetBannerId";
import { BannersForm } from "../../../components/banners-form";
import { BannerValue } from "../tye";
import { usePatchBannners } from "../service/mutation/usePatchBannners";
import { Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
export const BannersEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { mutate, isPending } = usePatchBannners(Number(id));
  const submit = (value: BannerValue) => {
    const formData = new FormData();
    console.log(value.image);

    formData.append("title", value.title);
    formData.append("image", value.image?.file);
    formData.append("description", value.description);
    mutate(formData, {
      onSuccess: () => {
        message.success("Successfull");
        navigate("/app/banners");
      },
      onError: (error) => {
        message.error(error.message);
        console.log(error);
      },
    });
  };
  const { data, isLoading } = useGetBannerId(Number(id));
  if (isLoading) {
    return <Spin fullscreen />;
  }

  return (
    <div>
      <BannersForm
        initialValues={{
          title: data?.title,
          image: data?.image,
          description: data?.description,
        }}
        submit={submit}
        isPending={isPending}
      />
    </div>
  );
};
