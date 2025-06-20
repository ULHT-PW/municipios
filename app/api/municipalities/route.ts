// app/api/municipalities/route.ts
// API Route em Next.js (App Router)

// IMPORTANTE: só deve exportar UMA função GET.
// A outra é auxiliar, só para mostrar.

//
// VERSÃO SIMPLES — funciona, mas sem tratamento de erros.
//
async function simpleVersion() {
  return fetch('https://api.carrismetropolitana.pt/municipalities')
    .then(res => res.json())
    .then(data => Response.json(data))
}


//
// VERSÃO CORRETA — com tratamento de erro
//
async function safeVersion() {
  try {
    const res = await fetch('https://api.carrismetropolitana.pt/municipalities');

    if (!res.ok) {
      return new Response('Erro ao buscar dados', { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);

  } catch (error) {
    return new Response('Erro inesperado', { status: 500 });
  }
}

//
// ✅ Esta é a função realmente exportada e usada na API.
//
export async function GET() {
  // Podes alternar entre versões para fins pedagógicos:
  // return simpleVersion();  // ← versão sem tratamento de erro
  return safeVersion();       // ← versão com tratamento correto
}
