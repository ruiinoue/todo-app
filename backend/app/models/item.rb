class Item < ApplicationRecord
  belongs_to :todo

  validates :name, presence: true
  validates :done, presence: true
end
