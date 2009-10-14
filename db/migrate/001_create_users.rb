class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.integer   "role_id",             :limit => 10
      t.integer   "style_id",             :limit => 10
      t.string    "login"                     
      t.string    "email"                    
      t.string    "domain",                     :limit => 20
      t.string    "domain_description"
      t.string    "crypted_password"            
      t.string    "password_salt"               
      t.string    "persistence_token"  
      t.string    "single_access_token"
      t.string    "perishable_token"
      t.integer   "login_count",         :null => false, :default => 0 
      t.integer   "failed_login_count",  :null => false, :default => 0 
      t.datetime  "last_request_at"                                    
      t.datetime  "current_login_at"                                   
      t.datetime  "last_login_at"                                      
      t.string    "current_login_ip"                                   
      t.string    "last_login_ip"                                      
      t.string    "record_sts",   :limit => 4,  :default => "ACTV"
      t.datetime  "created_at"                
      t.datetime  "updated_at"    
    end
  end

  def self.down
    drop_table :users
  end
end
