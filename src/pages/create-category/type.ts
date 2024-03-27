export interface CategoryCreateType {
  title: string;
  image: string;
  parent?: string;
}

export interface ActiveType {
  active: number;
  title: string;
  id: number | null;
}
