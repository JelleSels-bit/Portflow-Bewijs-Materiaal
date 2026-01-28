import {BeerSource} from '@/model/apiBeer'

export interface IcustomBeer {
  id: string
  beerId: string //Extra veld voor fav check te doen.
  userId: string
  name: string
  brewery: string
  alcohol: string
  description: string
  category: BeerCategory
  createdAt: number
  source: BeerSource
}

export enum BeerCategory {
  BrownAle = 'Brown Ale',
  AmberAle = 'Amber Ale',
  Ale = 'Ale',
  Trappist = 'Trappist',
  Pilsner = 'Pilsner',
  IPA = 'IPA',
  Stout = 'Stout',
  Lager = 'Lager',
}
