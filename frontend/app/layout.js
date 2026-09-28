import "./globals.css";

export const metadata = {
  title: "Semana 5 - Do Dev ao Deploy",
  description: "Django + Next.js + PostgreSQL + Nginx containerizados",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
