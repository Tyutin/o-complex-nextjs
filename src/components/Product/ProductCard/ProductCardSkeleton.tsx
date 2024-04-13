import React from 'react';
import ProductCard from './ProductCard';

export default function ProductCardSkeleton() {
  return (
    <ProductCard
      product={{
        id: 0,
        image_url: '/images/svg/loading.svg',
        title: '........',
        description: '.......',
        price: 0,
      }}
    />
  );
}
