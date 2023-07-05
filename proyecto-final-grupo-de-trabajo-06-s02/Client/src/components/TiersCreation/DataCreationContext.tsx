/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, createContext } from 'react';
import { ReactNode } from 'react'

export interface propstype {
    canvas_w: number,
    canvas_h: number
  }
  

  export interface SeatBlock {
    blockId: string,
    name: string,
    numberSeats: number,
    locationId: {
        location_id: string,
        name: string
    }
  }

  export interface TicketsAvailability {
    sold: string[],
  }


  type props = {
    children?: ReactNode
  }

interface Type {
    blockIdState: [
      string,
      (v: string) => void,
    ];
    totalTiersState: [
      number,
      (v: number) => void,
    ];
    blockJsonDataState: {
        blockJsonData: SeatBlock[];
        setBlockJsonData: (blockJsonData: SeatBlock[]) => void;
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
        availabilityData: TicketsAvailability ;
        setAvailabilityData: (availabilityData: TicketsAvailability) => void;
    };
    listOfTiersState: Map<string, {
      name: string,
      no_numered: boolean,
      price: number,
    }>
}

export const DataCreationContext = createContext<Type>(null)

const Context = ({ children }:props) => {
  
    const blockIdState = useState("")
    const [blockJsonData, setBlockJsonData] = useState<SeatBlock[]>([])
    const [canvasSize, setCanvasSize] = useState({canvas_h: 900, canvas_w: 900})
    const [mapUrl, setMapUrl] = useState("")
    const totalTiersState = useState(0)
    const [availabilityData, setAvailabilityData] = useState<TicketsAvailability>({
        sold: [],
      })
    
    const listOfTiers = new Map<string, {
        name: string,
        no_numered: boolean,
        price: number,
      }>();
    
    const store = {
      blockIdState: blockIdState,
      totalTiersState: totalTiersState,
      blockJsonDataState: {blockJsonData:blockJsonData, setBlockJsonData:setBlockJsonData},
      canvasSizeState: {canvasSize:canvasSize, setCanvasSize:setCanvasSize},
      mapUrlState: {mapUrl, setMapUrl},
      availabilityDataState: {availabilityData, setAvailabilityData},
      listOfTiersState: listOfTiers
    }
    
    
    return <DataCreationContext.Provider value={store}>{children}</DataCreationContext.Provider>
}

export default Context