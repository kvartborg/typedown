import fs from 'fs'
import path from 'path'
import parse from 'csv-parse/lib/sync'

const defaultOptions = {
  delimiter: ','
}

export default async (data = []) => {
  const row = (row, index) => {
    if (index === 1) {
      return  (
        '|'+row.map(_ => '---').join(' | ') +'|\n' +
        '|'+row.join(' | ')+'|'
      )
    }

    return '|'+row.join(' | ')+'|'
  }
  return data.map(row).join('\n')
}
