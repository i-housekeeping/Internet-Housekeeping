class UserNotifier < ActionMailer::Base
  def signup_notification(user)
    setup_email(user)
    @subject    += ' - Account Signup  [please do not reply]'
    @body[:url]  = "http://moneykeeping.heroku.com"
  end
  
  def activation(user)
    setup_email(user)
    @subject    += ' - Account Activation  [please do not reply]'
    @body[:url]  = "http://moneykeeping.heroku.com"
  end
  
  def forgot_password(user)
    setup_email(user)
    @subject    += ' - Change Password [please do not reply]'
    @body[:url]  = "http://moneykeeping.heroku.com/authorize/reset_password/#{user.perishable_token}" 
  end

  def reset_password(user)
    setup_email(user)
    @subject    += ' - Password Reset [please do not reply]'
  end
  
  def customeremail(params)
      @recipients  = params[:to_company]
      @from        = params[:from]
      @subject     = params[:subject]
      @sent_on     = Time.now
      @body        = params[:email_editor]
      @content_type= "text/html"

  end
  
  protected
  def setup_email(user)
    @recipients  = "#{user.email}"
    @from        = "i.housekeeping@gmail.com"
    @subject     = "Welcome to Internet Housekeeping"
    @sent_on     = Time.now
    @body[:user] = user
  end
end
