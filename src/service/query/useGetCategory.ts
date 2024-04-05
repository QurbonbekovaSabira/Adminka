import { useQuery } from "@tanstack/react-query";
import { requst } from "../../config/request";
import { CategoryType } from "../../type";
export const useGetCategory = (page: number = 1) => {
  return useQuery({
    queryKey: ["category", page],
    queryFn: () =>
      requst
        .get<CategoryType>("/category/", {
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
