class User < ApplicationRecord

  has_many :todo_items

  validates :name, presence: true, uniqueness: true
  validates :email, presence: true
  validates :password, presence: true

end
