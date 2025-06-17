---
title: "Getting GNOME to recognize your Nexus One as a portable music player"
description: "Programs like Banshee and Rhythmbox will automatically recognize when a portable music player (e.g. an iPod, a cell phone that can play music, or one..."
pubDate: 2010-01-25
updatedDate: 2010-12-12
---

Programs like [Banshee](http://banshee-project.org/) and [Rhythmbox](http://projects.gnome.org/rhythmbox/) will automatically recognize when a portable music player (e.g. an iPod, a cell phone that can play music, or one of the many flash-memory music players) is plugged into the computer and let you manage the music on the portable device and synchronize it with your local music library.

On Linux, all of this magic happens via [HAL](http://freedesktop.org/wiki/Software/hal). Specifically, the file `/usr/share/hal/fdi/information/10freedesktop/10-usb-music-players.fdi` (on Ubuntu 9.10 Karmic) contains the rules to recognize portable music players and define their capabilities. Since the Nexus One is quite recent, it's not listed in that file.

To teach HAL about the Nexus One, create `/etc/hal/fdi/information/nexus-one.fdi` with the following contents:

```
<?xml version="1.0" encoding="UTF-8"?>

<deviceinfo version="0.2">
 <device>

   <match key="info.category" string="storage">

     <!-- USB Mass Storage devices that are music players -->
     <match key="@storage.originating_device:info.subsystem" string="usb">

       <!-- Google, Inc. -->
       <match key="@storage.originating_device:usb.vendor_id" int="0x18d1">
         <!-- Nexus One -->
         <match key="@storage.originating_device:usb.product_id" int="0x4e12">
           <addset key="portable_audio_player.access_method.protocols" type="strlist">storage</addset>
           <append key="portable_audio_player.output_formats" type="strlist">audio/x-ms-wma</append>
           <append key="portable_audio_player.output_formats" type="strlist">audio/3gpp</append>
           <append key="portable_audio_player.output_formats" type="strlist">audio/mp4</append>
           <append key="portable_audio_player.output_formats" type="strlist">audio/aac</append>
           <append key="portable_audio_player.output_formats" type="strlist">audio/vnd.rn-realaudio</append>
           <append key="portable_audio_player.output_formats" type="strlist">audio/x-midi</append>
           <append key="portable_audio_player.output_formats" type="strlist">audio/x-wav</append>
           <append key="portable_audio_player.output_formats" type="strlist">application/ogg</append>
           <append key="portable_audio_player.audio_folders" type="strlist">Music/</append>
           <!-- common keys set in /usr/share/hal/fdi/information/10freedesktop/10-usb-music-players.fdi -->
           <merge key="portable_audio_player.storage_device" type="copy_property">info.udi</merge>
           <addset key="info.capabilities" type="strlist">portable_audio_player</addset>
           <merge key="info.category" type="string">portable_audio_player</merge>
           <append key="portable_audio_player.output_formats" type="strlist">audio/mpeg</append>
         </match>
       </match>

     </match>
   </match>

 </device>
</deviceinfo>
```