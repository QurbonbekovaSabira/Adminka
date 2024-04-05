import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
interface Type {
  count: number;
  next: string;
  previous: null;
  results: {
    id: number;
    title: string;
    image: string;
    parent: {
      id: number;
      title: string;
    };
  }[];
}
export const useGetSubCategory = () => {
  return useQuery({
    queryKey: ["get-subcategory"],
    queryFn: () => {
      return requst.get<Type>("/api/subcategory/").then((res) => res.data);
    },
  });
};
