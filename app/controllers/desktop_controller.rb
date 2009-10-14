require 'zlib'
require 'stringio'

class DesktopController < ApplicationController
  
  protect_from_forgery :only => [:create, :destroy]
  before_filter :require_user
  
   def download
    send_file "#{RAILS_ROOT}/lib/install/homeagentsetup.exe", :type=>"application/exe"
   end

  
  def index   
    #current_user = self.current_user
    logger.warn "current user id #{current_user.id}"
    
    styles = {
              :themefile=>current_user.style.theme.path_to_file,
              :wallpaperposition=>current_user.style.wallpaperposition,
              :wallpaperid=>current_user.style.wallpaper_id,
              :wallpapername=>current_user.style.wallpaper.name,
              :backgroundcolor=>current_user.style.backgroundcolor,
              :wallpaperfile=>current_user.style.wallpaper.path_to_file,
              :themeid=>current_user.style.theme_id,
              :transparency=>current_user.style.transparency,
              :fontcolor=>current_user.style.fontcolor,
              :themename=>current_user.style.theme.name
    }
    @loaded_js = Hash.new
    @loaded_js[:platform] = Appmodule.find(:first, :conditions=>{:moduleId=>"platform"}).appfiles.each{|item|  
                                          item.file_type == 'javascript' && item.record_sts =='ACTV' }.sort{|x,y| x.id<=>y.id}
                                            
    @loaded_js[:app] = Array.new
    @loaded_js[:system] = String.new
    @loaded_js[:core] = String.new
    modules = Array.new
    
    # should be a ruleby which will configure the modules like
    # current_user, :u, u.role == 'admin' and u.location == 'em hamohsvaot'
    # do
    #  modules (list of modules) = 1,2,3 and platform and etc. 
    # end
    
    current_user.role.appmodules.each{|item|  
                  modules<<item.moduleName if item.record_sts == 'ACTV'
                  @loaded_js[:app] << item if (item.moduleType == 'app' && item.record_sts == 'ACTV')
                  item.appfiles.each{|itm|  
                              if itm.file_type == 'javascript' and (item.moduleType != 'app')
                                   File.open("#{RAILS_ROOT}/public/javascripts/housekeeping/#{itm.path}#{itm.name}", "r") { |f| 
                                           @loaded_js[:system] += f.read + "\n"  if item.moduleType == 'system' 
                                           @loaded_js[:core] += f.read + "\n"  if item.moduleType == 'core'
                                    }
                              end
                             }
                  }
   
    logger.warn "Loaded javascripts : #{modules.to_yaml}"
    launchers = Hash.new
    launchers_db = Launcher.find(:all)
    launchers_db.each{|item|  
                            launchers[item.name] = Array.new 
                            item.appmodules.each{|itm| 
                                if itm.record_sts == 'ACTV'
                                  launchers[item.name] << itm.moduleId 
                                end
                            } unless item.appmodules.nil?}

    user = {
            :email=>current_user.email,
            :id=>current_user.id,
            :totalDuration=>"12226638",
            :isAdmin=>0,
            :group=>current_user.role.id,
            :first=>current_user.role.title,
            :domain=>current_user.domain,
            :last=>"",
            :lastSessionDuration=>"0",
            :isGuest=>1
    }
   
   
    @return_data ||= Hash.new()
    @return_data[:success] = "true"
    @return_data[:config]={
                            :localmode=>0,
                            :registry=>"",
                            :ip=>request.remote_ip,
                            :version=>"599",
                            :env=>"",
                            :styles=>styles,
                            :modules=>modules,
                            :launchers=>launchers,
                            :user=>user,
                            :dip=>1300174509            
                        }
    
    @return_data[:loaded_js] = @loaded_js
    
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @return_data }
      format.json { render :json => @return_data}
      format.js { render :js => "#{params[:jsoncallback]}(#{@return_data.to_json});" }
    end
  end

 
  def on_demand ()
    appmodule = Appmodule.find(:first, :conditions=>{:moduleId => params[:moduleId]}, :order=>"id DESC")
    file_src = ""
    appmodule.appfiles.sort{|x,y| x.id<=>y.id}.each{|appfile| 
           if appfile.file_type == 'javascript'
              File.open("#{RAILS_ROOT}/public/javascripts/housekeeping/#{appfile.path}#{appfile.name}", "r"){ |f| file_src += f.read.strip }
           end
     }
     
     respond_to do |format|
      format.html {render :text=> file_src}
      format.xml  { render :xml => file_src }
      format.json { render :json => file_src}
      format.js { render :js => "#{params[:jsoncallback]}(#{file_src.to_json});" }
    end
  end
  
  def preferencies
    return_data = Hash.new
    images = Array.new
    
    case params[:what]
      when 'wallpapers' then 
        images = Wallpaper.find(:all) 
      when 'themes' then
        images = Theme.find(:all)    
    end 
    
    return_data[:images] = images.collect{|image| 
               {
               :id=>image.id,
               :name=>image.name,  
               :pathtothumbnail=>image.path_to_thumbnail,
               :pathtofile=>image.path_to_file
               }
          }
          
    render :text=>return_data.to_json , :layout=>false
  end
  
  def connect 
    # params: task, moduleId, what 
    return  if(params[:moduleId].nil? && params[:task].nil? && params[:what].nil?)
   
    # general task should be mapped int this controller like src load
    case params[:task]
      when 'on-demand' then params[:action]='on_demand'
      when 'remote-load' then params[:action]='on_demand'
      when 'load' then params[:action]= 'preferencies'
    # each module can add additional paramters which are relevant for the specific controller where additonal params are actions
    else
      params[:controller] = params[:moduleId]
      params[:action]=params[:task]   
    end
   
    request.env["REQUEST_METHOD"] = "POST"
    redirect_to :controller=> params[:controller] , 
                :action=>params[:action],
                :params=>params,
                :request=>request
                
  end
  
   def sendmail
    params[:from] = "i.housekeeping@gmail.com"
    UserNotifier.deliver_customeremail(params) 
    
    respond_to do |format|
      format.html {
        render :text=>"{success:true,
                        notice:'Mail sent sucessfully ' }", :layout=>false
      }
      format.xml  { head :ok }
    end
    
  end
  
  private 
  
  def gzip(data)
    io = StringIO.new
    gz = Zlib::GzipWriter.new(io)
    gz.write data
    gz.close
    io.string
  end

  def gunzip(gzip_data)
    io = StringIO.new(gzip_data)
    gz = Zlib::GzipReader.new(io)
    data = gz.read
    gz.close
    data
  end
end
