import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function page() {
  return <>
    <p>Página que interage com a API dos Municípios.</p>
    <p>Endpoint: <Link className="underline" href="http://api.carrismetropolitana.pt/municipalities">http://api.carrismetropolitana.pt/municipalities</Link></p>
    <Image
      src="/municipios.webp" 
      alt="Municípios" 
      width={800}
      height={100}
      className="object-contain"
    />
  </>
}
