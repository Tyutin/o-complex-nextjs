import classNames from 'classnames';
import './ProductList.scss';
import ProductCardSkeleton from '../ProductCard/ProductCardSkeleton';

type ProductListProps = {
  className?: string;
  count?: number;
};

export default function ProductListSkeleton({
  className,
  count = 20,
}: ProductListProps) {
  const array = [];
  for (let i = 1; i <= count; i++) {
    array.push(
      <li className="product-list__item" key={i}>
        <ProductCardSkeleton />
      </li>
    );
  }
  return <ul className={classNames('product-list', className)}>{array}</ul>;
}
