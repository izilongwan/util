export function formatDataTree(data, rootId) {
  const newData = JSON.parse(JSON.stringify(data))
  const map = newData.reduce((prev, curr) => {
    prev[curr.id] = curr
    return prev
  }, {})

  return newData.reduce((prev, curr, idx, arr) => {
    const { parentId } = curr

    if (parentId === rootId) {
      if (!prev[rootId]) {
        prev[rootId] = {
          id: rootId,
          children: []
        }
      }

      prev[rootId].children.push(curr)
    }

    if (map[parentId] && parentId === map[parentId].id) {
      !map[parentId].children && (map[parentId].children = [])
      map[parentId].children.push(curr)
    }

    return prev
  }, {})
}

const data = [
  { id: 1, pid: 0 },
  { id: 2, pid: 1 },
  { id: 3, pid: 1 },
  { id: 4, pid: 2 },
  { id: 5, pid: 3 },
  { id: 6, pid: 0 },
  { id: 7, pid: 5 },
]
// console.time('s')
// console.dir(formatDataTree(data), { depth: 10 });
// console.timeEnd('s')
