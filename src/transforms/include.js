import fs from 'fs'
import path from 'path'
import style from './style'

export default async function include (...paths) {
  const files = await Promise.all(
    paths.filter(path => path !== '')
      .map(async p => {
        const content = fs.readFileSync(
          path.resolve(process.cwd(), p.replace('\n', '').trim())
        ).toString()

        if (p.includes('.css')) {
          return style(content)
        }

        return content
      })
  )

  return files.join('\n')
}
