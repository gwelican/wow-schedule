import { DateTime } from 'luxon'

export interface SeriesData {
  x: string
  y: number[] | DateTime[]
}

export interface Series {
  data: SeriesData[]
}
