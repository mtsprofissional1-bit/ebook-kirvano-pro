/** @type {import('next').NextConfig} */
const nextConfig = {
  // ADICIONE ESTE BLOCO AQUI!
  eslint: {
    ignoreDuringBuilds: true,
  },
  // O restante da sua configuração (se houver) fica aqui.
};

export default nextConfig; // (ou module.exports = nextConfig;)