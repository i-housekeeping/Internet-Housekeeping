class CreateStyles < ActiveRecord::Migration
  def self.up
    create_table :styles do |t|
      t.integer   "theme_id",             :limit => 10
      t.integer   "wallpaper_id",             :limit => 10
      t.string    "backgroundcolor",   :limit => 6,  :default => "FFFFFF"
      t.string    "fontcolor",   :limit => 6,  :default => "NULL"
      t.string    "transparency",   :limit => 6,  :default => "false"
      t.string    "wallpaperposition",   :limit => 6,  :default => "center"
      t.string    "record_sts",   :limit => 4,  :default => "ACTV"
      t.timestamps
    end
  end

  def self.down
    drop_table :styles
  end
end
