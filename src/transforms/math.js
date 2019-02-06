import fs from 'fs'
import { resolve } from 'path'
import mj from 'mathjax-node'
import crypto from 'crypto'

function checksum (str, algorithm, encoding) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex')
}

const path = resolve(process.cwd(), 'math')

if (!fs.existsSync(path)) {
  fs.mkdirSync(path)
}

mj.start()

const config = {
  format: 'TeX',
  svg: true,
  displayMessages: true
}

export default async function math (math) {
  return new Promise((resolve, reject) => {
    mj.typeset({ ...config, math }, result => {
      if (result.error) throw new Error(result.error)
      const filename = checksum(result.svg) + '.svg'

      if (!fs.existsSync(`${path}/${filename}`)) {
        fs.writeFileSync(`${path}/${filename}`, result.svg)
      }

      resolve(`![${math.replace(/\[/, '\\[').replace(/\]/, '\\]')}](${path}/${filename})`)
    })
  })
}
