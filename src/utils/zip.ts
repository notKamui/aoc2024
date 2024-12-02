export function zipWithNext<T>(array: T[]): [T, T][] {
  return array.slice(0, -1).map((_, i) => [array[i], array[i + 1]])
}
