import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-3xl font-bold mb-4">Halaman tidak ditemukan</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Sepertinya plat nomor atau halaman yang Anda cari tidak tersedia.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        ← Kembali ke Beranda
      </Link>
    </main>
  )
}