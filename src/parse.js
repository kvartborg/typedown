import transform from './transform'
import transforms from './transforms'
import vm from 'vm'
import fetch from 'node-fetch'

export default async function parse (input) {
  return await parseJavaScript(await parseMath(input))
}

async function parseMath(input) {
  const match = /\$\$(.|\n)*?\$\$/.exec(input)
  if (match === null) return input
  const expression = match[0].replace(/\$\$/g, '').trim()
  return await parseMath(
    input.replace(match[0], await transforms.math(expression))
  )
}

async function parseJavaScript(input) {
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
        (await vm.runInNewContext(func, { ctx: {}, require, global, fetch, console, ...transforms })) || '')
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

  let match, n = 0
  const matches = []

  while ((match = localCopy.exec(str)) && n < 10) {
    matches.push(match)
  }

  return matches
}
