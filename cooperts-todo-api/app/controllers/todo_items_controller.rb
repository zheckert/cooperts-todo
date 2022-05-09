class TodoItemsController < ApplicationController
  def index
    todo_items = TodoItem.order("created_at DESC")
    render json: todo_items
  end

  def create
    todo_item = TodoItem.order("created_at DESC")
    render json: todo_item
  end

  def update
    todo_item = TodoItem.order("created_at DESC")
    render json: todo_item
  end

  def destroy
    todo_item = TodoItem.order("created_at DESC")
    render json: todo_item
  end
end
