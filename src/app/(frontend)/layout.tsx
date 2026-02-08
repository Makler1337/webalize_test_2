import React from 'react'

export const metadata = {
  description: 'Webalize interview app',
  title: 'Webalize',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
