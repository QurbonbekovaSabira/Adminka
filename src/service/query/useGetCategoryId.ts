import { useQuery } from "@tanstack/react-query";
import { requst } from "../../config/request";
import { CategoryIdType } from "../../type";

export const useGetCategoryId = (id: number) => {
  return useQuery({
    queryKey: ["category-id", id],
    queryFn: () => {
      return requst
        .get<CategoryIdType>(`/category/${id}/`)
        .then((res) => res.data);
    },
  });
};
