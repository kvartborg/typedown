import fs from 'fs'
import path from 'path'

export default function include (data) {
  return '\n' + data.split(' ')
    .filter(path => path !== '')
    .map(p =>
      fs.readFileSync(
        path.resolve(process.cwd(), p.trim())
      ).toString()
    ).join('\n')
}
