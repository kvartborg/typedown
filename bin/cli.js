#!/usr/bin/env node
'use strict'

const meow = require('meow')
const typedown = require('../lib/typedown').default
const watch = require('node-watch')
const path = require('path')
const fs = require('fs')

const cli = meow(`
  Usage
    $ typedown <input>

  Options
  	--watch,         -w          watch files and compile when changed
  	--output <file>, -o <file>   Output to file
`, {
	flags: {
		watch: {
			type: 'boolean',
      default: false,
			alias: 'w'
		},
    output: {
      type: 'string',
      default: './output.md',
      alias: 'o'
    }
	}
})

if (cli.flags.watch) {
  watch(process.cwd(), { recursive: true, filter: /(\.md|\.css|\.js|\.csv|\.png|\.jpg|\.jpeg|\.svg|\.json)$/ }, (e, name) => {
    if (name === path.resolve(cli.flags.output)) {
      return
    }

    try {
      typedown(
        fs.readFileSync(path.resolve(cli.input[0])).toString()
      ).then(data => fs.writeFileSync(
        path.resolve(cli.flags.output),
        data
      )).catch(err => console.log(err))
    } catch(err) {
      console.log(err)
    }
  })
  return
}

if (cli.input[0]) {
  typedown(fs.readFileSync(
    path.resolve(process.cwd(), cli.input[0])
  ).toString())
    .then(data => {
      console.log(data)
      process.exit(0)
    })
    .catch(err => {
      process.exit(1)
    })
}

process.stdin.on('data', content => {
  typedown(content.toString())
    .then(data => {
      console.log(data)
      process.exit(0)
    })
    .catch(err => {
      process.exit(1)
    })
})
