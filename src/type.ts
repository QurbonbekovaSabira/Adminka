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

export interface CategoryIdType {
  id: number;
  title: string;
  image: string;
  attributes: {
    id: number;
    title: string;
    values: {
      id: number;
      value: string;
    }[];
  }[];
  children: null;
  parent: {
    id: number;
    title: string;
  };
}
[];

export interface ResponseType {
  count: number;
  next: null | string;
  previous: null | string;
  results: {
    id: number;
    title: string;
    image: string;
    children: { id: string; title: string; image: string }[];
  }[];
}
