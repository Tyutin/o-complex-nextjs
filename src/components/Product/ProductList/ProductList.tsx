import { ProductInterface } from '@/types/product/Product.interface';
import './ProductList.scss';
import classNames from 'classnames';
import ProductCard from '../ProductCard/ProductCard';

type ProductListProps = {
  products: ProductInterface[];
  className?: string;
};

export default function ProductList({ products, className }: ProductListProps) {
  return (
    <ul className={classNames('product-list', className)}>
      {products.map((product) => {
        return (
          <li className="product-list__item" key={product.id}>
            <ProductCard product={product} />
          </li>
        );
      })}
    </ul>
  );
}
