class AppmodulesRoles < ActiveRecord::Migration
  def self.up
     create_table :appmodules_roles, :id => false, :force => true do |t|
      t.integer "appmodule_id"
      t.integer "role_id"
    end
  end

  def self.down
    drop_table :appmodules_roles
  end
end
