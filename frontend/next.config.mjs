const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  // A aplicação não usa next/image; dispensa o sharp na imagem de produção.
  images: { unoptimized: true },

  // O Django usa barra final nas rotas; o Next não deve redirecioná-las.
  skipTrailingSlashRedirect: true,

  // Em DEV o navegador chama /api/... no próprio Next, que repassa ao Django.
  // Em PROD o Nginx intercepta /api/ antes de chegar ao Next.
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
