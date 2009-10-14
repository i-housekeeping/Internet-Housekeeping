class RegistriesController < ApplicationController
  # GET /registries
  # GET /registries.xml
  def index
    @registries = Registry.find(:all)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @registries }
    end
  end

  # GET /registries/1
  # GET /registries/1.xml
  def show
    @registry = Registry.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @registry }
    end
  end

  # GET /registries/new
  # GET /registries/new.xml
  def new
    @registry = Registry.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @registry }
    end
  end

  # GET /registries/1/edit
  def edit
    @registry = Registry.find(params[:id])
  end

  # POST /registries
  # POST /registries.xml
  def create
    @registry = Registry.new(params[:registry])

    respond_to do |format|
      if @registry.save
        flash[:notice] = 'Registry was successfully created.'
        format.html { redirect_to(@registry) }
        format.xml  { render :xml => @registry, :status => :created, :location => @registry }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @registry.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /registries/1
  # PUT /registries/1.xml
  def update
    @registry = Registry.find(params[:id])

    respond_to do |format|
      if @registry.update_attributes(params[:registry])
        flash[:notice] = 'Registry was successfully updated.'
        format.html { redirect_to(@registry) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @registry.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /registries/1
  # DELETE /registries/1.xml
  def destroy
    @registry = Registry.find(params[:id])
    @registry.destroy

    respond_to do |format|
      format.html { redirect_to(registries_url) }
      format.xml  { head :ok }
    end
  end
end
