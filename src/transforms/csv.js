import fs from 'fs'
import path from 'path'
import parse from 'csv-parse/lib/sync'

const defaultOptions = {
  delimiter: ','
}

export default async (file, options = {}) => {
  const output = parse(
    fs.readFileSync(path.resolve(file)),
    { ...defaultOptions, ...options }
  )

  return output
}
