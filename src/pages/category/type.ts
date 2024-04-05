export interface DataType {
  id: number;
  title: string;
  image: string;
}

export interface ActiveType {
  active: string;
  title: string;
  id: null | number;
}

export interface SearchDataType {
  id: number;
  title: string;
  image: string;
  children?: {
    id: string;
    title: string;
    image: string;
  }[];
}[]
;
