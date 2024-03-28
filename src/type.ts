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
      active: number;
      title: string;
      id: number | null;
    }>
  >;
}