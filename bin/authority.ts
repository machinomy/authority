#!/usr/bin/env node

import { Authority, Configuration } from '../src/index'

async function main () {
  const configuration = await Configuration.env()
  const authority = await Authority.build(configuration)
  return authority.start()
}

main().then(() => {
  console.info('*** AUTHORITY IS RUNNING ***')
}).catch((error: Error) => {
  console.error(error)
  console.info('*** AUTHORITY WAS TERMINATED ***')
  process.exit(1)
})
