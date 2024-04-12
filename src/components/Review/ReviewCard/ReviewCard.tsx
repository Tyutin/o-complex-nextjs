import * as DOMPurify from 'dompurify';
import Card from '@/components/UI/Card/Card';
import './ReviewCard.scss';

type ReviewCardProps = {
  htmlContent: string;
};

export default function ReviewCard({ htmlContent }: ReviewCardProps) {
  return (
    <Card className="review-card">
      <div
        className="review-card__content"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlContent) }}
      ></div>
    </Card>
  );
}
