require "test_helper"

class TodoItemsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get todo_items_index_url
    assert_response :success
  end

  test "should get create" do
    get todo_items_create_url
    assert_response :success
  end

  test "should get update" do
    get todo_items_update_url
    assert_response :success
  end

  test "should get destroy" do
    get todo_items_destroy_url
    assert_response :success
  end
end
