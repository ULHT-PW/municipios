'use client'

import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Municipality } from '../../models/interfaces'
import MunicipalityCard from '@/components/MunicipalityCard/MunicipalityCard'

export default function Page() {

  //
  // A. Gestão de Estados
  const [municipalitiesList, setMunicipalitiesList] = useState<string[]>([])


  //
  // B. Fetch de Dados
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR<Municipality[], Error>('api/municipalities', fetcher)


  //
  // C. Transformaçao/processamento de Dados


  //
  // D. Funções utilitárias


  //
  // E. Handlers (interação do utilizador)
  function addRemoveMunicipality(municipio: string) {
    setMunicipalitiesList((prev) =>
      prev.includes(municipio) ? prev.filter(m => m != municipio) : [...prev, municipio]
    )
  }


  //
  // F. Efeitos
  useEffect(() => {
    const localMunicipalitiesList = localStorage.getItem('municipalitiesList') || '[]';
    setMunicipalitiesList(JSON.parse(localMunicipalitiesList))
  }, [])

  useEffect(() => {
    localStorage.setItem('municipalitiesList', JSON.stringify(municipalitiesList));
  }, [municipalitiesList])


  //
  // G. Renderização
  if (error) return <div>Error loading data</div>
  if (isLoading) return <div>Loading... </div>
  if (!data) return <div>No data!</div>

  return <section className="h-full flex">

    <article className="w-1/3 bg-gray-100 p-2 m-2">
      <p className="p-2">Municípios Escolhidos:</p>
      {municipalitiesList.map(m =>
        <div key={m} className="p-2 m-2 bg-gray-300">{m}</div>
      )}
    </article>

    <article className="overflow-auto w-2/3">
      {data.map(m => (
        <MunicipalityCard
          key={m.id}
          name={m.name}
          district_name={m.district_name}
          addRemoveMunicipality={() => addRemoveMunicipality(m.name)}
          isSelected={municipalitiesList.includes(m.name)}
        />
      ))}
    </article>

  </section>
}
