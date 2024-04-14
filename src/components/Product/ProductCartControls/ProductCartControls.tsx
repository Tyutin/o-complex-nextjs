'use client';

import Button from '@/components/UI/Button/Button';
import { ProductInterface } from '@/types/product/Product.interface';
import Input from '@/components/UI/Input/Input';
import { ChangeEvent } from 'react';
import './ProductCartControls.scss';
import useStore from '@/stores/useStore';
import { useCartStore } from '@/stores/cart/useCartStore';

type ProductCartControlsProps = {
  product: ProductInterface;
};

export default function ProductCartControls({
  product,
}: ProductCartControlsProps) {
  const cartStore = useStore(useCartStore, (state) => state);

  if (!cartStore) {
    return (
      <div className="product-cart-controls">
        <Button disabled className="product-cart-controls__add-to-cart-button">
          В корзину
        </Button>
      </div>
    );
  }
  const { incrementItem, decrementItem, items, setItemQuantity } = cartStore;
  const productInCart = items.find((item) => item.id === product.id);

  const incrementProductInCart = () => {
    incrementItem(product);
  };

  const decrementProductInCart = () => {
    decrementItem(product);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(event.target.value);
    if (isNaN(quantity)) return;
    setItemQuantity(product, quantity);
  };

  if (!productInCart) {
    return (
      <div className="product-cart-controls">
        <Button
          onClick={incrementProductInCart}
          className="product-cart-controls__add-to-cart-button"
        >
          В корзину
        </Button>
      </div>
    );
  }

  return (
    <div className="product-cart-controls">
      <Button
        onClick={decrementProductInCart}
        className="product-cart-controls__count-change-button"
      >
        -
      </Button>
      <Input
        value={productInCart.quantity.toString()}
        className="product-cart-controls__count-input"
        onChange={handleChange}
      />
      <Button
        onClick={incrementProductInCart}
        className="product-cart-controls__count-change-button"
      >
        +
      </Button>
    </div>
  );
}
