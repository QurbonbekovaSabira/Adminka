import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { ResponseType } from "../../../../type";

export const useGetSubCategory = (page: number = 1) => {
  return useQuery({
    queryKey: ["get-subcategory"],
    queryFn: () => {
      return requst
        .get<ResponseType>("/api/subcategory/", {
          params: { offset: page, limit: 5 },
        })
        .then((res) => {
          return {
            data: res.data,
            pageSize: Math.ceil(res.data.count),
          };
        });
    },
  });
};
