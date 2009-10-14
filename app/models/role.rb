class Role < ActiveRecord::Base
  has_many :users
  has_and_belongs_to_many :appmodules
  
  validates_presence_of :title
  validates_uniqueness_of   :title, :case_sensitive => false
 
end
