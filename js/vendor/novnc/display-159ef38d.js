/*
 * noVNC: HTML5 VNC client
 * Copyright (C) 2012 Joel Martin
 * Licensed under MPL 2.0 (see LICENSE.txt)
 *
 * See README.md for usage and integration instructions.
 */
function Display(t){"use strict";function e(){Util.Debug(">> Display.constructor");var t,e,n,r,i=Util.Engine;if(!u.target)throw"target must be set";if("string"==typeof u.target)throw"target must be a DOM element";if(t=u.target,!t.getContext)throw"no getContext method";if(c||(c=t.getContext("2d")),Util.Debug("User Agent: "+navigator.userAgent),i.gecko&&Util.Debug("Browser: gecko "+i.gecko),i.webkit&&Util.Debug("Browser: webkit "+i.webkit),i.trident&&Util.Debug("Browser: trident "+i.trident),i.presto&&Util.Debug("Browser: presto "+i.presto),l.clear(),!("createImageData"in c))throw"Canvas does not support createImageData";for(u.render_mode="canvas rendering",null===u.prefer_js&&(Util.Info("Prefering javascript operations"),u.prefer_js=!0),v=c.createImageData(16,16),n=[],e=0;256>e;e+=1)n.push(255);try{r=t.style.cursor,changeCursor(u.target,n,n,2,2,8,8),t.style.cursor?(null===u.cursor_uri&&(u.cursor_uri=!0),Util.Info("Data URI scheme cursor supported")):(null===u.cursor_uri&&(u.cursor_uri=!1),Util.Warn("Data URI scheme cursor not supported")),t.style.cursor=r}catch(o){Util.Error("Data URI scheme cursor test exception: "+o),u.cursor_uri=!1}return Util.Debug("<< Display.constructor"),l}var n,r,i,o,s,a,l={},u={},c=null,h=[],f=0,d=0,p={x:0,y:0,w:0,h:0},g={x1:0,y1:0,x2:-1,y2:-1},m="",y=null,v=null,b=0,w=0;return Util.conf_defaults(u,l,t,[["target","wo","dom",null,"Canvas element for rendering"],["context","ro","raw",null,"Canvas 2D context for rendering (read-only)"],["logo","rw","raw",null,'Logo to display when cleared: {"width": width, "height": height, "data": data}'],["true_color","rw","bool",!0,"Use true-color pixel data"],["colourMap","rw","arr",[],"Colour map array (when not true-color)"],["scale","rw","float",1,"Display area scale factor 0.0 - 1.0"],["viewport","rw","bool",!1,"Use a viewport set with viewportChange()"],["width","rw","int",null,"Display area width"],["height","rw","int",null,"Display area height"],["render_mode","ro","str","","Canvas rendering mode (read-only)"],["prefer_js","rw","str",null,"Prefer Javascript over canvas methods"],["cursor_uri","rw","raw",null,"Can we render cursor using data URI"]]),l.get_context=function(){return c},l.set_scale=function(t){s(t)},l.set_width=function(t){l.resize(t,d)},l.get_width=function(){return f},l.set_height=function(t){l.resize(f,t)},l.get_height=function(){return d},s=function(t){var e,n,r,i,o=["transform","WebkitTransform","MozTransform",null];for(e=u.target,n=o.shift();n&&"undefined"==typeof e.style[n];)n=o.shift();return null===n?void Util.Debug("No scaling support"):("undefined"==typeof t?t=u.scale:t>1?t=1:.1>t&&(t=.1),void(u.scale!==t&&(u.scale=t,r=e.width-e.width*t,i=e.height-e.height*t,e.style[n]="scale("+u.scale+") translate(-"+r+"px, -"+i+"px)")))},o=function(t){var e,n;e=u.true_color?t:u.colourMap[t[0]],n="rgb("+e[2]+","+e[1]+","+e[0]+")",n!==m&&(c.fillStyle=n,m=n)},l.viewportChange=function(t,e,n,r){var i,o,s,a,l,h,m,y=u.target,v=p,b=g,w=null;u.viewport||(Util.Debug("Setting viewport to full display region"),t=-v.w,e=-v.h,n=f,r=d),"undefined"==typeof t&&(t=0),"undefined"==typeof e&&(e=0),"undefined"==typeof n&&(n=v.w),"undefined"==typeof r&&(r=v.h),n>f&&(n=f),r>d&&(r=d),(v.w!==n||v.h!==r)&&(n<v.w&&b.x2>v.x+n-1&&(b.x2=v.x+n-1),v.w=n,r<v.h&&b.y2>v.y+r-1&&(b.y2=v.y+r-1),v.h=r,v.w>0&&v.h>0&&y.width>0&&y.height>0&&(w=c.getImageData(0,0,y.width<v.w?y.width:v.w,y.height<v.h?y.height:v.h)),y.width=v.w,y.height=v.h,w&&c.putImageData(w,0,0)),a=v.x+v.w-1,l=v.y+v.h-1,0>t&&v.x+t<0&&(t=-v.x),a+t>=f&&(t-=a+t-f+1),v.y+e<0&&(e=-v.y),l+e>=d&&(e-=l+e-d+1),(0!==t||0!==e)&&(Util.Debug("viewportChange deltaX: "+t+", deltaY: "+e),v.x+=t,a+=t,v.y+=e,l+=e,v.x>b.x1&&(b.x1=v.x),a<b.x2&&(b.x2=a),v.y>b.y1&&(b.y1=v.y),l<b.y2&&(b.y2=l),0>t?(o=0,h=-t):(o=v.w-t,h=t),0>e?(s=0,m=-e):(s=v.h-e,m=e),i=c.fillStyle,c.fillStyle="rgb(255,255,255)",0!==t&&(c.drawImage(y,0,0,v.w,v.h,-t,0,v.w,v.h),c.fillRect(o,0,h,v.h)),0!==e&&(c.drawImage(y,0,0,v.w,v.h,0,-e,v.w,v.h),c.fillRect(0,s,v.w,m)),c.fillStyle=i)},l.getCleanDirtyReset=function(){var t,e=p,n=g,r=[],i=e.x+e.w-1,o=e.y+e.h-1;return t={x:n.x1,y:n.y1,w:n.x2-n.x1+1,h:n.y2-n.y1+1},n.x1>=n.x2||n.y1>=n.y2?r.push({x:e.x,y:e.y,w:e.w,h:e.h}):(e.x<n.x1&&r.push({x:e.x,y:e.y,w:n.x1-e.x+1,h:e.h}),i>n.x2&&r.push({x:n.x2+1,y:e.y,w:i-n.x2,h:e.h}),e.y<n.y1&&r.push({x:n.x1,y:e.y,w:n.x2-n.x1+1,h:n.y1-e.y}),o>n.y2&&r.push({x:n.x1,y:n.y2+1,w:n.x2-n.x1+1,h:o-n.y2})),g={x1:e.x,y1:e.y,x2:e.x+e.w-1,y2:e.y+e.h-1},{cleanBox:t,dirtyBoxes:r}},l.absX=function(t){return t+p.x},l.absY=function(t){return t+p.y},l.resize=function(t,e){m="",f=t,d=e,s(u.scale),l.viewportChange()},l.clear=function(){u.logo?(l.resize(u.logo.width,u.logo.height),l.blitStringImage(u.logo.data,0,0)):(l.resize(640,20),c.clearRect(0,0,p.w,p.h)),h=[]},l.fillRect=function(t,e,n,r,i){o(i),c.fillRect(t-p.x,e-p.y,n,r)},l.copyImage=function(t,e,n,r,i,o){var s=t-p.x,a=e-p.y,l=n-p.x,h=r-p.y;c.drawImage(u.target,s,a,i,o,l,h,i,o)},l.startTile=function(t,e,n,r,i){var o,s,a,h,f,d;if(b=t,w=e,y=16===n&&16===r?v:c.createImageData(n,r),o=y.data,u.prefer_js)for(s=u.true_color?i:u.colourMap[i[0]],a=s[2],h=s[1],f=s[0],d=0;n*r*4>d;d+=4)o[d]=a,o[d+1]=h,o[d+2]=f,o[d+3]=255;else l.fillRect(t,e,n,r,i)},l.subTile=function(t,e,n,r,i){var o,s,a,c,h,f,d,p,g,m,v;if(u.prefer_js)for(o=y.data,d=y.width,a=u.true_color?i:u.colourMap[i[0]],c=a[2],h=a[1],f=a[0],m=t+n,v=e+r,p=e;v>p;p+=1)for(g=t;m>g;g+=1)s=4*(g+p*d),o[s]=c,o[s+1]=h,o[s+2]=f,o[s+3]=255;else l.fillRect(b+t,w+e,n,r,i)},l.finishTile=function(){u.prefer_js&&c.putImageData(y,b-p.x,w-p.y)},n=function(t,e,n,r,i,o,s,a){var l,u,h,f;for(l=c.createImageData(i,o),f=l.data,u=0,h=a;i*o*4>u;u+=4,h+=3)f[u]=s[h],f[u+1]=s[h+1],f[u+2]=s[h+2],f[u+3]=255;c.putImageData(l,t-n,e-r)},r=function(t,e,n,r,i,o,s,a){var l,u,h,f;for(l=c.createImageData(i,o),f=l.data,u=0,h=a;i*o*4>u;u+=4,h+=4)f[u]=s[h+2],f[u+1]=s[h+1],f[u+2]=s[h],f[u+3]=255;c.putImageData(l,t-n,e-r)},i=function(t,e,n,r,i,o,s,a){var l,h,f,d,p,g;for(l=c.createImageData(i,o),d=l.data,g=u.colourMap,h=0,f=a;i*o*4>h;h+=4,f+=1)p=g[s[f]],d[h]=p[2],d[h+1]=p[1],d[h+2]=p[0],d[h+3]=255;c.putImageData(l,t-n,e-r)},l.blitImage=function(t,e,n,o,s,a){u.true_color?r(t,e,p.x,p.y,n,o,s,a):i(t,e,p.x,p.y,n,o,s,a)},l.blitRgbImage=function(t,e,r,o,s,a){u.true_color?n(t,e,p.x,p.y,r,o,s,a):i(t,e,p.x,p.y,r,o,s,a)},l.blitStringImage=function(t,e,n){var r=new Image;r.onload=function(){c.drawImage(r,e-p.x,n-p.y)},r.src=t},l.drawImage=function(t,e,n){c.drawImage(t,e-p.x,n-p.y)},l.renderQ_push=function(t){h.push(t),1===h.length&&a()},a=function(){for(var t,e=!0;e&&h.length>0;){switch(t=h[0],t.type){case"copy":l.copyImage(t.old_x,t.old_y,t.x,t.y,t.width,t.height);break;case"fill":l.fillRect(t.x,t.y,t.width,t.height,t.color);break;case"blit":l.blitImage(t.x,t.y,t.width,t.height,t.data,0);break;case"blitRgb":l.blitRgbImage(t.x,t.y,t.width,t.height,t.data,0);break;case"img":t.img.complete?l.drawImage(t.img,t.x,t.y):e=!1}e&&(t=h.shift())}h.length>0&&requestAnimFrame(a)},l.changeCursor=function(t,e,n,r,i,o){return u.cursor_uri===!1?void Util.Warn("changeCursor called but no cursor data URI support"):void(u.true_color?changeCursor(u.target,t,e,n,r,i,o):changeCursor(u.target,t,e,n,r,i,o,u.colourMap))},l.defaultCursor=function(){u.target.style.cursor="default"},e()}function changeCursor(t,e,n,r,i,o,s,a){"use strict";var l,u,c,h,f,d,p,g,m,y,v=[],b=o,w=s;for(b>w?w=b:b=w,v.push16le=function(t){this.push(255&t,t>>8&255)},v.push32le=function(t){this.push(255&t,t>>8&255,t>>16&255,t>>24&255)},u=40,c=b*w*4,f=Math.ceil(b*w/8),h=Math.ceil(b*w/8),v.push16le(0),v.push16le(2),v.push16le(1),v.push(b),v.push(w),v.push(0),v.push(0),v.push16le(r),v.push16le(i),v.push32le(u+c+f+h),v.push32le(22),v.push32le(u),v.push32le(b),v.push32le(2*w),v.push16le(1),v.push16le(32),v.push32le(0),v.push32le(f+h),v.push32le(0),v.push32le(0),v.push32le(0),v.push32le(0),y=w-1;y>=0;y-=1)for(m=0;b>m;m+=1)m>=o||y>=s?(v.push(0),v.push(0),v.push(0),v.push(0)):(p=y*Math.ceil(o/8)+Math.floor(m/8),g=n[p]<<m%8&128?255:0,a?(p=o*y+m,l=a[e[p]],v.push(l[2]),v.push(l[1]),v.push(l[0]),v.push(g)):(p=4*(o*y+m),v.push(e[p+2]),v.push(e[p+1]),v.push(e[p]),v.push(g)));for(y=0;w>y;y+=1)for(m=0;m<Math.ceil(b/8);m+=1)v.push(0);for(y=0;w>y;y+=1)for(m=0;m<Math.ceil(b/8);m+=1)v.push(0);d="data:image/x-icon;base64,"+Base64.encode(v),t.style.cursor="url("+d+") "+r+" "+i+", default"}