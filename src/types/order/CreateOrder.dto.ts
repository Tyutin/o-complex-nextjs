export interface CreateOrderDto {
  phone: string;
  cart: { id: number; quantity: number }[];
}
