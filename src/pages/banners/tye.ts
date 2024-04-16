export interface BannerValue {
  title: string;
  description: string;
  image: {
    file: File;
  };
}

export interface BannerTypeResponce {
  count: number;
  next: null | number;
  previous: null | number;
  results: {
    id: number;
    created_at: string;
    updated_at: string;
    image: string;
    title: string;
    description: null | string;
  }[];
}

export interface BannerIdType {
  id: number;
  created_at: string;
  updated_at: string;
  image: string;
  title: string;
  description: null | string;
}
