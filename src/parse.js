import transform from './transform'
import transforms from './transforms'
import vm from 'vm'

export default async function parse (input) {
  const matches = matchAll(input, new RegExp(`{{(.|\n)*?}}`, 'g'))

  let output = input

  for (const match of matches) {
    try {
      const js = match[0].replace('{{', '').replace('}}', '')
      const func = `
        (async ctx => {
          ${js.includes('return') && js.includes('\n') ? js : 'return ' + js.trim()}
        })()
      `

      output = await transform(
        output.replace(/\{\{(.|\n)*?\}\}/,
        (await vm.runInNewContext(func, { ctx: {}, require, global, console, ...transforms })) || '')
      )
    } catch (err) {
      output = output.replace(
        /\{\{(.|\n)*?\}\}/,
        "<div style='color: red;'>" + err.message + '</div>'
      )
    }
  }

  return output
}

function ensureFlag (flags, flag) {
  return flags.includes(flag) ? flags : flags + flag
}

function matchAll (str, regex) {
  const localCopy = new RegExp(regex, ensureFlag(regex.flags, 'g'))

  let match
  const matches = []

  while ((match = localCopy.exec(str))) {
    matches.push(match)
  }

  return matches
}
