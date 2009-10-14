class Style < ActiveRecord::Base
  has_many :users
  belongs_to :theme
  belongs_to :wallpaper
  belongs_to :appmodule
end
