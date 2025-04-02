import './globals.css'
import type { Metadata } from 'next'
import ThemeProvider from '../theme/theme-provider'

export const metadata: Metadata = {
  title: 'Cek Plat Nomor Indonesia',
  description: 'Alat untuk mengecek asal wilayah dari plat nomor kendaraan di Indonesia secara cepat dan akurat.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head />
      <body className="bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#ffffffcf]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
