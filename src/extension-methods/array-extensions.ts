export {}; // this file needs to be a module
Array.prototype.remove = function remove<T>(
  this: Array<T>,
  value: T
): Array<T> {
  const index = this.indexOf(value);
  if (index > -1) {
    this.splice(index, 1);
  }
  return this;
};
