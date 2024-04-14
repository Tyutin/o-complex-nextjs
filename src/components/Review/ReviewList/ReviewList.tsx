import { ReviewInterface } from '@/types/review/Review.interface';
import classNames from 'classnames';
import ReviewCard from '../ReviewCard/ReviewCard';
import './ReviewList.scss';

type ReviewListProps = {
  reviews: ReviewInterface[];
  className?: string;
};

export default function ReviewList({ reviews, className }: ReviewListProps) {
  return (
    <ul className={classNames('review-list', className)}>
      {reviews.map((review) => {
        return (
          // приходят 2 отзыва с одинаковым id
          <li className="review-list__item" key={Math.random()}>
            <ReviewCard htmlContent={review.text} />
          </li>
        );
      })}
    </ul>
  );
}
