export {}; // this file needs to be a module
declare global {
  interface String {
    isNullOrEmpty(this: string): boolean;
  }

  interface Array<T> {
    remove<T>(this: Array<T>, value: T): Array<T>;
  }
}
