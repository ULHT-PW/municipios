'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Municipality } from '../../models/interfaces'

interface Line {
    id: string,
    long_name: string,
    municipalities: string[],
    color: string,
    text_color: string
}

const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Erro: ${res.status} ${res.statusText}`);
    }
    return res.json();
};


export default function LinesPage() {

    //
    // A. Estados
    const [municipality, setMunicipality] = useState('')
    const [lines, setLines] = useState<Line[]>([])

    //
    // B. Fetch de Dados
    const { data: dataMunicipalities, error: errorMunicipalityies, isLoading: isLoadingMunicipalityies } = useSWR<Municipality[]>('/api/municipalities', fetcher)
    const { data: dataLines, error: errorLines, isLoading: isLoadingLines } = useSWR<Line[]>('https://api.carrismetropolitana.pt/lines', fetcher)

    //
    // C. useEffects
    useEffect(() => {
        if (!dataLines) return
        const filteredLines = dataLines.filter(l => l.municipalities.includes(municipality))
        setLines(filteredLines)
    }, [municipality, dataLines])


    if (errorMunicipalityies) return <p>Error</p>
    if (isLoadingMunicipalityies) return <p>Loading</p>
    if (!dataMunicipalities) return <p>No data</p>

    return (
        <>
            <h2 className="font-bold text-xl">
                Linhas que passam por:
                <select
                    className="bg-gray-300 py-1 px-2 mx-2 rounded-xl"
                    name="municipality"
                    value={municipality}
                    onChange={(e) => setMunicipality(e.target.value)}
                >
                    <option value="">Escolha um Município</option>
                    {dataMunicipalities.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                </select>
            </h2>


            {lines.length != 0 && (
                <ul>
                    {lines.map((l, index) => (
                        <li key={index} className="my-4 flex gap-2 items-start ">
                            <span style={{ background: l.color, color: l.text_color }} className="font-bold px-2 rounded-xl">
                                {l.id}
                            </span> 
                            <span>{l.long_name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}