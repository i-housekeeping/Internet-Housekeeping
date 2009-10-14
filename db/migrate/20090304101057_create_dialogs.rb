class CreateDialogs < ActiveRecord::Migration
  def self.up
    create_table :dialogs do |t|
      t.string    "name"             ,:limit => 50
      t.text      "path"
      t.string    "type"             ,:limit => 15
      t.string    "record_sts",   :limit => 4,  :default => "ACTV"
      t.timestamps
    end
  end

  def self.down
    drop_table :dialogs
  end
end
