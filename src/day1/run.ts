const file = Bun.file('./src/day1/input.txt')

export async function run() {
  const input = await file.text()

  const [left, right] = input
    .split('\n')
    .filter(Boolean)
    .reduce(([l, r], line) => {
      const [left, right] = line.replace(/ {2}/g, '').split(' ')
      l.push(Number.parseInt(left))
      r.push(Number.parseInt(right))
      return [l, r]
    }, [[] as number[], [] as number[]])

  part1(left, right)
  part2(left, right)
}

function part1(left: number[], right: number[]) {
  const _left = left.toSorted()
  const _right = right.toSorted()

  let totalDistance = 0
  for (let i = 0; i < _left.length; i++) {
    const distance = Math.abs(_left[i] - _right[i])
    totalDistance += distance
  }

  console.log('Total distance: ', totalDistance)
}

function part2(left: number[], right: number[]) {
  const appearances = right.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1
    return acc
  }, {} as Record<number, number>)

  const similarity = left.reduce((acc, id) => acc + (appearances[id] || 0) * id, 0)

  console.log('Similarity: ', similarity)
}
