import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const plat = searchParams.get('plat')

  if (!plat) {
    return NextResponse.json({ error: 'Plat nomor tidak ditemukan di query.' }, { status: 400 })
  }

  const apiKey = process.env.JEYY_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'API key tidak tersedia di server.' }, { status: 500 })
  }

  try {
    const res = await fetch(`https://api.jeyy.xyz/v2/general/plat_nomor?plat=${plat}`, {
      headers: {
        accept: 'application/json',
        Authorization: apiKey,
      },
    })

    const contentType = res.headers.get('content-type')
    const data = contentType?.includes('application/json') ? await res.json() : null

    if (!res.ok) {
      const errorMsg = data?.detail || data?.error || 'Gagal menghubungi API eksternal.'
      return NextResponse.json({ error: errorMsg }, { status: res.status })
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Terjadi kesalahan pada server.' }, { status: 500 })
  }
}
