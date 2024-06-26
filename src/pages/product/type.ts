export interface ProductType {
  count: number;
  next: null;
  previous: null;
  results: {
    category: number;
    id: number;
    image: string;
    is_available: true;
    is_new: true;
    price: string;
    title: string;
  }[];
}
export interface ProductId {
  category: number;
  id: number;
  image: string;
  is_available: true;
  is_new: true;
  price: string;
  title: string;
}
export interface ProductResponce {
  data: {
    count: number;
    next: null;
    previous: null;
    results: {
      category: number;
      id: number;
      image: string;
      is_available: true;
      is_new: true;
      price: string;
      title: string;
    }[];
  };
  pageSize: number;
}

export interface SubmitProduct {
  title: string;
  image: {
    file: File;
  };
  isNew: boolean | undefined;
  is_available: boolean | undefined;
  price: number;
  category: number;
}
