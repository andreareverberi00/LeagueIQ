import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LoL IQ Test – Are You Actually Human?',
  description: 'A toxic-funny League champ select IQ quiz.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
