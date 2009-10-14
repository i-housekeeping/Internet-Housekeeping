module AuthorizeHelper
  
  # Stylesheets 
  # -----------
  
  def hskpng_authorize_stylesheet_tags
      sources = %w(/stylesheets/ext-all /javascripts/housekeeping/authorize/authorize /javascripts/housekeeping/resources/themes/xtheme-slate/css/xtheme-slate)  
      sources.collect do |source|
        source = "#{source}.css"
        content_tag("link","",{"rel"=>"Stylesheet","type"=>"text/css",
                              "media"=>"screen","href"=>source})
        end.join("\n")
   end
  
   def hskpng_authorize_package_css
     if RAILS_ENV == "production"
       stylesheet_link_tag "authorize_packaged.css"
     else
       hskpng_authorize_stylesheet_tags
     end
   end
  
   # Javascripts 
   # -----------
     
   def hskpng_authorize_javascript_tags
    sources_auth = %w(ext-base ext-all-debug housekeeping/authorize/authorize housekeeping/authorize/cookies housekeeping/lib/CSSProxy)  
    sources_auth.collect do |source|
      source = javascript_path(source)
      content_tag("script","",{"type"=>"text/javascript","src"=>source})
      end.join("\n")
   end
   
   def hskpng_authorize_package_js
    if RAILS_ENV == "production"
      javascript_include_tag "authorize_packaged"
    else
      hskpng_authorize_javascript_tags
    end
   end
   
end