'use client'

import Button from '@/components/Button/Button'
import React, { useEffect, useState } from 'react'

export default function Page() {

  const [count, setCount] = useState(0)

  useEffect(() => {
    localStorage.setItem('count', count + '')
    console.log(count)
  }, [count])

  useEffect(() => {
    const countStr = localStorage.getItem('count') || '0';
    setCount(parseInt(countStr))
  }, [])

  return <>
    <h2 className="text-xl font-bold">Contador</h2>
    <Button
      count={count}
      increment={() => setCount(count + 1)}
    />

    <p className="font-bold">O contador vai em {count}.</p>

    <p>O botão é um componente React. O clique no botão altera o valor disponível na página,
      porque a função responsável pela atualização do estado é passada como prop para o componente botão.</p>

  </>
}
