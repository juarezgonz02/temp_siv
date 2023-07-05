/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, createContext } from 'react';
import { ReactNode } from 'react'

export interface propstype {
    canvas_w: number,
    canvas_h: number
  }
  
  export interface TiersData extends Object {
    tiers: Tier[],
    count: number
  }
  export interface Tier {
    tierId: string,
    numbered: boolean,
    requestedName: string,
    price: number,
    name: string
  }

  export interface TicketsAvailability {
    sold: string[],
  }


  type props = {
    children?: ReactNode
  }

interface Type {
    tierIdState: {
        tierID: string;
        setTierID: (tierID: string) => void;
    };
    tierJsonDataState: {
        tierJsonData: Tier[] | undefined;
        setTierJsonData: (tierJsonData: Tier[] | undefined) => void;
    };
    canvasSizeState: {
        canvasSize: {canvas_h: number; canvas_w: number};
        setCanvasSize: (canvasSize: {
            canvas_h: number;
            canvas_w: number;
        }) => void;
    };
    mapUrlState: {
        mapUrl: string;
        setMapUrl: (mapUrl: string) => void;
    };
    availabilityDataState: {
        availabilityData: TicketsAvailability | undefined ;
        setAvailabilityData: (availabilityData: TicketsAvailability | undefined) => void;
    };
}

export const DataContext = createContext<Type>({
    tierIdState: {
        tierID: "",
        setTierID: (tierID: string) => {}
    },
    tierJsonDataState: {
        tierJsonData: undefined,
        setTierJsonData: (tierJsonData) => {}
    },
    canvasSizeState: {
        canvasSize: {canvas_h: 0, canvas_w: 0},
        setCanvasSize: (canvasSize: {
            canvas_h: number;
            canvas_w: number;
        }) => {}
    },
    mapUrlState: {
        mapUrl: "",
        setMapUrl: (mapUrl: string) => {}
    },
    availabilityDataState: {
        availabilityData: undefined,
        setAvailabilityData: (availabilityData) => {}
    }
})

const Context = ({ children }:props) => {
  
    const [tierID, setTierID] = useState("")
    const [tierJsonData, setTierJsonData] = useState<TiersData>()
    const [canvasSize, setCanvasSize] = useState({canvas_h: 900, canvas_w: 900})
    const [mapUrl, setMapUrl] = useState("")
    const [availabilityData, setAvailabilityData] = useState<TicketsAvailability>()
  
    const store = {
      tierIdState: {tierID: tierID, setTierID: setTierID},
      tierJsonDataState: {tierJsonData:tierJsonData, setTierJsonData:setTierJsonData},
      canvasSizeState: {canvasSize:canvasSize, setCanvasSize:setCanvasSize},
      mapUrlState: {mapUrl, setMapUrl},
      availabilityDataState: {availabilityData, setAvailabilityData}
    }
    
    
    return <DataContext.Provider value={store}>{children}</DataContext.Provider>
}

export default Context