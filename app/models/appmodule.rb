class Appmodule < ActiveRecord::Base
  has_and_belongs_to_many  :roles
  has_and_belongs_to_many  :launchers 
  has_and_belongs_to_many  :appfiles, :order => 'id DESC' 
end
