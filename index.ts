console.log('AOC 2024')

const day = Bun.argv[2]
if (!day) {
  console.error('Please provide a day number')
  process.exit(1)
}

const mod = require(`./src/day${day}/run`)
if (!mod) {
  console.error(`Day ${day} not found or does not have a run function`)
  process.exit(1)
}
