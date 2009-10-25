# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  
  # CSS collection of sources
  # -------------------------
  
  def hskpng_desktop_stylesheet_tags
    sources = %w(/stylesheets/ext-all /stylesheets/desktop)
    
    sources_modules = %w(about admin-modules bookmarks notepad qo-preferences tasks collaborate my-google bloney)
    sources_modules.collect do |source|
      sources << "/javascripts/housekeeping/system/modules/#{source}/#{source}"
    end
    
    sources_theme = %w(xtheme-slate) 
    sources_theme.collect do |source|
      sources << "/javascripts/housekeeping/resources/themes/#{source}/css/#{source}"
    end
    sources << "/javascripts/housekeeping/system/core/sound/sound-manager" 
    
    sources.collect do |source|
      source = stylesheet_path("#{source}.css")
      content_tag("link","",{"rel"=>"Stylesheet","type"=>"text/css",
                              "media"=>"screen","href"=>"http://localhost:3001"+source})
    end.join("\n")
  end
 
  def hskpng_desktop_package_css
    if RAILS_ENV == "production"
      stylesheet_link_tag "desktop_packaged"
    else
      hskpng_desktop_stylesheet_tags
    end
  end
  
  # JavaScript Collection of sources
  # --------------------------------
  
  def ext_javascript_tags 
    sources = %w(ext-base ext-all-debug) 
    sources.collect do |source|
      source = javascript_path(source)
      content_tag("script","",{"type"=>"text/javascript","src"=>source})
    end.join("\n")
  end
  
  def hskpng_core_javascript_tags
      sources = %w(Window StartMenu TaskBar Desktop App Module DesktopConfig Shortcut)  
      sources.collect do |source|
        #source << "-min" if RAILS_ENV == "production"
        source = javascript_path("housekeeping/system/core/"+source)
        content_tag("script","",{"type"=>"text/javascript","src"=>source})
      end.join("\n")
  end
  
  def hskpng_libs_javascript_tags
      sources = %w(Ext.ux.AboutWindow Ext.ux.DesktopNewWin miframe-min housekeeing_infra)  
      sources.collect do |source|
        #source << "-min" if RAILS_ENV == "production"
        source = javascript_path("housekeeping/system/libs/"+source)
        content_tag("script","",{"type"=>"text/javascript","src"=>source})
      end.join("\n")
  end
  
#  def google_javascript_tags 
#      sources = %w(http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAA1u4IWiwm4a4GMTWkXxLoRRi_j0U6kJrkFvY4-OX2XYmEAa76BSlsCk3366dQm7VxR6QL5Xo_Z5CEQ http://www.google.com/jsapi )    
#      sources.collect do |source|
#        content_tag("script","",{"type"=>"text/javascript","src"=>source})
#      end.join("\n")
#  end
  
  def hskpng_debug_javascript_tags 
      sources = %w(debug)  
      sources.collect do |source|
        #source << "-min" if RAILS_ENV == "production"
        source = javascript_path("housekeeping/lib/"+source)
        content_tag("script","",{"type"=>"text/javascript","src"=>source})
      end.join("\n")
  end
  
  def hskpng_modules_javascript_tags
      sources = %w(about notepad qo-preferences)  
      sources.collect do |source|
        #source << "-min" if RAILS_ENV == "production"
        source = javascript_path("housekeeping/system/modules/#{source}/"+source)
        content_tag("script","",{"type"=>"text/javascript","src"=>source})
      end.join("\n")
  end
  
end
