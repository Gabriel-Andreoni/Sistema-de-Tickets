export async function GET(request, params) {
    const slug = params.slug;
   return new Response(JSON.stringify({
    id: slug,
}))
}

export async function POST(request, params) {
    const body = await request.json();
   
    return new Response(JSON.stringify({
        data: body
    }))
}

export async function DELETE(request, params) {
   
}