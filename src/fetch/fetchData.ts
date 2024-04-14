import { ReviewsResponseType } from '@/types/review/ReviewsResponse.type';
import { fetchBuilder } from './helpers';
import { ProductsResponseInterface } from '@/types/product/ProductsResponse.interface';
import { CreateOrderDto } from '@/types/order/CreateOrder.dto';

export const fetchData = {
  review: {
    async getAllReviews(): Promise<ReviewsResponseType | null> {
      try {
        const response = await fetchBuilder({
          url: 'http://o-complex.com:1337/reviews',
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = (await response.json()) as ReviewsResponseType;
        if (!data) {
          throw new Error('Failed to fetch reviews');
        }
        return data;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
  },
  product: {
    async getProducts(queryParams: {
      page: number;
      page_size: number;
    }): Promise<ProductsResponseInterface | null> {
      try {
        const response = await fetchBuilder({
          url: 'http://o-complex.com:1337/products',
          method: 'GET',
          queryParams,
        });
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = (await response.json()) as ProductsResponseInterface;
        if (!data) {
          throw new Error('Failed to fetch reviews');
        }
        return data;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
  },
  order: {
    createOrder: async (
      createOrderDto: CreateOrderDto
    ): Promise<CreateOrderResponse | null> => {
      try {
        const response = await fetchBuilder({
          url: 'http://o-complex.com:1337/order',
          method: 'POST',
          body: createOrderDto,
        });
        if (!response.ok) {
          throw new Error('Failed create order');
        }
        const data = (await response.json()) as CreateOrderResponse;
        if (!data) {
          throw new Error('Failed create order');
        }
        return data;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
  },
};
