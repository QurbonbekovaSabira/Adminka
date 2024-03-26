export interface CategoryType {
  count: number;
  next: null | string;
  results: {
    id: string;
    title: string;
    image: string;
    children: { id: string; title: string; image: string }[];
  }[];
}

export interface DataType {
  id: number;
  title: string;
  image: string;
}
