import { Base as DBMigrateBase, CallbackFunction } from 'db-migrate-base'

let _meta: Object = {
  version: 1
}

exports.up = (db: any, callback: CallbackFunction) => {
  const createTableOptions = {
    columns:
    {
      ethereum_address: {
        type: 'string',
        primaryKey: true
      },
      nodeId: 'string'
    },
    ifNotExists: true
  }
  db.createTable('el_node', createTableOptions, callback)
}

exports.down = (db: DBMigrateBase, callback: CallbackFunction) => {
  db.dropTable('el_node', callback)
}
