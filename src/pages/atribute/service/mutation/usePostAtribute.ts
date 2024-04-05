import { useMutation } from "@tanstack/react-query";
import { requst } from "../../../../config/request";

interface Props {
  attr_list: {
    title: string;
    values: string[];
    category: number[];
  }[];
}

export const usePostAtribute = () => {
  return useMutation({
    mutationFn: (data: Props) => {
      return requst.post("/attribute/", data).then((res) => res.data);
    },
  });
};
