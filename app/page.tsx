import PlatNomorChecker from './PlatNomorChecker'
import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'

interface PlatWilayah {
  pulau: string
  wilayah: string
  daerah: {
    nama_daerah: string
    kode_awal: string[] | null
    kode_akhir: string[] | null
  }[]
}

export const metadata: Metadata = {
  title: 'Cek Plat Nomor Indonesia - Cepat dan Akurat',
  description: 'Cek informasi plat nomor Indonesia secara cepat dan akurat. Temukan asal daerah kendaraan, kode wilayah, dan detail nomor polisi dengan mudah.',
  keywords: ['Plat Nomor Indonesia', 'Cek Plat Nomor', 'Informasi Plat Nomor'],
  openGraph: {
    title: 'Cek Informasi Plat Nomor Indonesia | Cek Plat Nomor Cepat dan Akurat',
    description: 'Gunakan alat cek informasi plat nomor Indonesia kami untuk mengetahui lokasi, kode wilayah, dan detail nomor polisi dengan cepat dan akurat.',
    url: 'https://cek-plat.jeyy.xyz',
    type: 'website',
    images: [
      {
        url: 'https://cek-plat.jeyy.xyz/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cek Informasi Plat Nomor',
      }
    ]
  },
  alternates: {
    canonical: 'https://cek-plat.jeyy.xyz',
  }
}

function getPlatData(): Record<string, PlatWilayah> {
  const filePath = path.join(process.cwd(), 'data', 'plat.json')
  const fileContents = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(fileContents)
}

export default function Page() {
  const data = getPlatData()

  const faqSections = Object.entries(data).map(([kode, info]) => {
    const daerahList = info.daerah.map((d) => d.nama_daerah).join(', ')
    return (
      <section key={kode} className="mb-6">
        <h3 className="text-md font-semibold mb-1">Plat {kode} dari mana?</h3>
        <p>
          Plat <strong>{kode}</strong> berasal dari wilayah <strong>{info.wilayah}</strong> di Pulau {info.pulau}, meliputi daerah seperti {daerahList}.
        </p>
      </section>
    )
  })

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: Object.entries(data).map(([kode, info]) => {
      const daerahList = info.daerah.map((d) => d.nama_daerah).join(', ')
      return {
        "@type": "Question",
        name: `Plat ${kode} dari mana?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Plat ${kode} berasal dari wilayah ${info.wilayah} di Pulau ${info.pulau}, meliputi daerah seperti ${daerahList}.`
        }
      }
    })
  }

  return (
    <main>
      <PlatNomorChecker />

      <section className="mt-8 px-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Tentang Alat Cek Plat Nomor</h2>
        <p>Alat ini membantu Anda mengetahui asal wilayah dari plat nomor seperti B, AD, AB, dan lainnya.</p>
      </section>

      <section className="mt-12 px-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Pertanyaan Umum tentang Plat Nomor</h2>
        {faqSections}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </section>
    </main>
  )
}
