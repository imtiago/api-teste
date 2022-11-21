import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Product extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.integer('price').notNullable()
      table.integer('percent').notNullable()
      table.text('details').notNullable()
      table.text('address').notNullable()
      table.boolean('is_available').notNullable()
      table.string('image').nullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
