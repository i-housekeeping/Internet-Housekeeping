class StylesController < ApplicationController
 
  protect_from_forgery :only => [:create, :destroy]
  
  # GET /styles
  # GET /styles.xml
  def index
    @styles = Style.find(:all)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @styles }
    end
  end

  # GET /styles/1
  # GET /styles/1.xml
  def show
    @style = Style.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @style }
    end
  end

  # GET /styles/new
  # GET /styles/new.xml
  def new
    @style = Style.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @style }
    end
  end

  # GET /styles/1/edit
  def edit
    @style = Style.find(params[:id])
  end

  # POST /styles
  # POST /styles.xml
  def create
    @style = Style.new(params[:style])

    respond_to do |format|
      if @style.save
        flash[:notice] = 'Style was successfully created.'
        format.html { redirect_to(@style) }
        format.xml  { render :xml => @style, :status => :created, :location => @style }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @style.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /styles/1
  # PUT /styles/1.xml
  def update
   @style = Style.find(current_user.style.id)

    respond_to do |format|
      styles_map(params)
      if (params[:what] == 'appearance' && @style.update_attributes(params[:style]))
        #flash[:notice] = 'Style was successfully updated.'
        format.html {render :text=>"{success:true}", :layout=>false  }
        format.xml  { head :ok }  
      else
        format.html { render :text=>"{success:true}", :layout=>false }
        format.xml  { render :xml => @style.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /styles/1
  # DELETE /styles/1.xml
  def destroy
    @style = Style.find(current_user.styles[0].id)
    @style.destroy

    respond_to do |format|
      format.html { redirect_to(styles_url) }
      format.xml  { head :ok }
    end
  end
  
  private
  
  def styles_map(params)
        
    params[:style] ={
              :theme_id =>params[:theme],
              :wallpaper_id=>params[:wallpaper],
              :backgroundcolor=>params[:backgroundcolor],
              :fontcolor=>params[:fontcolor],
              :transparency=>params[:transparency],
              :wallpaperposition=>params[:wallpaperposition]
    }
  end
end
