import { Country } from "./country.interface"

export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | '';

export interface CacheParams {
  capital : TermCountry,
  name : TermCountry,
  region : TermRegion
}

export interface TermCountry {
  term: string,
  countries: Country[]
}

export interface TermRegion {
  term: Region | string,
  countries: Country[]
}
