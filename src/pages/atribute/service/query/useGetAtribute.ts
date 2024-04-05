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

export const useGetAtribute = () => {
  return useQuery({
    queryKey: ["get-atribute"],
    queryFn: () => {
      return requst.get<GetType>("/attribute/").then((res) => res.data);
    },
  });
};
