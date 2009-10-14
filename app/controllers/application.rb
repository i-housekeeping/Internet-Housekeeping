# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.
#require 'ruleby'
#require 'openwfe/engine' 

class ApplicationController < ActionController::Base
  #include Ruleby
  
  before_filter :require_https
  # before_filter :require_https, :only => [:login, :signup, :reset_password] 
  #before_filter :require_http, :except => [:login, :signup, :reset_password] 
  
  helper :all # include all helpers, all the time
  helper_method :current_user_session, :current_user
  
  # See ActionController::RequestForgeryProtection for details
  # Uncomment the :secret if you're not using the cookie session store
  protect_from_forgery # :secret => '81911551b2e4a85e949859a787033d10'
  
  # See ActionController::Base for details 
  # Uncomment this to filter the contents of submitted sensitive data parameters
  # from your application log (in this case, all fields with names like "password"). 
  filter_parameter_logging :password, :password_confirmation
  
  
  def require_https
    redirect_to :protocol => "https://" unless (request.ssl? or local_request?)
  end
  
  def require_http
    redirect_to :protocol => "http://" if (request.ssl?)
  end
  
  private
  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find
  end
  
  def current_user
    return @current_user if defined?(@current_user)
    @current_user = current_user_session && current_user_session.user
  end
  
  def require_user
    unless current_user
      store_location
      flash[:notice] = "You must be logged in to access this page"
      redirect_to new_user_session_url
      return false
    end
  end
  
  def require_no_user
    if current_user
      store_location
      flash[:notice] = "You must be logged out to access this page"
      redirect_to root_url
      return false
    end
  end
  
  def store_location
    session[:return_to] = request.request_uri
  end
  
  def redirect_back_or_default(default)
    redirect_to(session[:return_to] || default)
    session[:return_to] = nil
  end
end
