// import React from 'react'
import { useParams } from "react-router-dom";
import { useGetCategoryId } from "../../service/query/useGetCategoryId";
export const EditCategory = () => {
  const { id } = useParams();
  const { data } = useGetCategoryId(Number(id));
  console.log(id, data);

  return <div>EditCategory</div>;
};
