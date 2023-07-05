/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, createContext, useEffect, useState } from "react";
import { Event } from "./types";

type Type = {
    listEvents: [Event[], (value: Event[]) => void];
    selectedEvent: [Event | undefined, (value: Event | undefined) => void];
}


export const EventContext = createContext<Type>({
    listEvents: [[], (v)=>{}],
    selectedEvent: [undefined, (value: Event | undefined) => {}]
})

type props = {
    children?: ReactNode
  }

const getFromSessionStore = () => {
  const te = localStorage.getItem("selEvent")
  if(te != null){
   return JSON.parse(te!) 
  }
  return undefined
}

const Context = ({children}:(props)) => {

    const eventState = useState<Event[]>([]);
    const selEvent = useState<Event | undefined>(getFromSessionStore());

    useEffect(() => { 
      
      if(selEvent[0] == undefined){
        return
      }
      
      console.log(selEvent[0])
      localStorage.setItem("selEvent", JSON.stringify(selEvent[0]))
    }, [eventState, selEvent])
    
    const store = {
        listEvents: eventState,
        selectedEvent: selEvent
    }
    
  return (
    <EventContext.Provider value={store}> {children} </EventContext.Provider>
  )
}

export default Context
