'use server';

import { fetchData } from './fetchData';

export async function getProductsAction(queryParams: {page: number, page_size: number}) {
  return await fetchData.product.getProducts(queryParams);
}
