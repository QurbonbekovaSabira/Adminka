import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { BannerIdType } from "../../tye";
export const useGetBannerId = (id: number | null) => {
  return useQuery({
    queryKey: ["banners-id", id],
    queryFn: () =>
      requst.get<BannerIdType>(`/banner/${id}/`).then((res) => res.data),
  });
};
