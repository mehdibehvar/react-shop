export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  rating: number;
  reviews: Review[];
  relatedProductIds: string[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};
