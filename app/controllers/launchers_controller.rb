class LaunchersController < ApplicationController
  # GET /launchers
  # GET /launchers.xml
  def index
    @launchers = Launcher.find(:all)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @launchers }
    end
  end

  # GET /launchers/1
  # GET /launchers/1.xml
  def show
    @launcher = Launcher.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @launcher }
    end
  end

  # GET /launchers/new
  # GET /launchers/new.xml
  def new
    @launcher = Launcher.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @launcher }
    end
  end

  # GET /launchers/1/edit
  def edit
    @launcher = Launcher.find(params[:id])
  end

  # POST /launchers
  # POST /launchers.xml
  def create
    @launcher = Launcher.new(params[:launcher])

    respond_to do |format|
      if @launcher.save
        flash[:notice] = 'Launcher was successfully created.'
        format.html { redirect_to(@launcher) }
        format.xml  { render :xml => @launcher, :status => :created, :location => @launcher }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @launcher.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /launchers/1
  # PUT /launchers/1.xml
  def update
    @launcher = Launcher.find(params[:id])

    respond_to do |format|
      if @launcher.update_attributes(params[:launcher])
        flash[:notice] = 'Launcher was successfully updated.'
        format.html { redirect_to(@launcher) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @launcher.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /launchers/1
  # DELETE /launchers/1.xml
  def destroy
    @launcher = Launcher.find(params[:id])
    @launcher.destroy

    respond_to do |format|
      format.html { redirect_to(launchers_url) }
      format.xml  { head :ok }
    end
  end
end
