let ticketsList = [];


export async function GET(request) {
    return new Response(JSON.stringify({ticketsList}), {status: 200})
}

export async function POST(request) {
    
    const tickets = await request.json();
    ticketsList.push(tickets);

    return new Response(JSON.stringify(tickets), {
        headers: {"Content-Type": "application/json"},
        status: 201,
    });
}