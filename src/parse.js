import transform from './transform'

export default function parse(pattern, data, callback) {
  while (true) {
    const match = data.match(new RegExp(pattern+'\{([^\}]+)\}'))

    if (!match) {
      break
    }

    if (data[match.index-1] === '\\') {
      data = replaceAt(data, match.index-1, '')
      continue
    }

    const [raw] = match
    let output = callback(
      transform(
        raw.replace(/\n/g, '')
          .replace(`${pattern}{`, '')
          .replace('}', '')
          .trim()
      )
    )

    data = data.replace(raw, output)
  }

  return data
}

function replaceAt(string, index, replace) {
  return string.substring(0, index) + replace + string.substring(index + 1);
}
