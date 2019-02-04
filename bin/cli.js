#!/usr/bin/env node
'use strict'

const meow = require('meow')
const typedown = require('../lib/typedown').default
const path = require('path')
const fs = require('fs')

const cli = meow(`
  Usage
    $ typedown <input>
`)

if (cli.input[0]) {
  typedown(fs.readFileSync(
    path.resolve(process.cwd(), cli.input[0])
  ).toString())
    .then(data => {
      console.log(data)
      process.exit(0)
    })
    .catch(err => {
      console.log(err)
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
      console.log(err)
      process.exit(1)
    })
})
