import ProductListClient from '../ProductListClient/ProductListClient';

export default function ProductsSection() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="section__title">Наши продукты</h1>
        <ProductListClient />
      </div>
    </section>
  );
}
