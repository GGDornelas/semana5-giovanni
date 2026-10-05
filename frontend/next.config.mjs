const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

// STATIC_EXPORT=true gera HTML estático em out/ para o Firebase Hosting (Semana 6).
// Sem a variável, mantém o servidor standalone usado pelo Dockerfile.prod (Semana 5).
const isStaticExport = process.env.STATIC_EXPORT === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isStaticExport ? "export" : "standalone",

  // A aplicação não usa next/image; dispensa o sharp na imagem de produção.
  images: { unoptimized: true },

  // O Django usa barra final nas rotas; o Next não deve redirecioná-las.
  skipTrailingSlashRedirect: true,
};

// Rewrites dependem de servidor e não existem no export estático.
if (!isStaticExport) {
  // Em DEV o navegador chama /api/... no próprio Next, que repassa ao Django.
  // Em PROD o Nginx intercepta /api/ antes de chegar ao Next.
  nextConfig.rewrites = async () => [
    {
      source: "/api/:path*",
      destination: `${backendUrl}/api/:path*`,
    },
  ];
}

export default nextConfig;
