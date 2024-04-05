import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { ResponseType } from "../../../../type";

export const useFilterBrand = (type: string = "id") => {
  return useQuery({
    queryKey: ["filter-brand", type],
    queryFn: () => {
      return requst.get<ResponseType>(`/brand/?ordering=${type}`).then((res)=>res.data);
    },
  });
};
