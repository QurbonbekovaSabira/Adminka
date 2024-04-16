import { usePostBanners } from "../service/mutation/usePostBanners";
import { useNavigate } from "react-router-dom";
import { BannersForm } from "../../../components/banners-form";
import { BannerValue } from "../tye";
import { message } from "antd";
export const BannerCreate = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = usePostBanners();
  const submit = (value: BannerValue) => {
    console.log(value);
    const formData = new FormData();
    formData.append("title", value.title);
    formData.append("description", value.description);
    formData.append("image", value.image.file);

    mutate(formData, {
      onSuccess: () => {
        message.success("Create Banners!");
        navigate("/app/banners");
      },
      onError: (error) => {
        message.error(error.message);
        console.log(error);
      },
    });
  };
  return (
    <div>
      <div style={{ position: "relative", zIndex: "100" }}>
        <BannersForm submit={submit} isPending={isPending} />
      </div>
    </div>
  );
};
