'use client'

import React from 'react'

import { Municipality } from '@/models/interfaces'
import useSWR from 'swr'

export default function page() {

  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR<Municipality[], Error>("/api/municipalities", fetcher)

  if (error) return <div>Error loading data</div>
  if (isLoading) return <div>Loading...</div>
  if (data == undefined) return <div>No data</div>


  return <>
    <div>Municípios</div>
    { data.map( (m) => (
      <p> {m.name} </p>
    ))}
  </>
}
