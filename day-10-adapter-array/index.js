const { readLines } = require('../helpers')
const process = require('process')

const readAdapters = () => {
  const lines = readLines(process.argv[2]).map(Number)
  lines.sort((a, b) => a - b)
  return [0, ...lines, Math.max(...lines) + 3]
}

const puzzle1 = () => {
  const adapters = readAdapters()
  const differences = { 1: 0, 3: 0 }
  for (let i = 1; i < adapters.length; i++) {
    const diff = adapters[i] - adapters[i - 1]
    differences[diff]++
  }
  console.log(differences[1] * differences[3])
}

const puzzle2 = () => {
  const adapters = readAdapters()
  const nodes = []
  adapters.forEach((val) => {
    const nbPaths = nodes
      .filter((n) => val - n.val <= 3)
      .map(({ nbPaths }) => nbPaths || 1)
      .reduce((a, b) => a + b, 0)
    nodes.push({ val, nbPaths })
  })
  console.log(nodes[nodes.length - 1].nbPaths)
}

puzzle1()
puzzle2()
