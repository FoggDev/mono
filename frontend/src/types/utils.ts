export type ValueOf<T> = T[keyof T]

export interface MapOf<T> {
  [key: string]: T
}
