export function formatDataTree(data, rootId = 0) {
  return data.reduce((prev, curr) => {
    const { ret, map } = prev,
          id = curr.id,
          pid = curr.pid;

    map[id] = Object.assign({}, curr, children)
    // {
    //   ...curr,
    //   children: []
    // }

    if (pid === rootId) {
      ret.push(map[id]);
    }
    else {
      const tar = map[pid];

      if (tar && pid === tar.id) {
        tar.children && tar.children.push(map[id]);
      }
    }

    return prev;

  }, { ret: [], map: {} }).ret;
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
