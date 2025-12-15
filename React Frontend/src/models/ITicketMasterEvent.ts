export interface ITicketMasterResponse {
  _embedded: {
    events: ITicketMasterEvent[];
  };
}

export interface ITicketMasterEvent {
  id: string,
  name: string,
  url: string,
  images?: { url: string }[],
  dates?: {
    start?: { localDate?: string },
    status?: { code?: string },
  },
  _embedded?: {
    venues?: { city?: { name?: string } }[]
  },
  classifications?: {
    subGenre?: { name?: string }
  }[]
}
