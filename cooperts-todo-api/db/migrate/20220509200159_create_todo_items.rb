class CreateTodoItems < ActiveRecord::Migration[6.1]
  def change
    create_table :todo_items do |t|
      t.string :title
      t.text :description
      t.boolean :done
      t.integer :user_id

      t.timestamps
    end
  end
end
