module DesktopHelper
  
  def compress_js(source)
        jsmin_path = "#{RAILS_ROOT}/vendor/plugins/asset_packager/lib"
        tmp_path = "#{RAILS_ROOT}/tmp/#{@target}_packaged"
      
        # write out to a temp file
        File.open("#{tmp_path}_uncompressed.js", "w") {|f| f.write(source) }
      
        # compress file with JSMin library
        `ruby #{jsmin_path}/jsmin.rb <#{tmp_path}_uncompressed.js >#{tmp_path}_compressed.js \n`

        # read it back in and trim it
        result = ""
        File.open("#{tmp_path}_compressed.js", "r") { |f| result += f.read.strip }
              
        # delete temp files if they exist
        File.delete("#{tmp_path}_uncompressed.js") if File.exists?("#{tmp_path}_uncompressed.js")
        File.delete("#{tmp_path}_compressed.js") if File.exists?("#{tmp_path}_compressed.js")
        
        result
   end
end
