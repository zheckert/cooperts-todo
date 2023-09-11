class RemoveDescriptionFromTodoItmes < ActiveRecord::Migration[6.1]
  def change
    remove_column :todo_items, :description, :string
  end
end
