import fs from 'fs'
import { resolve } from 'path'
import mj from 'mathjax-node'
import crypto from 'crypto'

function checksum(str, algorithm, encoding) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex')
}

const path = resolve(process.cwd(), 'math')

if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
}

mj.start()

const config = {
    format: 'TeX',
    svg: true,
}

export default async function math (math) {
  return new Promise((resolve, reject) => {
    mj.typeset({ ...config, math }, result => {
      if (result.error) return reject(error)
      const filename = checksum(result.svg) + '.svg'

      if (!fs.existsSync(`${path}/${filename}`)) {
        fs.writeFileSync(`${path}/${filename}`, result.svg)
      }

      resolve(`![${math}](${path}/${filename})`)
    })
  })
}