class AppmodulesLaunchers < ActiveRecord::Migration
  def self.up
     create_table :appmodules_launchers, :id => false, :force => true do |t|
      t.integer "appmodule_id"
      t.integer "launcher_id"
    end
  end

  def self.down
    drop_table :appmodules_launchers
  end
end
