export async function GET() {
    const response = await fetch('https://restcountries.com/v3.1/all');
  
    if (!response.ok) {
      return new Response('Failed to fetch countries', { status: response.status });
    }
  
    const data = await response.json();
    return Response.json(data);
  }
  