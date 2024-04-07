import { useQuery } from "@tanstack/react-query";
import { requst } from "../../../../config/request";
interface GetType {
  count: number;
  previous: null | number;
  results: {
    id: number;
    title: string;
    category: number[];
    category_title: {
      title: string;
    }[];
  }[];
}
export const useGetAtributeFull = () => {
  return useQuery({
    queryKey: ["get-attribute-full"],
    queryFn: () => requst.get<GetType>("/attribute/").then((res) => res.data),
  });
};
