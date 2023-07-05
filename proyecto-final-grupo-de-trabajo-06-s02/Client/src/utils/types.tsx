export interface Event 	{
    eventId: string,
    date: string,
    code: string,
    amountTickets: number,
    promoter: string,
    duration: number,
    locationId: {
        location_id: string,
        address: string,
        ability:string,
        name: string,
        map_src: string,
        location: string,
    },
    category: {
        categoryId: string,
        name: string,
    },
    state: string,
    description: string,
    banner: string,
    title: string,
    totalAssistants: number
}

export interface StatisticCont {
    ticket_selled: number,
    ticket_validated: number,
}