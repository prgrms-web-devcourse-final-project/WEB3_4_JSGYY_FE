export interface Post {
  id: number;
  title: string;
  price: number;
  saleStatus: string;
  createdAt: string;
  modifiedAt: string;
  images: string[];
  content: string;
  userId: number;
}

export interface PostDetail {
  id: number;
  title: string;
  content: string;
  images: string[];
  price: number;
  saleStatus: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  modifiedAt: string;
  userId: number;
}
