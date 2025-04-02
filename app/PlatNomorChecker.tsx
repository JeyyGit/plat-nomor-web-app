'use client'
import { useEffect, useRef, useState } from 'react'

interface Lokasi {
  pulau?: string
  wilayah?: string
  daerah?: string[]
}

interface Bagian {
  kode_wilayah?: string
  nomor_polisi?: string
  kode_seri_wilayah?: string
}

interface PlatResponse {
  error?: string
  lokasi?: Lokasi
  bagian?: Bagian
}

export default function PlatNomorChecker() {
  const [hurufDepan, setHurufDepan] = useState('')
  const [nomor, setNomor] = useState('')
  const [hurufBelakang, setHurufBelakang] = useState('')
  const [response, setResponse] = useState<PlatResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(prefersDark)
    document.documentElement.classList.toggle('dark', prefersDark)
  }, [])

  const toggleTheme = () => {
    setIsDark(prev => {
      const newMode = !prev
      document.documentElement.classList.toggle('dark', newMode)
      return newMode
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!hurufDepan || !nomor || !hurufBelakang) {
      setResponse({ error: 'Semua kolom wajib diisi.' })
      return
    }

    const platNomor = `${hurufDepan.toUpperCase()}${nomor}${hurufBelakang.toUpperCase()}`.trim()
    setLoading(true)
    setResponse(null)

    try {
      const res = await fetch(`/api/cek-plat?plat=${encodeURIComponent(platNomor)}`)
      const data: PlatResponse = await res.json()
      setResponse(data)
    } catch {
      setResponse({ error: 'Gagal mengambil data dari API.' })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setHurufDepan('')
    setNomor('')
    setHurufBelakang('')
    setResponse(null)
    inputRef.current?.focus()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 text-2xl p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:scale-105 transition-transform"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? '☀️' : '🌙'}
      </button>

      <h1 className="text-2xl font-bold mb-6">
        Cek Wilayah atau Daerah Asal Plat Nomor
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <div className="flex shadow-sm rounded overflow-hidden border border-gray-400 bg-white dark:bg-gray-800">
          <input
            ref={inputRef}
            className="px-3 py-2 w-16 text-center uppercase border-r border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="B"
            maxLength={2}
            required
            value={hurufDepan}
            onChange={(e) =>
              setHurufDepan(e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase())
            }
          />
          <input
            className="px-3 py-2 w-24 text-center border-r border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="1234"
            maxLength={4}
            required
            value={nomor}
            onChange={(e) => setNomor(e.target.value.replace(/[^0-9]/g, ''))}
          />
          <input
            className="px-3 py-2 w-20 text-center uppercase bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="XYZ"
            maxLength={3}
            required
            value={hurufBelakang}
            onChange={(e) =>
              setHurufBelakang(e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase())
            }
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Memproses...' : 'Cek Plat'}
        </button>

        {response && (
          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-gray-600 dark:text-gray-400 hover:underline mt-1"
          >
            Reset
          </button>
        )}
      </form>

      {response && (
        <div className="mt-6 w-full max-w-md space-y-4">
          {response.error ? (
            <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded shadow text-sm">
              ❌ <span className="font-semibold">Error:</span> {response.error}
            </div>
          ) : (
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-1">📍 Lokasi</h2>
                <p>
                  <span className="font-medium">Pulau:</span> {response.lokasi?.pulau || '-'}
                </p>
                <p>
                  <span className="font-medium">Wilayah:</span> {response.lokasi?.wilayah || '-'}
                </p>
                {response.lokasi?.daerah?.length ? (
                  <ul className="list-disc list-inside text-sm mt-1">
                    {response.lokasi.daerah.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-1">🔤 Bagian Plat</h2>
                <p>
                  <span className="font-medium">Kode Wilayah:</span>{' '}
                  {response.bagian?.kode_wilayah || '-'}
                </p>
                <p>
                  <span className="font-medium">Nomor Polisi:</span>{' '}
                  {response.bagian?.nomor_polisi || '-'}
                </p>
                <p>
                  <span className="font-medium">Kode Seri Wilayah:</span>{' '}
                  {response.bagian?.kode_seri_wilayah || '-'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
