import { CartItemInterface } from '../../types/cart/CartItem.interface';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { ProductInterface } from '@/types/product/Product.interface';
import { CreateOrderDto } from '@/types/order/CreateOrder.dto';
import { createOrderAction } from '@/fetch/actions';
import { create } from 'zustand';
import { useEffect, useState } from 'react';

type CartState = {
  items: CartItemInterface[];
  phone: string;
};

type CartActions = {
  incrementItem: (cartItem: ProductInterface) => void;
  decrementItem: (cartItem: ProductInterface) => void;
  setItemQuantity: (cartItem: ProductInterface, quantyti: number) => void;
  setPhoneNumber: (phone: string) => void;
  isCanCreateOrder: () => boolean;
  createOrder: () => Promise<CreateOrderResponse | null>;
};

export type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  immer(
    persist(
      (set, get) => ({
        items: [],
        phone: '',
        incrementItem: (product) => {
          set((state) => {
            const alreadyExistingItemInCart = state.items.find(
              (item) => item.id === product.id
            );
            if (alreadyExistingItemInCart) {
              alreadyExistingItemInCart.quantity++;
              return;
            }
            const { id, title, price } = product;
            state.items.push({ id, title, quantity: 1, price });
          });
        },
        decrementItem: (product) => {
          set((state) => {
            const alreadyExistingItemInCartIndex = state.items.findIndex(
              (item) => item.id === product.id
            );
            if (alreadyExistingItemInCartIndex === -1) return;
            const alreadyExistingItemInCart =
              state.items[alreadyExistingItemInCartIndex];
            if (alreadyExistingItemInCart.quantity > 1) {
              alreadyExistingItemInCart.quantity--;
              return;
            }
            state.items.splice(alreadyExistingItemInCartIndex, 1);
          });
        },
        setItemQuantity: (product, quantity) => {
          set((state) => {
            const alreadyExistingItemInCartIndex = state.items.findIndex(
              (item) => item.id === product.id
            );
            if (alreadyExistingItemInCartIndex === -1) return;
            const alreadyExistingItemInCart =
              state.items[alreadyExistingItemInCartIndex];
            if (quantity <= 0) {
              console.log('quantity <= 0');
              state.items.splice(alreadyExistingItemInCartIndex, 1);
              return;
            }
            alreadyExistingItemInCart.quantity = quantity;
          });
        },
        setPhoneNumber: (phone) => {
          set((state) => {
            state.phone = phone;
          });
        },
        isCanCreateOrder: () =>
          !!get().items.length && get().phone.length === 11,
        createOrder: async () => {
          const createOrderDto: CreateOrderDto = {
            phone: get().phone,
            cart: get().items.map((item) => {
              const { id, quantity } = item;
              return { id, quantity };
            }),
          };
          const createOrderResponse = await createOrderAction(createOrderDto);
          if (createOrderResponse?.success) {
            set((state) => {
              state.items = [];
            });
          }
          return createOrderResponse;
        },
      }),
      {
        name: 'cartStore',
        version: 1,
      }
    )
  )
);
