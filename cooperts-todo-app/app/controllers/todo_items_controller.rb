class TodoItemsController < ApplicationController
  def index
    todo_items = TodoItem.order("created_at DESC")
    render json: todo_items
  end

  def create
    todo_item = TodoItem.new(title: params[:title], done: params[:done], user: User.last)
    if todo_item.save
      render json: todo_item
    else
      render json: todo_item.errors
    end
  end

  def update
    todo_item = TodoItem.find(params[:id])
    todo_item.update(done: params[:done])
    render json: todo_item
  end

  def destroy
    todo_item = TodoItem.find(params[:id])
    todo_item.destroy
    render json: todo_item
  end
end
