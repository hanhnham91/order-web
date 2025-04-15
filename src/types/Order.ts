export type Order = {
  couponCode?: string;
  items: OrderItem[];
};

export type OrderItem = {
  productId: number;
  quantity: number;
};
