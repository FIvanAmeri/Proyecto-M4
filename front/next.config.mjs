/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**', // Esto permite cualquier subdominio de cualquier dominio
        },
      ],
    },
  }
  
  export default nextConfig;
  