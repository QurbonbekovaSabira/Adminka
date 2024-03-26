import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
import { CategoryType } from "../../type";
export const useGetCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: () =>
      requst.get<CategoryType>("/category/").then((res) => res.data),
  });
};
