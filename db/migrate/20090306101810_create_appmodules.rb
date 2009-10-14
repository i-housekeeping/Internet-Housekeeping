class CreateAppmodules < ActiveRecord::Migration
  def self.up
    create_table :appmodules do |t|
      t.string    "moduleName"             ,:limit => 55
      t.string    "moduleType"             ,:limit => 35
      t.string    "moduleId"             ,:limit => 35
      t.string    "version"             ,:limit => 15
      t.string    "author"             ,:limit => 35
      t.text      "description"
      t.text      "path"
      t.string    "record_sts",   :limit => 4,  :default => "ACTV"
      t.timestamps
    end
  end

  def self.down
    drop_table :appmodules
  end
end
