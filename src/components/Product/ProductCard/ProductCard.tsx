/* eslint-disable @next/next/no-img-element */
import Card from '@/components/UI/Card/Card';
import './ProductCard.scss';
import { ProductInterface } from '@/types/product/Product.interface';

type ProductCardProps = {
  product: ProductInterface;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="product-card">
      <div className="product-card__info">
        <img
          src={product.image_url}
          alt={product.title}
          className="product-card__image"
        />
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__description">{product.description}</p>
      </div>
      <div className="product-card__cart-block">
        <span className="product-card__price">цена: {product.price}₽</span>
      </div>
    </Card>
  );
}
