class TodoItem < ApplicationRecord

  belongs_to :user

  validates :title, presence: true, uniqueness: true 
  
end
