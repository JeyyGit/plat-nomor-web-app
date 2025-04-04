import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
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

        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-W74DXYGB8V"
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-W74DXYGB8V');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
