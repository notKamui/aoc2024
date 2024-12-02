import { zipWithNext } from '../utils/zip'

const file = Bun.file('./src/day2/input.txt')

export async function run() {
  const input = await file.text()
  const reports = input
    .split('\n')
    .filter(Boolean)
    .map((line) => line.split(' ').map(Number))

  part1(reports)
  part2(reports)
}

function part1(reports: number[][]) {
  function isSafe(report: number[]) {
    // either all increasing or all decreasing, and each level has a distance between 1 and 3 included
    const zipped = zipWithNext(report)
    const diffs = zipped.map(([a, b]) => a - b)
    if (diffs.some((d) => Math.abs(d) < 1 || Math.abs(d) > 3)) return false
    if (diffs.some((d) => d < 0) && diffs.some((d) => d > 0)) return false
    return true
  }

  const safe = reports.filter(isSafe)

  console.log('Safe reports: ', safe.length)
}

function part2(reports: number[][]) {
  function isSafe(report: number[]) {
    // same as before except one error is tolerated
    const zipped = zipWithNext(report)
    const diffs = zipped.map(([a, b]) => a - b)
    const diffErrors = diffs.filter((d) => Math.abs(d) < 1 || Math.abs(d) > 3).length
    if (diffErrors > 1) return false
    const countIncreasing = diffs.filter((d) => d < 0).length
    const diff = zipped.length - countIncreasing
    if (diff > 1 && diff < zipped.length - 1) return false
    return true
  }

  const safe = reports.filter(isSafe)

  console.log('Safe reports: ', safe.length)
}
