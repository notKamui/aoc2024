// ts-worksheet

import { zipWithNext } from "../utils/zip";

const input = require('./input.txt').default as string

export async function run() {
  const reports = input
    .split('\n')
    .filter(Boolean)
    .map((line) => line.split(' ').map(Number))

  part1(reports)
  part2(reports)
}

function part1(reports: number[][]) {
  const safe = reports.filter(isSafe)

  console.log('Safe reports: ', safe.length) //?
}

function part2(reports: number[][]) {
  const safe = reports.filter(isSafeWithDampener)

  console.log('Safe reports: ', safe.length) //?
}

function isSafe(report: number[]) {
  // either all increasing or all decreasing, and each level has a distance between 1 and 3 included
  const zipped = zipWithNext(report)
  const diffs = zipped.map(([a, b]) => a - b)
  if (diffs.some((d) => Math.abs(d) < 1 || Math.abs(d) > 3)) return false
  if (diffs.some((d) => d < 0) && diffs.some((d) => d > 0)) return false
  return true
}

function isSafeWithDampener(report: number[]) {
  // same as before except that if at most one level can be skipped to make it safe, it is safe
  if (isSafe(report)) return true
  for (let i = 0; i < report.length; i++) {
    const without = report.slice()
    without.splice(i, 1)
    if (isSafe(without)) return true
  }
  return false
}

run()
