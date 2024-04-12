import ReviewList from '../ReviewList/ReviewList';
import { fetchData } from '@/fetch/fetchData';

export default async function ReviewSection() {
  const reviews = await fetchData.review.getAllReviews();

  return (
    <section className="section">
      <div className="container">
        <h1 className="section__title">Отзывы о наших продуктах</h1>
        {!Array.isArray(reviews) ? (
          <p>Произошла ошибка загрузки данных :(</p>
        ) : !reviews.length ? (
          <p>Здесь пока пусто</p>
        ) : (
          <ReviewList reviews={reviews} />
        )}
      </div>
    </section>
  );
}
