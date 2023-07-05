interface Selection{
    price: number;
    tier_id: string;
    tier_name: string;
    selected: any[];
}

export interface Save{
    seats: Selection[]
}

export const saveSeats = (tierID: string, name: string, price: number, selectedSeats: any[]) => { 
        
    const actual:Save = JSON.parse(sessionStorage.getItem("seatSelected") || "") 
    
    const seats = {
       tier_id: tierID,
       tier_name: name,
       price: price,
       selected: selectedSeats
    }

    const alreadySaved = actual.seats.findIndex( (save) => {
            return save.tier_id == tierID 
    })
    
    if(alreadySaved != -1){    
        actual.seats.splice(alreadySaved, 1)   
    }
    
    actual.seats.push(seats)

    console.log(actual)
    sessionStorage.setItem("seatSelected", JSON.stringify(actual)) 
}

export const getSeats = (tierId: string) => { 
    
    const actual:Save  = JSON.parse(sessionStorage.getItem("seatSelected") || "") 

    return actual.seats.find(
        ({tier_id}) => tier_id == tierId
    ) 
 }