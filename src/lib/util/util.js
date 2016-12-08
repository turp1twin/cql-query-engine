export function compact (things) {
  return things.filter(x => x != null)
}

export function numericalSort (things, direction = 'asc') {
  return things.sort((a, b) => {
    if (direction === 'asc') {
      return a - b
    } else {
      return b - a
    }
  })
}

export function isNull (value) {
  return value === null
}

export function typeIsArray (value) {
  return Array.isArray ? Array.isArray(value) : Object.prototype.toString.call(value) === '[object Array]'
}

export function allTrue (things) {
  if (typeIsArray(things)) {
    return things.every(x => x)
  } else {
    return things
  }
}

export function anyTrue (things) {
  if (typeIsArray(things)) {
    return things.some(x => x)
  } else {
    return things
  }
}

export function isUndefined (value) {
  return typeof value === 'undefined'
}

export function isUndefinedOrNull (value) {
  return (typeof value === 'undefined' || value === null)
}

export function guard (value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : void 0
}

export function guardFunc (func, transform) {
  return typeof func === 'function' ? transform(func) : void 0
}

export function contains (needle, haystack) {
  return haystack.indexOf(needle) >= 0
}

