class CreateRegistries < ActiveRecord::Migration
  def self.up
    create_table :registries do |t|
      t.integer   "user_id",             :limit => 10
      t.string    "name",   :limit => 255
      t.text      "value"
      t.string    "record_sts",   :limit => 4,  :default => "ACTV"
      t.timestamps
    end
  end

  def self.down
    drop_table :registries
  end
end
