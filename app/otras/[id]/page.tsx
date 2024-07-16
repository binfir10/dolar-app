'use client'
import { formatDate } from '@/components/format-date'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function OtrasMonedasPage({
  params,
}: {
  params: { id: string }
}) {
  const [convertion, setConvertion] = useState(0)
  const id = params.id
  const {
    isPending,
    error,
    data: otrasMonedas,
  } = useQuery({
    queryKey: ['otras'],
    queryFn: () =>
      fetch(`https://dolarapi.com/v1/cotizaciones/${id}`).then(res =>
        res.json()
      ),
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const num = formData.get('compra')
    let result = Number(num) * otrasMonedas.compra
    setConvertion(result)
  }

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
    <div className="min-h-screen gap-3 flex flex-col items-center pt-20 ">
      <p className="text-sm tracking-tight font-thin text-foreground">
        {' '}
        Ult. Actualización:{' '}
        {formatDate(new Date(otrasMonedas.fechaActualizacion))}
      </p>

      <Card className="p-5 shadow-xl space-y-2 bg-card text-accent-foreground">
        <CardTitle className="flex font-bold items-center  text-3xl gap-2 py-1 bg-gradient-to-r from-sky-500  to-blue-600 bg-clip-text text-transparent">
          {' '}
          {otrasMonedas.nombre}
        </CardTitle>
        <CardDescription className="gap-5 flex ">
          <div className="space-x-2">
            <span>Compra:</span>
            <Badge variant="secondary">${otrasMonedas.compra}</Badge>
          </div>
          <div className="space-x-2">
            <span>Venta:</span>

            <Badge variant="secondary">${otrasMonedas.venta}</Badge>
          </div>
        </CardDescription>
      </Card>
      {/*<div className="flex flex-col gap-3">
        <h3>compra: {dolar.compra}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input type="number" name="compra" placeholder="" />
          <button type="submit">Convertir</button>
        </form>
        <p>{convertion ? `Resultado: $${convertion}` : ''}</p>
      </div>*/}
    </div>
  )
}
