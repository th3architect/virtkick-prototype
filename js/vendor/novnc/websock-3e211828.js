/*
 * Websock: high-performance binary WebSockets
 * Copyright (C) 2012 Joel Martin
 * Licensed under MPL 2.0 (see LICENSE.txt)
 *
 * Websock is similar to the standard WebSocket object but Websock
 * enables communication with raw TCP sockets (i.e. the binary stream)
 * via websockify. This is accomplished by base64 encoding the data
 * stream between Websock and websockify.
 *
 * Websock has built-in receive queue buffering; the message event
 * does not contain actual data but is simply a notification that
 * there is new data available. Several rQ* methods are available to
 * read binary data off of the receive queue.
 */
function Websock(){"use strict";function e(){return A}function t(){return D}function n(){return I}function r(e){I=e}function i(){return D.length-I}function o(){return D[I]}function s(){return D[I++]}function a(e){0===I?D.unshift(e):(I-=1,D[I]=e)}function l(){return(D[I++]<<8)+D[I++]}function u(){return(D[I++]<<24)+(D[I++]<<16)+(D[I++]<<8)+D[I++]}function c(e){"undefined"==typeof e&&(e=i());var t=D.slice(I,I+e);return I+=e,String.fromCharCode.apply(null,t)}function d(e){return"undefined"==typeof e&&(e=i()),I+=e,D.slice(I-e,I)}function f(e,t){return t?D.slice(I+e,I+t):D.slice(I+e)}function h(e,t,n){var r=D.length-I;if(t>r){if(n){if(n>I)throw"rQwait cannot backup "+n+" bytes";I-=n}return!0}return!1}function p(){return"binary"===S?new Uint8Array(A).buffer:Base64.encode(A)}function g(e){if("binary"===S)for(var t=new Uint8Array(e),n=0;n<t.length;n++)D.push(t[n]);else D=D.concat(Base64.decode(e,0))}function y(){return 0!==E.bufferedAmount&&Util.Debug("bufferedAmount: "+E.bufferedAmount),E.bufferedAmount<T.maxBufferedAmount?(A.length>0&&(E.send(p(A)),A=[]),!0):(Util.Info("Delaying send, bufferedAmount: "+E.bufferedAmount),!1)}function m(e){return A=A.concat(e),y()}function v(e){T.send(e.split("").map(function(e){return e.charCodeAt(0)}))}function b(e){try{g(e.data),i()>0?(Q.message(),D.length>$&&(D=D.slice(I),I=0)):Util.Debug("Ignoring empty message")}catch(t){Util.Warn("undefined"!=typeof t.stack?"recv_message, caught exception: "+t.stack:"undefined"!=typeof t.description?"recv_message, caught exception: "+t.description:"recv_message, caught exception:"+t),Q.error("undefined"!=typeof t.name?t.name+": "+t.message:t)}}function w(e,t){Q[e]=t}function x(e){D=[],I=0,A=[],E=null;var t=!1,n=!1;"Uint8Array"in window&&"set"in Uint8Array.prototype&&(t=!0);try{t&&"binaryType"in new WebSocket("ws://localhost:17523")&&(Util.Info("Detected binaryType support in WebSockets"),n=!0)}catch(r){}if("undefined"==typeof e&&(e=n?["binary","base64"]:"base64"),!n){if("binary"===e)throw"WebSocket binary sub-protocol requested but not supported";if("object"==typeof e){for(var i=[],o=0;o<e.length;o++)"binary"===e[o]?Util.Error("Skipping unsupported WebSocket binary sub-protocol"):i.push(e[o]);if(!(i.length>0))throw"Only WebSocket binary sub-protocol was requested and not supported.";e=i}}return e}function k(e,t){t=x(t),R?E={}:(E=new WebSocket(e,t),t.indexOf("binary")>=0&&(E.binaryType="arraybuffer")),E.onmessage=b,E.onopen=function(){Util.Debug(">> WebSock.onopen"),E.protocol?(S=E.protocol,Util.Info("Server chose sub-protocol: "+E.protocol)):(S="base64",Util.Error("Server select no sub-protocol!: "+E.protocol)),Q.open(),Util.Debug("<< WebSock.onopen")},E.onclose=function(e){Util.Debug(">> WebSock.onclose"),Q.close(e),Util.Debug("<< WebSock.onclose")},E.onerror=function(e){Util.Debug(">> WebSock.onerror: "+e),Q.error(e),Util.Debug("<< WebSock.onerror")}}function C(){E&&((E.readyState===WebSocket.OPEN||E.readyState===WebSocket.CONNECTING)&&(Util.Info("Closing WebSocket connection"),E.close()),E.onmessage=function(){})}function _(e,t){return R=!0,S=t,T.send=e,T.close=function(){},b}function U(){return T.maxBufferedAmount=200,T.get_sQ=e,T.get_rQ=t,T.get_rQi=n,T.set_rQi=r,T.rQlen=i,T.rQpeek8=o,T.rQshift8=s,T.rQunshift8=a,T.rQshift16=l,T.rQshift32=u,T.rQshiftStr=c,T.rQshiftBytes=d,T.rQslice=f,T.rQwait=h,T.flush=y,T.send=m,T.send_string=v,T.on=w,T.init=x,T.open=k,T.close=C,T.testMode=_,T}var T={},E=null,S="base64",D=[],I=0,$=1e4,A=[],Q={message:function(){},open:function(){},close:function(){},error:function(){}},R=!1;return U()}window.WebSocket&&!window.WEB_SOCKET_FORCE_FLASH?Websock_native=!0:window.MozWebSocket&&!window.WEB_SOCKET_FORCE_FLASH?(Websock_native=!0,window.WebSocket=window.MozWebSocket):(Websock_native=!1,function(){window.WEB_SOCKET_SWF_LOCATION=Util.get_include_uri()+"web-socket-js/WebSocketMain.swf",Util.Engine.trident&&(Util.Debug("Forcing uncached load of WebSocketMain.swf"),window.WEB_SOCKET_SWF_LOCATION+="?"+Math.random()),Util.load_scripts(["web-socket-js/swfobject.js","web-socket-js/web_socket.js"])}());