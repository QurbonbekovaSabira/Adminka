import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { ResponseType } from "../../../../type";
export const useGetProduct = (page: number) => {
  return useQuery({
    queryKey: ["get-product", page],
    queryFn: () => {
      return requst
        .get<ResponseType>("/product/", { params: { offset: page, limit: 5 } })
        .then((res) => {
          return {
            data: res.data,
            pageSize: Math.ceil(res.data.count),
          };
        });
    },
  });
};
