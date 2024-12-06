// ts-worksheet

const input = require('./input.txt').default as string

export async function run() {
  part1(input)
  part2(input)
}

const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g
const doRegex = /do\(\)/g
const dontRegex = /don't\(\)/g

function part1(text: string) {
  const matches = text.matchAll(mulRegex)
  const total = matches.reduce(
    (acc, match) => acc + Number(match[1]) * Number(match[2]),
    0,
  )
  console.log('Total: ', total) //?
}

function part2(text: string) {
  const doIndices = [...text.matchAll(doRegex)].map((match) => match.index)
  const dontIndices = [...text.matchAll(dontRegex)].map((match) => match.index)
  const muls = [...text.matchAll(mulRegex)].map(
    (match) => [match.index, Number(match[1]), Number(match[2])] as const,
  )

  const ignoredBoundaries = dontIndices.map(
    (dontId) =>
      [dontId, doIndices.find((doId) => dontId < doId) ?? text.length] as const,
  )

  const total = muls
    .filter(([id]) => !ignoredBoundaries.some(([l, r]) => l < id && id < r))
    .reduce((acc, [, a, b]) => acc + a * b, 0)
  console.log('Total: ', total) //?
}

run()
