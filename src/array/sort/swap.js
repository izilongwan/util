export function swap (arr, idxA, idxB) {
  [arr[idxA], arr[idxB]] = [arr[idxB], arr[idxA]];
}