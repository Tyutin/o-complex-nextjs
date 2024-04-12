import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../assets/global.scss';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title:
    'О-complex - бренд линии умных средств для восстановления внутреннего и внешнего состояния организма',
  description:
    '[О Комплекс] Наши продукты - Цеолит, Минеральный комплекс, Бутылка ионизатор воды✔ Свобода от аллергии ✔Иммунитет для всей семьи ✔Защита от вирусов ✔Восстановление после родов ✔ Жми',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
