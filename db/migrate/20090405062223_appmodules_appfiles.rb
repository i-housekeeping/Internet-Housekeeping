class AppmodulesAppfiles < ActiveRecord::Migration
  def self.up
     create_table :appfiles_appmodules, :id => false, :force => true do |t|
      t.integer "appmodule_id"
      t.integer "appfile_id"
    end
  end

  def self.down
    drop_table :appfiles_appmodules
  end
end
