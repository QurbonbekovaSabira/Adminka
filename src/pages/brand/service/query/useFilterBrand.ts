import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { ResponseType } from "../../../../type";

export const useFilterBrand = (type: string = "id", page: number = 1) => {
  return useQuery({
    queryKey: ["filter-brand", type, page],
    queryFn: () => {
      return requst
        .get<ResponseType>(`/brand/?ordering=${type}`, {
          params: { offset: page, limit: 5 },
        })
        .then((res) => {
          return { data: res.data, pageSize: Math.ceil(res.data.count) };
        });
    },
  });
};
