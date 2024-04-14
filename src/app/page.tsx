import ProductsSection from '@/components/Product/ProductsSection/ProductsSection';
import ReviewSection from '@/components/Review/ReviewSection/ReviewSection';
import CartSetcion from '@/components/Cart/CartSetcion/CartSetcion';
import './MainPage.scss';

export default function MainPage() {
  return (
    <main className="main-page">
      {/* <ReviewSection /> */}
      <CartSetcion />
      <ProductsSection />
    </main>
  );
}
