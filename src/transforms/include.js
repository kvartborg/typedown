import fs from 'fs'
import path from 'path'
import style from './style'
import transform from '../transform'

export default async function include (data) {
  const files = await Promise.all(data.split(' ')
    .filter(path => path !== '')
    .map(async p => {
      const content = fs.readFileSync(
        path.resolve(process.cwd(), p.trim())
      ).toString()

      if (p.includes('.css')) {
        return await style(content)
      }

      return content
    }))

  return files.join('\n')
}
