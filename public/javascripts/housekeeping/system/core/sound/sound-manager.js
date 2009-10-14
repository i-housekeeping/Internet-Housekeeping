/*
 * Comet Desktop
 * Copyright (c) 2008 - David W Davis, All Rights Reserved
 * xantus@cometdesktop.com     http://xant.us/
 * http://code.google.com/p/cometdesktop/
 * http://cometdesktop.com/
 *
 * License: GPL v3
 * http://code.google.com/p/cometdesktop/wiki/License
 *
 * Comet Desktop is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License
 *
 * Comet Desktop is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Comet Desktop.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Comet Desktop is a fork of qWikiOffice Desktop v0.7.1
 *
 * -----
 * 
 * Sound Manager 2
 * Copyright (c) 2007, Scott Schiller (schillmania.com)
 * All rights reserved.
 *
 * http://www.schillmania.com/projects/soundmanager2/
 *
 * License: BSD
 * http://www.schillmania.com/projects/soundmanager2/doc/resources/#licensing
 * 
 * Thanks Scott!
 *
 * -----
 *
 * Ext JS Library
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 *
 * http://extjs.com/license
 *
 */

Ext.app.SoundManager = Ext.extend(Ext.app.Module, {

    moduleType : 'core',
    moduleId : 'sound-manager',
    disabled: true,
    settings: {
        muted: false,
        volume: 60
    },

    size: {
        width: 130,
        height: 230
    },
    
    init : function() {
        this.launcher = {
            handler: this.createWindow,
            scope: this,
            iconCls: 'sound-manager-mute-icon',
            scope: this,
            text: 'Volume Control',
            tooltip: '<b>Volume Control</b><br />Adjust sound properties'
        };
//        app.soundManager = this;
        app.onReady(this.onReady,this);
        this.subscribe( '/desktop/sound/play', this.playSoundEvent, this );
        this.subscribe( '/desktop/sound/volume', this.setVolumeEvent, this );
    },

    createWindow: function() {
        var win = app.desktop.getWindow('sound-manager-win');
        if (win) {
            if ( !win.ishidden )
                return win.hide();
            win.setPosition(app.desktop.getViewWidth()-this.size.width,app.desktop.getViewHeight()-this.size.height);
            if ( this.disabled )
                win.body.mask();
            else
                win.body.unmask();
        } else {
            //s.setPosition(app.desktop.getViewWidth()-s.getSize().width,app.desktop.getViewHeight()-s.getSize().height);
            var x = app.desktop.getViewWidth() - this.size.width;
            var y = app.desktop.getViewHeight() - this.size.height;
            this.slider = new Ext.Slider({
                height: 150,
                vertical: true,
                minValue: 0,
                maxValue: 100,
                value: this.settings.volume,
                listeners: {
                    change: {
                        fn: this.setVolume,
                        scope: this
                    },
                    dragend: {
                        fn: this.saveVolume,
                        scope: this
                    }
                }
            });
            win = app.desktop.createWindow({
                title: 'Volume',
                id: 'sound-manager-win',
                iconCls: 'sound-manager-icon',
                closeAction: 'hide',
                notifyButton: 'sound-manager',
                animateToNotifyButton: true,
                maximizable: false,
                minimizable: false,
                collapsible: false,
                width: this.size.width,
                height: this.size.height,
                x: x,
                y: y,
                resizable: false,
                layout: 'border',
                border: false,
                stateId: 'ext-foo',
                items: [
                    {
                        region: 'center',
                        bodyStyle: 'padding:10px;padding-left:45px',
                        items: [
                            this.slider,
                            new Ext.form.Checkbox({
                                name: 'mute-volume',
                                hideLabel: true,
                                boxLabel:'Mute',
                                checked: this.settings.muted,
                                handler: this.muteClicked,
                                scope: this
                            })
                        ]
                    }
                ]
            });
            // keep the volume control in the bottom right on resize
	        Ext.EventManager.onWindowResize(function() {
                var w = app.desktop.getWindow('sound-manager-win');
                w.setPosition(app.desktop.getViewWidth()-this.size.width,app.desktop.getViewHeight()-this.size.height);
            }, this, {delay:200});

            if ( this.disabled )
                win.body.mask();
        }
        win.show();
    },
    
    onReady: function() {
        // XXX adjust this if sm2 fails to load
        // TODO add an init retry to sm2
        this.loadManager.defer( 1000, this );
        this.settings = Ext.state.Manager.get( 'volume-settings', this.settings );
    },

    loadManager: function() {
        log('loading sound manager 2');
        this.soundManager = window.soundManager = new SoundManager('javascripts/housekeeping/system/core/sound/');
        this.soundManager.defaultOptions.volume = this.settings.volume;
        this.soundManager.onerror = this.onError.createDelegate( this );
        this.soundManager.onload = this.onLoad.createDelegate( this );
        app.desktop.addNotificationButton('sound-manager', false);
    },

    onLoad: function() {
        this.publish( '/desktop/sound/manager/loaded', this.settings );
        if ( this.trayButton ) {
            if ( this.settings.muted )
                this.trayButton.setIconClass('sound-manager-mute-icon');
            else
                this.trayButton.setIconClass('sound-manager-icon');
        }        
        this.disabled = false;
        // if the volume window is open, remove the mask
        var win = app.desktop.getWindow('sound-manager-win');
        if ( win )
            win.body.unmask();
    },

    onError: function() {
        this.publish( '/desktop/sound/manager/error', { message: 'Sound Manager 2 failed to load' } );
        log('flash sound manager failed to load');
        if ( this.trayButton )
            this.trayButton.setIconClass('sound-manager-error-icon');
        this.disabled = true;
        var win = app.desktop.getWindow('sound-manager-win');
        if (win)
            win.body.mask();
    },

    playSoundEvent: function( obj ) {
        // fired from /desktop/sound/play
        this.playSound( obj.file );
    },

    playSound: function(url) {
        this.publish( '/desktop/sound/startplay', { url: url, volume: this.settings.volume, muted: this.settings.muted } );
        if ( this.disabled )
            return;
        if ( !this.soundManager )
            return log('sound manager not found');
        //if ( this.settings.muted )
        //    return;
        this.currentId = Ext.id(null,'sound');
        var data = [];
        var opts = {
            id: this.currentId,
            url: url,
            volume: this.settings.volume,
            autoPlay: true,
            onload: this.soundLoaded.createDelegate( this, data, 0 ),
            onid3: this.soundInfo.createDelegate( this, data, 0 )
        };
        data.push( this.soundManager.createSound( opts ) );
        //sound.onfinish = this.soundFinished.createDelegate( this );
        // onload, onplay, onpause, onresume, onstop, onjustbeforefinish,
        // onbeforefinishcomplete, onbeforefinish, onid3,
        // whileloading, whileplaying
    },

    soundInfo: function(o) {
        this.publish( '/desktop/sound/meta', o );
//        log('id3:'+Ext.encode(o.id3));
        /* XXX example code for an mp3 player, subscribe to /desktop/sound/meta and use /desktop/notify
        var song = sound.id3.songname;
        if ( o.id3.artist )
            song = o.id3.artist + ( song ? ' - ' + song : '' );
        if ( song && song != '' )
            this.publish('/desktop/notify',{ html: song, title: 'Now Playing', iconCls: 'sound-manager-icon' });
        */
    },

    soundLoaded: function(o) {
        this.publish( '/desktop/sound/loaded', o );
        if ( this.settings.muted )
            this.soundManager.mute( this.currentId );
        else
            this.soundManager.unmute( this.currentId );
    },
    
    
    mute: function(mute) {
        if ( mute ) {
            this.settings.muted = true;
            if ( this.currentId )
                this.soundManager.mute( this.currentId );
            if ( this.trayButton )
                this.trayButton.setIconClass('sound-manager-mute-icon');
        } else {
            this.settings.muted = false;
            if ( this.currentId )
                this.soundManager.unmute( this.currentId );
            if ( this.trayButton )
                his.trayButton.setIconClass('sound-manager-icon');
        }
        this.saveSettings();
    },


    muteClicked: function(o,mute) {
        this.publish( '/desktop/sound/volume', { muted: mute } );
    },
    
    setVolume: function(o,vol) {
        // fired by moving the slider
        if ( this.timer )
            window.clearTimeout( this.timer );
        this.timer = this.publish.defer( 75, this, [ '/desktop/sound/volume', { volume: vol } ] );
    },

    setVolumeEvent: function(e) {
        // fired by /desktop/sound/volume
        if ( e.hasOwnProperty( 'volume' ) ) {
            this.settings.volume = e.volume;
            if ( this.currentId )
                this.soundManager.setVolume( this.currentId, e.volume );
            if ( this.slider )
                this.slider.setValue( e.volume );
        }
        if ( e.hasOwnProperty( 'muted' ) )
           this.mute( e.muted );
    },

    saveVolume: function() {
        // fired when the slider is done dragging
        // XXX keep this?
//        this.playSound('resources/sounds/click-low.mp3');
        this.saveSettings();
    },
    
    saveSettings: function() {
        Ext.state.Manager.set( 'volume-settings', this.settings );
    }


});

app.register('Ext.app.SoundManager');

