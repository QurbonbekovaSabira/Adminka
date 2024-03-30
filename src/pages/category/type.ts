export interface DataType {
  id: number;
  title: string;
  image: string;
}

export interface ActiveType {
  active: { active: number; title: string; id: null | number };
}
