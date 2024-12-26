import { Municipality } from '@/models/interfaces'
import React from 'react'

export interface MunicipalityProps {
  id: string;
  name: string;
  district_name: string;
  addRemoveMunicipality: ()=>void;
  isSelected: boolean;
}

export default function MunicipalityCard({id, name, district_name, addRemoveMunicipality, isSelected}: MunicipalityProps) {
  
  return <article className={`m-2 p-2 ${isSelected ? 'bg-yellow-500' : 'bg-yellow-300'} hover:bg-yellow-400 flex justify-between `}>
    <p>{name} ({district_name})</p>
    <button 
      className="px-2 bg-yellow-500"
      onClick={addRemoveMunicipality}
      >
        {isSelected ? '-' : '+'}
    </button>
  </article>
}
