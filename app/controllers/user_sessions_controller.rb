class UserSessionsController < ApplicationController
  before_filter :require_no_user, :only => [:new, :create]
  before_filter :require_user, :only => :destroy
  
  protect_from_forgery :only => [:dummy]
  
  layout "authorize"
  
  @@redirect_host = 'moneykeeping.heroku.com'
  
  def new
    @user_session = UserSession.new
  end
  
  def create
    params[:user_session] = Hash.new
    params[:user_session][:password] = params[:password]
    params[:user_session][:login] = params[:login]
    params[:user_session][:remember_me] = params[:remember_me].nil? ? 0 : 1
    
    @user_session = UserSession.new(params[:user_session])
    if @user_session.save
     render :text=>"{success:true,
                      url:'http://#{@@redirect_host}',
                      notice:'Logged in successfully'}", :layout=>false
    else
      notice = ''
      @user_session.errors.each_full{|msg| notice+= msg + " </br>" }
      render :text=>"{success:false,
                      notice:'#{notice}'}", :layout=>false
    end
  end
  
  def destroy
    current_user_session.destroy
    render :text=>"{success:true,
                      url:'/',
                      notice:'You have been logged out.'}", :layout=>false
  end
  
  def dummy
    
  end
  
end
