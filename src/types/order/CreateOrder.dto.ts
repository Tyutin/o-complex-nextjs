import { CartItemInterface } from '../cart/CartItem.interface';

export interface CreateOrderDto {
  phone: string;
  cart: CartItemInterface[];
}
