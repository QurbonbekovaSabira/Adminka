import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { BannerTypeResponce } from "../../tye";

export const useGetBanners = (text: string = "id") => {
  return useQuery({
    queryKey: ["get-banners", text],
    queryFn: () =>
      requst
        .get<BannerTypeResponce>(`/banner/?ordering=${text}`)
        .then((res) => res.data),
  });
};
