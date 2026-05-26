import type { Metadata } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-d',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-b',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'A Nova Linguagem da Pentatônica — Prof. Joab Pereira',
  description: 'Treinamento completo para contrabaixistas. Do zero ao avançado, domine a pentatônica com liberdade, fraseado e identidade musical.',
  openGraph: {
    title: 'A Nova Linguagem da Pentatônica',
    description: 'Domine a pentatônica no contrabaixo e pare de soar como todo mundo.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${bebasNeue.variable} ${inter.variable}`}>
      <head>
        <script src="https://fast.wistia.com/player.js" async></script>
        <script src="https://fast.wistia.com/embed/iuieek8lrm.js" async type="module"></script>
        <script src="https://fast.wistia.com/embed/iti05qn4ly.js" async type="module"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
