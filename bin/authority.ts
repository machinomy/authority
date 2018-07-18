#!/usr/bin/env node

import { Authority, Configuration } from '../src/index'

async function main () {
  const configuration = await Configuration.env()
  const authority = await Authority.build(configuration)
  return authority.start()
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
