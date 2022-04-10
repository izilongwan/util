export class LRUCache {
  capacity: number
  cache: Map<string, any>

  constructor(capacity = 2) {
    this.capacity = capacity
    this.cache = new Map()
  }

  get(key: string) {
    const { cache } = this

    if (cache.has(key)) {
      const ret = cache.get(key)

      cache.delete(key)
      cache.set(key, ret)
      // console.log('🚀 ~ file: index.js ~ line 15 ~ LRUCache ~ get ~ ret', ret)
      return ret
    }

    // console.log(-1)
    return -1
  }

  put(key: string, value: any) {
    const { cache, capacity } = this

    if (cache.has(key)) {
      cache.delete(key)
    }

    if (cache.size >= capacity ) {
      const firstKey = cache.keys().next().value
      cache.delete(firstKey)
    }

    cache.set(key, value)

    // console.log('🚀 ~ file: index.js ~ line 38 ~ LRUCache ~ put ~ value', value)
    return value
  }
}

export class LRUCache2 {
  cache: Record<string, any> = {}
  keys: string[] = []
  capacity: number

  constructor(capacity = 2) {
    this.capacity = capacity
  }

  get(key: string) {
    const { cache, keys } = this

    if (Object.hasOwnProperty.call(cache, key)) {
      this.removeAndPush(keys, key)

      // console.log('🚀 ~ file: index.js ~ line 56 ~ LRUCache2 ~ get ~ cache[key]', cache[key])
      return cache[key]
    }

    // console.log('🚀 ~ file: index.js ~ line 60 ~ LRUCache2 ~ get ~ -1', -1)
    return -1
  }

  put(key: string, value: any) {
    const { cache, keys, capacity } = this

    if (Object.hasOwnProperty.call(cache, key)) {
      this.removeAndPush(keys, key)
    }

    if (keys.length >= capacity) {
      this.remove(cache, keys)
    }

    cache[key] = value
    // console.log('🚀 ~ file: index.js ~ line 75 ~ LRUCache2 ~ put ~ value', value)
    keys.push(key)
  }

  removeAndPush(keys: string[], key: string) {
    const idx = keys.indexOf(key)

    if (idx < 0) {
      return
    }

    keys.splice(idx, 1)
    keys.push(key)
  }

  remove(cache: Record<string, any>, keys: string[]) {
    const key = keys.shift()

    delete cache[key as string]
  }
}
// const lur = new LRUCache2()
// lur.get(0)
// lur.put(1, 1)
// lur.get(1)
// lur.put(2, 2)
// lur.get(2)
// lur.put(3, 3)
// lur.get(1)
// lur.put(4, 4)
// lur.get(2)
// lur.get(3)
// lur.put(5, 5)
// lur.get(4)
// lur.put(0, 0)
// lur.get(3)
