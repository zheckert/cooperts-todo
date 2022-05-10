Rails.application.routes.draw do
  scope '/api/version1' do
    resources :todo_items
  end
end
