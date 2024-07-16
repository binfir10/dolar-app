'use client'
import { formatDate } from '@/components/format-date'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

interface Dolares {
  compra: number
  venta: number
  casa: string
  nombre: string
  moneda: string
  fechaActualizacion: string
}
;[]

export default function Home() {
  const {
    isPending,
    error,
    data: dolares,
  } = useQuery({
    queryKey: ['dolares'],
    queryFn: () =>
      fetch('https://dolarapi.com/v1/dolares').then(res => res.json()),
  })

  const { data: otrasMonedas } = useQuery({
    queryKey: ['cotizaciones'],
    queryFn: () =>
      fetch('https://dolarapi.com/v1/cotizaciones').then(res => res.json()),
  })

  if (isPending) {
    return (
      <div className="flex items-center justify-center text-center min-h-screen">
        Loading...
      </div>
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-7 px-10 mt-20 mb-28 justify-center ">
      <div className="max-w-2xl flex flex-col gap-2 items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl uppercase">
          Dolar en Argentina
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-balance font-medium">
          La cotización actual del dólar estadounidense en Argentina. Incluye el
          precio de compra y venta de dólares en diferentes mercados
          (denominados casas).
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dolares.map((dolar: Dolares, index: number) => (
          <Card
            key={index}
            className="p-3 shadow-xl space-y-2 bg-card text-accent-foreground">
            <p className="text-sm tracking-tight font-thin text-foreground">
              {' '}
              Ult. Actualización:{' '}
              {formatDate(new Date(dolar.fechaActualizacion))}
            </p>
            <CardTitle className="flex font-bold text-3xl gap-2 py-1 bg-gradient-to-r from-sky-500  to-blue-600 bg-clip-text text-transparent">
              <Link href={`dolar/${dolar.casa}`}>Dolar {dolar.nombre} </Link>
              <p className="text-sm text-foreground">{dolar.moneda}</p>
            </CardTitle>
            <CardDescription className="gap-2 flex flex-col">
              <div className="space-x-2">
                <span>Compra:</span>
                <Badge variant="outline">${dolar.compra}</Badge>
              </div>
              <div className="space-x-2">
                <span>Venta:</span>

                <Badge variant="outline">${dolar.venta}</Badge>
              </div>
            </CardDescription>
          </Card>
        ))}
        {otrasMonedas?.slice(1).map((moneda: Dolares, index: number) => (
          <Card
            key={index}
            className="p-3 shadow-xl space-y-2 bg-card text-accent-foreground">
            <p className="text-sm tracking-tight font-thin ">
              {' '}
              Ult. Actualización:{' '}
              {formatDate(new Date(moneda.fechaActualizacion))}
            </p>
            <CardTitle className="flex font-bold text-3xl gap-2 py-1 bg-gradient-to-r from-sky-500  to-blue-600 bg-clip-text text-transparent">
              <Link href={`otras/${moneda.moneda.toLowerCase()}`}>
                {moneda.nombre}{' '}
              </Link>
              <p className="text-sm text-foreground">{moneda.moneda}</p>
            </CardTitle>
            <CardDescription className="gap-2 flex flex-col">
              <div className="space-x-2">
                <span>Compra:</span>
                <Badge variant="outline">${moneda.compra}</Badge>
              </div>
              <div className="space-x-2">
                <span>Venta:</span>

                <Badge variant="outline">${moneda.venta}</Badge>
              </div>
            </CardDescription>
          </Card>
        ))}
      </div>
    </main>
  )
}
