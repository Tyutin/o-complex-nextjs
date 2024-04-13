import { getProductsAction } from '@/fetch/actions';
import { ProductInterface } from '@/types/product/Product.interface';
import { useCallback, useEffect, useRef, useState } from 'react';

type UseProductsProps = {
  page_size: number;
};

type UseProductsState = {
  isLoading: boolean;
  products: ProductInterface[];
  increasePageNumber: () => void;
};

export const useInfinityProducts = ({
  page_size,
}: UseProductsProps): UseProductsState => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalProductCount, setTotalProductCount] = useState(Infinity);

  const increasePageNumber = useCallback(() => {
    if (totalProductCount - currentPageNumber * page_size > 0) {
      setCurrentPageNumber((prevValue) => (prevValue += 1));
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const productResponse = await getProductsAction({
        page: currentPageNumber,
        page_size,
      });
      if (productResponse) {
        setProducts((prevState) => {
          return [...prevState, ...productResponse.products];
        });
        setTotalProductCount(productResponse.total);
      }
      setIsLoading(false);
    })();
  }, [
    page_size,
    setIsLoading,
    setProducts,
    setTotalProductCount,
    currentPageNumber,
  ]);

  return { isLoading, products, increasePageNumber };
};
