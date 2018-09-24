const fs = require('fs')
const path = require('path')
const watch = require('node-watch')
const { transform } = require('../lib')


watch('./', { recursive: true }, (e, name) => {
  if (name === 'output.md') {
    return
  }

  try {
    fs.writeFileSync(
      path.resolve('./output.md'),
      transform(
        fs.readFileSync(path.resolve('./main.md')).toString()
      )
    )
  } catch(err) {
    console.log(err)
  }
})
