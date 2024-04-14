'use server';

import { CreateOrderDto } from '@/types/order/CreateOrder.dto';
import { fetchData } from './fetchData';

export async function getProductsAction(queryParams: {
  page: number;
  page_size: number;
}) {
  return await fetchData.product.getProducts(queryParams);
}

export async function createOrderAction(createOrderDto: CreateOrderDto) {
  return await fetchData.order.createOrder(createOrderDto);
}
