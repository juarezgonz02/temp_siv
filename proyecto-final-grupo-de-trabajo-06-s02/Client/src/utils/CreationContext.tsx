import { ReactNode, createContext, useState } from "react";

interface infoType {
    title: string; 
    description: string;
    category: string;
    manager: string;
    state: boolean;
    duration: number;
}

export interface NewTier {
        name: string,
        no_numered: boolean,
        block_name: string,
        price: number, 
}

interface NewEvent {
    step: [number, (v: number)=>void]
    info: [infoType, (v: infoType)=>void]
    img: [string, (v: string)=>void]
    location: [string, (v: string)=>void]
    dates: [string[], (v: string[])=>void]
    listOfTiers: [any, (v: any)=>void]
    employes:[ ({validator: boolean, promotor: boolean, email: string})[], (a)=>void]
}
export const CreationContext = createContext<NewEvent>(null)

const Creation = ({children}:({children: ReactNode })) => {
  
    const inf = {
        title: "", description: "", category: "", manager: "", state: false, duration: 0
    }
    
    const infoState = useState<infoType>(inf);

    const dates = useState<string[]>([]);

    const imgState = useState<string>("");

    const listOfTiersState = useState(new Map<string, {
        name: string,
        no_numered: boolean,
        block_name: string,
        price: number,
      }>()) 

    const employees = useState<({validator: boolean, promotor: boolean, email: string})[]>([]);

    const stepState = useState(0);

    const locationState = useState("");

    const store: NewEvent = {

        step: stepState,
        info: infoState,
        img: imgState,
        dates: dates,
        employes: employees,
        location: locationState,
        listOfTiers: listOfTiersState
    }

    return (
        <CreationContext.Provider value={store}>
            {children}
        </CreationContext.Provider>
    )
}

export default Creation