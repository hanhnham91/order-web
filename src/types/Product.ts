export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: Image;
};

export type Image = {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
};

export type ProductList = Product[];

export type CartItem = Product & {
  quantity: number;
};
