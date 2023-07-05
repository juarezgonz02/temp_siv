export default interface Event {
  eventId: string;
  code: string;
  title: string;
  description: string;
  banner: string;
  banner_big: string;
  date: Date;
  amountTickets: number;
  duration: number;
  category: Category;
  locationId: Location;
  state: string;
  totalAssistants: number;
}

export interface Category {
  categoryId: string;
  name: string;
}

export interface Location {
  location_id: string;
  address: string;
  ability: string;
  name: string;
  map_src: string;
  location: string;
}

export const MOCK_LOCATION: Location = {
  location_id: "",
  address: "",
  ability: "",
  name: "",
  map_src: "",
  location: "",
}

export const MOCK_CATEGORY: Category = {
  categoryId: "25sgsfgesyurgewuyrge",
  name: "category"
}

export const MOCK_EVENT: Event = {
  eventId: "efuegreuygweuy",
  code: "dvshjvsbjfz",
  title: "ewfwefekjdsng",
  description: "vzvkbbvbkgdf",
  banner: "ewfjeoiwfjwie",
  banner_big: "dkvxckhvghdsdgf",
  date: new Date(),
  amountTickets: 100,
  duration: 3,
  category: MOCK_CATEGORY,
  locationId: MOCK_LOCATION,
  state: "SELLING",
  totalAssistants: 100
}