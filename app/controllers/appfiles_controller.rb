class AppfilesController < ApplicationController
  # GET /appfiles
  # GET /appfiles.xml
  def index
    @appfiles = Appfile.find(:all)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @appfiles }
    end
  end

  # GET /appfiles/1
  # GET /appfiles/1.xml
  def show
    @appfile = Appfile.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @appfile }
    end
  end

  # GET /appfiles/new
  # GET /appfiles/new.xml
  def new
    @appfile = Appfile.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @appfile }
    end
  end

  # GET /appfiles/1/edit
  def edit
    @appfile = Appfile.find(params[:id])
  end

  # POST /appfiles
  # POST /appfiles.xml
  def create
    @appfile = Appfile.new(params[:appfile])

    respond_to do |format|
      if @appfile.save
        flash[:notice] = 'Appfile was successfully created.'
        format.html { redirect_to(@appfile) }
        format.xml  { render :xml => @appfile, :status => :created, :location => @appfile }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @appfile.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /appfiles/1
  # PUT /appfiles/1.xml
  def update
    @appfile = Appfile.find(params[:id])

    respond_to do |format|
      if @appfile.update_attributes(params[:appfile])
        flash[:notice] = 'Appfile was successfully updated.'
        format.html { redirect_to(@appfile) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @appfile.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /appfiles/1
  # DELETE /appfiles/1.xml
  def destroy
    @appfile = Appfile.find(params[:id])
    @appfile.destroy

    respond_to do |format|
      format.html { redirect_to(appfiles_url) }
      format.xml  { head :ok }
    end
  end
end
