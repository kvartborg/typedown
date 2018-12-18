import transform from './transform'

export default async function parse(type, input, compile) {
  const matches = matchAll(input, new RegExp(type+'\\(', 'g'))

  let output = input

  for (const match of matches) {
    const startAt = match.index
    const [part, endAt] = getPart(startAt, input)
    const compiled = await compile(normalize(type, part))

    const head = input.substring(0, startAt)
    const tail = input.substring(endAt, input.length)

    output = await transform(head + compiled + tail)
  }

  return output
}

function normalize(type, input) {
  return input.replace(type+'(', '').slice(0, -1).trim()
}

function getPart(startAt, input) {
  let found = false
  let count = 0
  let end = startAt
  let part = ''
  for (const char of input.substring(startAt, input.length)) {
    if (char === '(') {
      count++
      found = true
    }

    if (char === ')') {
      count--
    }

    part += char
    end++

    if (found && count === 0) {
      break
    }
  }

  return [part, end]
}

function ensureFlag(flags, flag) {
    return flags.includes(flag) ? flags : flags + flag;
}

function matchAll(str, regex) {
  const localCopy = new RegExp(regex, ensureFlag(regex.flags, 'g'))

  let match
  const matches = []

  while (match = localCopy.exec(str)) {
    matches.push(match)
  }

  return matches
}
