export function swap (arr: number[], idxA: number, idxB: number) {
  [arr[idxA], arr[idxB]] = [arr[idxB], arr[idxA]];
}
