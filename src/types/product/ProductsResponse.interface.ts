import { ProductInterface } from './Product.interface';

export interface ProductsResponseInterface {
  page: number;
  amount: number;
  total: number;
  items: ProductInterface[];
}
