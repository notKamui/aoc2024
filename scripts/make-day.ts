const day = Bun.argv[2]
if (!day) {
  console.error('Please provide a day number')
  process.exit(1)
}

const file = Bun.file(`src/day${day}/run.ts`)
Bun.write(file, `const input = require(\'./input.txt\').default as string

export async function run() {
}
`)
