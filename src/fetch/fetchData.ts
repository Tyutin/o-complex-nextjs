import { ReviewsResponseType } from '@/types/review/ReviewsResponse.type';
import { fetchBuilder } from './helpers';

export const fetchData = {
  review: {
    async getAllReviews(): Promise<ReviewsResponseType | null> {
      try {
        const response = await fetchBuilder(
          'http://o-complex.com:1337/reviews',
          'GET'
        );
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
};
