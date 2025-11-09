import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        id: "/",
        name: 'Netflix Clone',
        short_name: 'Netflix',
        description: 'Stream movies and TV shows like Netflix',
        start_url: '/',
        display: 'standalone',
        background_color: '#141414',
        theme_color: '#e50914',
        icons: [
            {
                src: '/icons/Netflix_Symbol_RGB.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icons/Netflix_Symbol_RGB.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/icons/Netflix_Symbol_RGB.png',
                sizes: '1024x1024',
                type: 'image/png',
            },
        ],
    }
}
