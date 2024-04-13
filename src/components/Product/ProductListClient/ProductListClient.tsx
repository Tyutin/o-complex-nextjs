'use client';

import { DEFAULT_PRODUCT_PAGE_SIZE } from '@/constants';
import { useEffect, useState } from 'react';
import ProductList from '../ProductList/ProductList';
import { useInfinityProducts } from '@/hooks/useInfinityProducts';
import { useInView } from 'react-intersection-observer';
import ProductListSkeleton from '../ProductList/ProductListSkeleton';

type ProductListClientProps = {
  count?: number;
};

export default function ProductListClient({
  count = DEFAULT_PRODUCT_PAGE_SIZE,
}: ProductListClientProps) {
  const { products, isLoading, increasePageNumber } = useInfinityProducts({
    page_size: count,
  });

  const { ref, inView } = useInView({ threshold: 0.9 });

  useEffect(() => {
    if (inView) {
      increasePageNumber();
    }
  }, [inView, increasePageNumber]);

  if (!products.length && isLoading) {
    return <ProductListSkeleton />;
  }

  if (!products.length && !isLoading) {
    return <p>Ошибка загрузки продуктов</p>;
  }

  return (
    <>
      <ProductList products={products} />
      <div
        ref={ref}
        style={{
          height: '10px',
          position: 'relative',
          top: '-2000px',
        }}
      />
    </>
  );
}
