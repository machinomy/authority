import { Base as DBMigrateBase, CallbackFunction } from 'db-migrate-base'

let _meta: Object = {
  version: 1
}

exports.up = (db: any, callback: CallbackFunction) => {
  const createTableOptions = {
    columns:
      {
        name: 'string',
        enode: {
          type: 'string',
          primaryKey: true
        },
        networkId: 'string'
      },
    ifNotExists: true
  }
  db.createTable('bc_node', createTableOptions, callback)
}

exports.down = (db: DBMigrateBase, callback: CallbackFunction) => {
  db.dropTable('bc_node', callback)
}
