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
