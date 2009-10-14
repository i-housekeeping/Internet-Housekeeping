class AppmodulesController < ApplicationController
  # GET /appmodules
  # GET /appmodules.xml
  def index
    @appmodules = Appmodule.find(:all)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @appmodules }
    end
  end

  # GET /appmodules/1
  # GET /appmodules/1.xml
  def show
    @appmodule = Appmodule.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @appmodule }
    end
  end

  # GET /appmodules/new
  # GET /appmodules/new.xml
  def new
    @appmodule = Appmodule.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @appmodule }
    end
  end

  # GET /appmodules/1/edit
  def edit
    @appmodule = Appmodule.find(params[:id])
  end

  # POST /appmodules
  # POST /appmodules.xml
  def create
    @appmodule = Appmodule.new(params[:appmodule])

    respond_to do |format|
      if @appmodule.save
        flash[:notice] = 'Appmodule was successfully created.'
        format.html { redirect_to(@appmodule) }
        format.xml  { render :xml => @appmodule, :status => :created, :location => @appmodule }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @appmodule.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /appmodules/1
  # PUT /appmodules/1.xml
  def update
    @appmodule = Appmodule.find(params[:id])

    respond_to do |format|
      if @appmodule.update_attributes(params[:appmodule])
        flash[:notice] = 'Appmodule was successfully updated.'
        format.html { redirect_to(@appmodule) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @appmodule.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /appmodules/1
  # DELETE /appmodules/1.xml
  def destroy
    @appmodule = Appmodule.find(params[:id])
    @appmodule.destroy

    respond_to do |format|
      format.html { redirect_to(appmodules_url) }
      format.xml  { head :ok }
    end
  end
end
