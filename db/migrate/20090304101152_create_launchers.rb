class CreateLaunchers < ActiveRecord::Migration
  def self.up
    create_table :launchers do |t|
      t.string    "name"             ,:limit => 25
      t.string    "record_sts",   :limit => 4,  :default => "ACTV"
      t.timestamps
    end
  end

  def self.down
    drop_table :launchers
  end
end
