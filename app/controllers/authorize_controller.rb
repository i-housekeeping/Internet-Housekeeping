class AuthorizeController < ApplicationController
  
  layout "authorize"
  protect_from_forgery :only => [:create,  :destroy]
  
  @@redirect_host = 'moneykeeping.heroku.com'
  
  # say something nice, you goof!  something sweet.
  def index
    redirect_to(:action => 'signup') unless logged_in? || User.count > 0
  end
  
  def roles
    @roles ||= Role.find( :all, 
                         :select=>"id,title,description",
    :conditions=>"record_sts='ACTV'")
    
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @roles }
      format.json { render :json => @roles}
    end
  end
  
  
  def welcome
    #TODO something here  
  end
  
  def user_list
    
    users ||= User.find(:all, :conditions=>{:domain=>params[:domain]}) unless params[:domain].nil?
    users ||= User.find(:all) if params[:domain].nil?
    
    users_list = users.map {|user| {
        :id => user.id,
        :login => user.login,
        :email => user.email,
        :role_id => user.role.id,
        :role => user.role.title,
        :domain => user.domain
      } }
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => users_list }
      format.json { render :json => users_list }
    end
  end
  
  def login
   redirect_to :controller=>'user_session' ,:action => 'new'
  end
  
  
  def signup
    return unless request.post?
    @user = User.new( :login=>params[:login],
                     :email=>params[:email],
                     :password=>params[:password], 
                     :password_confirmation=>params[:password_confirmation],
                     :domain=>(params[:domain].nil? ? params[:login] : params[:domain]) )
   
    @user.role = Role.find(:first, :conditions=>"title = 'guest'")
    @user.style = Style.find(:first)
    
    if(@user.save)
       #TODO change the role
      
      
      render :text=>"{success:true,
                      url:'/authorize/welcome',
                      notice:'Thanks for signing up!'}", :layout=>false
      
    else
      notice = ''
      @user.errors.each_full{|msg| notice+= msg + " </br>" }
      render :text=>"{success:false,
                      url:'/authorize/signup',
                      notice:'#{notice}'}", :layout=>false
    end
  end
  
  def update
    
    @reply_remote = Hash.new()
    
    unless params[:user].nil?
      user = ActiveSupport::JSON.decode(params[:user]).rehash 
      @user = User.find(user["id"])
      
      user[:role_id]= user["role"]
      user.delete("role")
      user.delete("active")
      @user.update_attributes(user)
      
      @reply_remote[:success]= true
      @reply_remote[:notice] = 'User Account was successfully updated.'
    else
      @reply_remote[:success]= false
      @reply_remote[:notice] = 'User Account update failed.'
    end
    
    respond_to do |format|
      format.json { render :json=> @reply_remote, :layout=>false  }
    end
    
  end
  
  def sendemail
    UserNotifier.deliver_customeremail(params)
  end
  
  def remove
    user = ActiveSupport::JSON.decode(params[:user]).rehash
    @user = User.find(user["id"])
    
    @reply_remote = Hash.new()
    
    unless @user.nil?
      
      if user["active"].eql? "Active"
        @user[:activated_at]= ''
      else
        @user[:activated_at]= Time.now.strftime("%Y-%m-%d %H:%M:%S") 
      end
      
      
      @user.save
      @reply_remote[:success]= true
      @reply_remote[:notice] = 'User Account was successfully hold.'
    else
      @reply_remote[:success]= false
      @reply_remote[:notice] = 'User Account was successfully hold.'
    end
    
    respond_to do |format|
      format.json { render :json=> @reply_remote, :layout=>false  }
    end
  end
  
  def logout
    redirect_to :controller=>'user_session' ,:action => 'destroy'
  end
  
  def activate
    @user = User.find_by_activation_code(params[:id])
    if @user and @user.activate
      #self.current_user = @user
      flash[:success] = "true"
      flash[:notice] = "Your account has been activated"    
    else 
      flash[:success] = "false"
      flash[:notice] = "There are some porblems with signup"   
    end
    render :layout=>true
    #redirect_back_or_default(:controller => '/authorize', :action => 'login')
  end
  
  def forgot_password
    return unless request.post?
    if @user = User.find_by_email(params[:email])
      @user.forgot_password
      @user.save
      render :text=>"{success:true,
                      url:'/authorize/login',
                      notice:'A password reset link has been sent to your email address'}", :layout=>false
    else
      render :text=>"{success:false,
                      url:'/authorize/login',
                      notice:'Could not find a user with that email address'}", :layout=>false
    end
  end
  
  def reset_password
    return if params[:id].nil?
    @user = User.find_using_perishable_token(params[:id])
    raise if @user.nil?
    return if @user unless params[:password]
    if (params[:password] == params[:password_confirmation])
      @user.password_confirmation = params[:password_confirmation]
      @user.password = params[:password]      
      @user.reset_password
      #@user.login = params[:login] unless params[:login].nil?
      #@user.email = params[:email] unless params[:email].nil?  
      
      if(@user.save)
        render :text=>"{success:true,
                      url:'/authorize/login',
                      notice:'Thanks for updating details!'}", :layout=>false
      else
        notice = ''
        @user.errors.each_full{|msg| notice+= msg + " </br>" }
        render :text=>"{success:false,
                      url:'/authorize/signup',
                      notice:'#{notice}'}", :layout=>false
      end
      #flash[:notice] = current_user.save ? "Password reset" : "Password not reset" 
      #flash[:success] = "true"
    else
      #flash[:success] = "false"
      #flash[:notice] = "Password mismatch" 
    end 
    #render :layout=>true
  rescue
    logger.error "Invalid Reset Code entered" 
    render :text=>"{success:false,
                      url:'/authorize/login',
                      notice:'Sorry - That is an invalid password reset code. Please check your code and try again. (Perhaps your email client inserted a carriage return?'}", :layout=>false
  end
  
  def require_https
    redirect_to :protocol => "https://" unless (request.ssl? or local_request?)
  end
  
end
