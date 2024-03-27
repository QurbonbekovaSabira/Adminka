import { useQuery } from "@tanstack/react-query";
import { requst } from "../../config/request";

export const useGetCategoryId = (id: number) => {
  return useQuery({
    queryKey: ["category-id"],
    queryFn: () => {
      return requst.get(`/category/${id}/`).then((res) => res.data);
    },
  });
};
