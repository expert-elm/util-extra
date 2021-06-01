type JsonObject = { [property: string]: Json }
export type Json =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | Json[]
