import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { BannerTypeResponce } from "../../tye";

export const useGetBanners = (text: string = "id", page: number = 1) => {
  return useQuery({
    queryKey: ["get-banners", text, page],
    queryFn: () =>
      requst
        .get<BannerTypeResponce>(`/banner/?ordering=${text}`, {
          params: {
            offset: page,
            limit: 5,
          },
        })
        .then((res) => {
          return {
            data: res.data,
            pageSize: Math.ceil(res.data.count),
          };
        }),
  });
};
