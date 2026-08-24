import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Priya's Biology Progress | AQA GCSE",
  description: "A clear, personal study map for Priya's AQA GCSE Biology preparation.",
  openGraph: {
    title: "Priya's Biology Progress | AQA GCSE",
    description: "A clear, personal study map for Priya's AQA GCSE Biology preparation.",
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}