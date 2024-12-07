// ts-worksheet

const input = require('./input.txt').default as string

type Cell = 'X' | 'M' | 'A' | 'S'

const DIRECTIONS = {
  N: [0, -1],
  S: [0, 1],
  E: [1, 0],
  W: [-1, 0],
  NE: [1, -1],
  NW: [-1, -1],
  SE: [1, 1],
  SW: [-1, 1],
} as const

const TARGET = 'XMAS'

export async function run() {
  const matrix = input
    .split('\n')
    .filter(Boolean)
    .map((line) => line.split('')) as Cell[][]

  part1(matrix)
  part2(matrix)
}

function part1(matrix: Cell[][]) {
  let matchCount = 0

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const cell = matrix[y][x]
      if (cell !== 'X') continue

      for (const [dx, dy] of Object.values(DIRECTIONS)) {
        let match = true
        for (let i = 1; i < TARGET.length; i++) {
          const nx = x + dx * i
          const ny = y + dy * i

          if (matrix[ny]?.[nx] !== TARGET[i]) {
            match = false
            break
          }
        }

        if (match) {
          matchCount++
        }
      }
    }
  }

  console.log('Match count: ', matchCount) //?
}

function part2(matrix: Cell[][]) {
  let matchCount = 0

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const cell = matrix[y][x]
      if (cell !== 'A') continue

      const topLeft = matrix[y - 1]?.[x - 1]
      const topRight = matrix[y - 1]?.[x + 1]
      const bottomLeft = matrix[y + 1]?.[x - 1]
      const bottomRight = matrix[y + 1]?.[x + 1]

      if (
        !(
          (topLeft === 'M' && bottomRight === 'S') ||
          (topLeft === 'S' && bottomRight === 'M')
        )
      )
        continue
      if (
        !(
          (topRight === 'M' && bottomLeft === 'S') ||
          (topRight === 'S' && bottomLeft === 'M')
        )
      )
        continue

      matchCount++
    }
  }

  console.log('Match count: ', matchCount) //?
}

run()
