import React from 'react'
import '../public/global.css'
import {Metadata} from 'next'
import {Provider as EmployeesProvider} from '../state/employees'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Lukas Hodac - Paylocity employee benefits',
    description: 'A challenge, done live',
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'contain',
}

export default async function rootLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <html lang="en">
      <body>
        <EmployeesProvider>{children}</EmployeesProvider>
      </body>
    </html>
  )
}
