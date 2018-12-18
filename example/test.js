const fs = require('fs')
const path = require('path')
const watch = require('node-watch')
const { transform } = require('../lib')


watch('./', { recursive: true, filter: /(\.md|\.css)$/ }, (e, name) => {
  if (name === 'output.md') {
    return
  }

  try {
    transform(
      fs.readFileSync(path.resolve('./main.md')).toString()
    ).then(data => fs.writeFileSync(
      path.resolve('./output.md'),
      data
    )).catch(err => console.log(err))
  } catch(err) {
    console.log(err)
  }
})
