export interface Setting<T> {
  key: string,
  name: string,
  value: T,
  valid: (val: T) => string | null
}
