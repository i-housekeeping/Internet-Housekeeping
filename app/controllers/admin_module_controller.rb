class AdminModuleController < ApplicationController
  def fetch
    @appmodules = Appmodule.find(:all)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @appmodules }
      format.json  { render :json => @appmodules }
    end
  end
end
