import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

export const useGetBrandId = (id: number) => {
  return useQuery({
    queryKey: ["brand"],
    queryFn: () => {
      return requst.get(`/brand/${id}/`).then((res) => res.data);
    },
  });
};
