import { useQuery } from "@tanstack/react-query";
import { requst } from "../../config/request";
import { ResponseType } from "../../type";
export const useGetSubCategoryFull = () => {
  return useQuery({
    queryKey: ["get-subcategory"],
    queryFn: () =>
      requst.get<ResponseType>("/api/subcategory/").then((res) => res.data),
  });
};
