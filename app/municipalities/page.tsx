'use client'

import React, { useState } from 'react'
import useSWR from 'swr'
import { Municipality } from '../../models/interfaces'
import MunicipalityCard from '@/components/MunicipalityCard/MunicipalityCard'

export default function page() {

  const [municipalitiesList, setMunicipalitiesList] = useState<string[]>([])

  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR<Municipality[], Error>('api/municipalities', fetcher)

  if (error) return <div>Error loading data</div>
  if (isLoading) return <div>Loading... </div>
  if (!data) return <div>No data!</div>

  function addRemove(m: string) {
    setMunicipalitiesList((prev) =>
      prev.includes(m) ? prev.filter((n) => n !== m) : [...prev, m]
    )
  }

  return <section className="flex h-full">
    <article className="w-1/3 bg-gray-200 m-2 p-2">
      <p className="font-bold">Escolhidos: </p>
      <ul>{municipalitiesList.map(m => (<li key={m} className="p-2 m-2 bg-gray-300">{m}</li>))}</ul>
    </article>

    <article className="w-2/3 overflow-auto">
      {data.map(m => (
        <MunicipalityCard
          key={m.id}
          id={m.id}
          name={m.name}
          district_name={m.district_name}
          isSelected={municipalitiesList.includes(m.name)}
          addRemove={() => addRemove(m.name)}
        />
      ))}
    </article>


  </section>
}
