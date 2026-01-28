export interface apiBeer {
  id: string // Id die ik krijg van de api
  beerId: string //Extra veld voor fav check te doen.
  name: string
  price: string
  image: string
  rating?: {
    average: number
    reviews: number
  }
  userId: string
  favoriteAt: Date
  source: BeerSource
}

export enum BeerSource {
  API = 'api',
  DB = 'db',
}
