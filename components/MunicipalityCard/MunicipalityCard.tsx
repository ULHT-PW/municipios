import { Municipality } from '@/models/interfaces'
import React from 'react'

interface MunicipalityCardProps {
  id: string
  name: string
  district_name: string
  isSelected: boolean
  addRemove: () => void
}


export default function MunicipalityCard({id, name, district_name, isSelected, addRemove}: MunicipalityCardProps) {
  
  return <article className={`m-2 p-2  flex justify-between items-start gap-2
  ${isSelected ? 'bg-yellow-500' : 'bg-yellow-300'} hover:bg-yellow-400 }`}>
    <p>{name} ({district_name})</p>
    <button 
      onClick={addRemove} 
      className={`px-3 float-right w-[5px] flex justify-center items-center font-mono
        ${isSelected ? 'bg-yellow-700' : 'bg-yellow-500'}`}>
          {isSelected ? '-' : '+'}
    </button>
  </article>
}
