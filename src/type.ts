export interface SubmitData {
  title: string;
  image: {
    file: File;
  };
}

export interface CategoryType {
  count: number;
  next: null | string;
  results: {
    id: number;
    title: string;
    image: string;
    children: { id: string; title: string; image: string }[];
  }[];
}
export interface Type {
  setActive: React.Dispatch<
    React.SetStateAction<{
      active: string;
      title: string;
      id: number | null;
    }>
  >;
}

export interface AtributType {
  attributes: {
    attribut_id: null | number;
    title: string;
    values: {
      value_id: null | number;
      value: string;
    }[];
  };
  category_id: number;
}
