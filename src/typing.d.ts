interface NodeModule {
  hot?: {
    accept: Function
  }
}

interface Window {
  [key: string]: any
  [key: number]: any
}
