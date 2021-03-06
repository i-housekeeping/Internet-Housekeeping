# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require(File.join(File.dirname(__FILE__), 'config', 'boot'))

require 'rake'
require 'rake/testtask'
require 'rake/rdoctask'

require 'tasks/rails'

namespace :db do
  desc 'Create YAML test fixtures from data in an existing database.  
  Defaults to development database. Set RAILS_ENV to override.'

  task :extract_fixtures => :environment do
    sql = "SELECT * FROM %s"
    skip_tables = ["schema_info", "sessions"]
    ActiveRecord::Base.establish_connection
    tables = ENV['FIXTURES'] ? ENV['FIXTURES'].split(/,/) : ActiveRecord::Base.connection.tables - skip_tables
    tables.each do |table_name|
      i = "000"
      File.open("#{RAILS_ROOT}/db/#{table_name}.yml", 'w') do |file|
        data = ActiveRecord::Base.connection.select_all(sql % table_name)
        file.write data.inject({}) { |hash, record|
          hash["#{table_name}_#{i.succ!}"] = record
          hash
        }.to_yaml
      end
    end
  end
  
  desc 'Clean fixtures: clean db from all data.  
  Defaults to development database. Set RAILS_ENV to override.'

  task :clean_fixtures => :environment do
    sql = "DROP TABLE %s"
    skip_tables = ["sessions"]
    ActiveRecord::Base.establish_connection
    tables = ENV['FIXTURES'] ? ENV['FIXTURES'].split(/,/) : ActiveRecord::Base.connection.tables - skip_tables
    tables.each do |table_name|
      puts  "Table is #{table_name} data :  #{ActiveRecord::Base.connection.select_all("SELECT * FROM %s" % table_name)}"
      ActiveRecord::Base.connection.delete( sql % table_name)
    end
  end
end
