import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://cek-plat.jeyy.xyz/',
      lastModified: new Date(),
      priority: 1.0,
    },
  ]
}
