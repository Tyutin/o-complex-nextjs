'use client';
import Card from '../../UI/Card/Card';
import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react';
import Input from '../../UI/Input/Input';

import Button from '@/components/UI/Button/Button';
import './CartForm.scss';
import { useCartStore } from '@/stores/cart/useCartStore';
import useStore from '@/stores/useStore';
import Popup from '@/components/UI/Popup/Popup';

export default function CartForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [popupContent, setPopupContent] = useState<ReactNode | null>(null);

  const cartStore = useStore(useCartStore, (state) => state);
  useEffect(() => {
    setPopupContent(null);
  }, [setPopupContent, cartStore]);

  if (!cartStore) {
    return <CartFormSkeleton />;
  }
  const { items, phone, setPhoneNumber, isCanCreateOrder, createOrder } =
    cartStore;

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPhone = event.target.value.replace(/[^\d]+/g, '');
    setPhoneNumber(newPhone);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    let title: string;
    let message: string;
    (async () => {
      const createOrderResponse = await createOrder();
      if (createOrderResponse?.success) {
        title = 'Заказ успешно оформлен!';
        message = 'Мы уже собираем заказ, и скоро он будет у вас!';
      } else if (createOrderResponse?.error) {
        title = 'Ошибка при оформлении заказа :(';
        message = createOrderResponse.error;
      } else {
        title = 'Ошибка при оформлении заказа :(';
        message = 'Обратитесь к администратору';
      }
      setIsLoading(false);
      setTimeout(() => {
        setPopupContent(<CartPopupContent {...{ title, message }} />);
      }, 0);
    })();
  };

  const isActive = isCanCreateOrder();

  return (
    <Card className="cart-form">
      <form className="cart-form__form" onSubmit={handleSubmit}>
        <span className="cart-form__title">Добавленные товары</span>
        {!!items.length && (
          <ul className="cart-form__item-list">
            {items.map((item) => {
              return (
                <li className="cart-form__item" key={item.id}>
                  <span className="cart-form__item-title">{item.title}</span>
                  <span className="cart-form__item-quantity">
                    x{item.quantity}
                  </span>
                  <span className="cart-form__item-total">
                    {item.quantity * item.price}₽
                  </span>
                </li>
              );
            })}
          </ul>
        )}
        <div className="cart-form__controls">
          <Input
            mask="+7 (999) 999 99 99"
            value={phone}
            onChange={handlePhoneChange}
            maskChar="_"
            placeholder="+7 (___) ___ __ __"
            size={18}
            className="cart-form__phone-input"
          />
          <Button
            disabled={!isActive || isLoading}
            className="cart-form__submit"
          >
            заказать
          </Button>
        </div>
      </form>
      {!!popupContent && <Popup>{popupContent}</Popup>}
    </Card>
  );
}

function CartFormSkeleton() {
  return (
    <Card className="cart-form">
      <div className="cart-form__form">
        <span className="cart-form__title">Добавленные товары</span>
        <div className="cart-form__controls">
          <Input
            mask="+7 (999) 999 99 99"
            maskChar="_"
            placeholder="+7 (___) ___ __ __"
            size={18}
            className="cart-form__phone-input"
          />
          <Button disabled={true} className="cart-form__submit">
            заказать
          </Button>
        </div>
      </div>
    </Card>
  );
}

function CartPopupContent({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="cart-form__popup-content">
      <span className="cart-form__popup-title">{title}</span>
      <span className="cart-form__popup-message">{message}</span>
    </div>
  );
}
