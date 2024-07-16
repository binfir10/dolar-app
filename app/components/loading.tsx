import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import React from 'react'

export const Loading = () => {
  return (
    <Card className="p-3 shadow-xl space-y-2 bg-card text-accent-foreground">
      <p className="text-sm tracking-tight font-thin text-foreground">
        <div className="w-full h-4" />
      </p>
      <CardTitle className="flex font-bold text-3xl gap-2 py-1 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
        <div className="w-3/4 h-8" />
      </CardTitle>
      <CardDescription className="gap-2 flex flex-col">
        <div className="space-x-2">
          <div className="w-1/4 h-4" />
          <div className="w-1/2 h-4" />
        </div>
        <div className="space-x-2">
          <div className="w-1/4 h-4" />
          <div className="w-1/2 h-4" />
        </div>
      </CardDescription>
    </Card>
  )
}
