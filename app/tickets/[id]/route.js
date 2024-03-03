export async function GET(request, context) {
    const {params} = context;

    const getData = await fetch("http://localhost:3000/tickets");
    const data = await getData.json();
    
    const uniqueTicket = data.ticketsList.filter(ticket => ticket.id === parseInt(params.id));


    return new Response(JSON.stringify({
        data: uniqueTicket
    }))
}

export async function DELETE(request, params) {
   
}