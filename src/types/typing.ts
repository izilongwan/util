export interface ICommonObject {
  [key: string]: any
}

export interface ICtor {
  new(...args: any[]): any
}

export type TCtor = new(...args: any[]) => any

export interface IPromiseFunction {
  resolve(...args: any[]): any
  (): any
}

export interface IVecType {
  x: number;
  y: number;
}

export interface ICommonFunction {
  (...args: any[]): any
  [key: string]: any;
}
