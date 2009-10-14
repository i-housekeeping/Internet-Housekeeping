class DialogsController < ApplicationController
  # GET /dialogs
  # GET /dialogs.xml
  def index
    @dialogs = Dialog.find(:all)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @dialogs }
    end
  end

  # GET /dialogs/1
  # GET /dialogs/1.xml
  def show
    @dialog = Dialog.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @dialog }
    end
  end

  # GET /dialogs/new
  # GET /dialogs/new.xml
  def new
    @dialog = Dialog.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @dialog }
    end
  end

  # GET /dialogs/1/edit
  def edit
    @dialog = Dialog.find(params[:id])
  end

  # POST /dialogs
  # POST /dialogs.xml
  def create
    @dialog = Dialog.new(params[:dialog])

    respond_to do |format|
      if @dialog.save
        flash[:notice] = 'Dialog was successfully created.'
        format.html { redirect_to(@dialog) }
        format.xml  { render :xml => @dialog, :status => :created, :location => @dialog }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @dialog.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /dialogs/1
  # PUT /dialogs/1.xml
  def update
    @dialog = Dialog.find(params[:id])

    respond_to do |format|
      if @dialog.update_attributes(params[:dialog])
        flash[:notice] = 'Dialog was successfully updated.'
        format.html { redirect_to(@dialog) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @dialog.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /dialogs/1
  # DELETE /dialogs/1.xml
  def destroy
    @dialog = Dialog.find(params[:id])
    @dialog.destroy

    respond_to do |format|
      format.html { redirect_to(dialogs_url) }
      format.xml  { head :ok }
    end
  end
end
