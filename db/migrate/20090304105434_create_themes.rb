class CreateThemes < ActiveRecord::Migration
  def self.up
    create_table :themes do |t|
      t.string    "name"             ,:limit => 25
      t.string    "path_to_thumbnail"             ,:limit => 255
      t.string    "path_to_file"             ,:limit => 255
      t.string    "record_sts",   :limit => 4,  :default => "ACTV"
      t.timestamps
    end
  end

  def self.down
    drop_table :themes
  end
end
