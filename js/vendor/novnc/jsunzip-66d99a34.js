/*
 * JSUnzip
 *
 * Copyright (c) 2011 by Erik Moller
 * All Rights Reserved
 *
 * This software is provided 'as-is', without any express
 * or implied warranty.  In no event will the authors be
 * held liable for any damages arising from the use of
 * this software.
 *
 * Permission is granted to anyone to use this software
 * for any purpose, including commercial applications,
 * and to alter it and redistribute it freely, subject to
 * the following restrictions:
 *
 * 1. The origin of this software must not be
 *    misrepresented; you must not claim that you
 *    wrote the original software. If you use this
 *    software in a product, an acknowledgment in
 *    the product documentation would be appreciated
 *    but is not required.
 *
 * 2. Altered source versions must be plainly marked
 *    as such, and must not be misrepresented as
 *    being the original software.
 *
 * 3. This notice may not be removed or altered from
 *    any source distribution.
 */
function JSUnzip(){this.getInt=function(e,t){switch(t){case 4:return(255&this.data.charCodeAt(e+3))<<24|(255&this.data.charCodeAt(e+2))<<16|(255&this.data.charCodeAt(e+1))<<8|255&this.data.charCodeAt(e+0);case 2:return(255&this.data.charCodeAt(e+1))<<8|255&this.data.charCodeAt(e+0);default:return 255&this.data.charCodeAt(e)}},this.getDOSDate=function(e,t){var n=31&e,r=(e>>5&15)-1,i=1980+(e>>9&127),o=2*(31&t),s=t>>5&63;return hour=t>>11&31,new Date(i,r,n,hour,s,o)},this.open=function(e){if(this.data=e,this.files=[],this.data.length<22)return{status:!1,error:"Invalid data"};for(var t=this.data.length-22;t>=0&&101010256!=this.getInt(t,4);)--t;if(0>t)return{status:!1,error:"Invalid data"};if(0!=this.getInt(t+4,2)||0!=this.getInt(t+6,2))return{status:!1,error:"No multidisk support"};var n=this.getInt(t+8,2),r=this.getInt(t+16,4),i=this.getInt(t+20,2);this.comment=this.data.slice(t+22,t+22+i);for(var o=r,s=0;n>s;++s){if(33639248!=this.getInt(o+0,4))return{status:!1,error:"Invalid data"};if(this.getInt(o+6,2)>20)return{status:!1,error:"Unsupported version"};if(1&this.getInt(o+8,2))return{status:!1,error:"Encryption not implemented"};var a=this.getInt(o+10,2);if(0!=a&&8!=a)return{status:!1,error:"Unsupported compression method"};var l=this.getInt(o+12,2),u=this.getInt(o+14,2),c=this.getDOSDate(u,l),f=(this.getInt(o+16,4),this.getInt(o+20,4)),d=this.getInt(o+24,4),h=this.getInt(o+28,2),p=this.getInt(o+30,2),g=this.getInt(o+32,2),y=this.getInt(o+42,4),m=this.data.slice(o+46,o+46+h),v=this.data.slice(o+46+h+p,o+46+h+p+g);if(67324752!=this.getInt(y+0,4))return{status:!1,error:"Invalid data"};var b=this.getInt(y+26,2),w=this.getInt(y+28,2),x=y+30+b+w;this.files[m]={fileComment:v,compressionMethod:a,compressedSize:f,uncompressedSize:d,localFileContent:x,lastModifiedDate:c},o+=46+h+p+g}return{status:!0}},this.read=function(e){var t=this.files[e];if(t){if(8==t.compressionMethod){tinf||(tinf=new TINF,tinf.init());var n=tinf.uncompress(this.data,t.localFileContent);return n.status==tinf.OK?{status:!0,data:n.data}:{status:!1,error:n.error}}return{status:!0,data:this.data.slice(t.localFileContent,t.localFileContent+t.uncompressedSize)}}return{status:!1,error:"File '"+e+"' doesn't exist in zip"}}}function TINF(){function e(e,t,n,r,i){for(var o=0;24>t;)n|=(255&e[r++])<<t,t+=8;return o=n&65535>>16-i,n>>=i,t-=i,[t,n,r,o]}this.OK=0,this.DATA_ERROR=-3,this.WINDOW_SIZE=32768,this.TREE=function(){this.table=new Array(16),this.trans=new Array(288)},this.DATA=function(e){this.source="",this.sourceIndex=0,this.tag=0,this.bitcount=0,this.dest=[],this.history=[],this.ltree=new e.TREE,this.dtree=new e.TREE},this.sltree=new this.TREE,this.sdtree=new this.TREE,this.length_bits=new Array(30),this.length_base=new Array(30),this.dist_bits=new Array(30),this.dist_base=new Array(30),this.clcidx=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],this.build_bits_base=function(e,t,n,r){var i,o;for(i=0;n>i;++i)e[i]=0;for(i=0;30-n>i;++i)e[i+n]=Math.floor(i/n);for(o=r,i=0;30>i;++i)t[i]=o,o+=1<<e[i]},this.build_fixed_trees=function(e,t){var n;for(n=0;7>n;++n)e.table[n]=0;for(e.table[7]=24,e.table[8]=152,e.table[9]=112,n=0;24>n;++n)e.trans[n]=256+n;for(n=0;144>n;++n)e.trans[24+n]=n;for(n=0;8>n;++n)e.trans[168+n]=280+n;for(n=0;112>n;++n)e.trans[176+n]=144+n;for(n=0;5>n;++n)t.table[n]=0;for(t.table[5]=32,n=0;32>n;++n)t.trans[n]=n},this.build_tree=function(e,t,n,r){var i,o,s=new Array(16);for(i=0;16>i;++i)e.table[i]=0;for(i=0;r>i;++i)e.table[t[n+i]]++;for(e.table[0]=0,o=0,i=0;16>i;++i)s[i]=o,o+=e.table[i];for(i=0;r>i;++i)t[n+i]&&(e.trans[s[t[n+i]]++]=i)},this.getbit=function(e){var t;return e.bitcount--||(e.tag=255&e.source[e.sourceIndex++],e.bitcount=7),t=1&e.tag,e.tag>>=1,t},this.read_bits=function(t,n,r){if(!n)return r;var i=e(t.source,t.bitcount,t.tag,t.sourceIndex,n);return t.bitcount=i[0],t.tag=i[1],t.sourceIndex=i[2],i[3]+r},this.decode_symbol=function(e,t){for(;e.bitcount<16;)e.tag=e.tag|(255&e.source[e.sourceIndex++])<<e.bitcount,e.bitcount+=8;var n=0,r=0,i=0;do r=2*r+((e.tag&1<<i)>>i),++i,n+=t.table[i],r-=t.table[i];while(r>=0);return e.tag>>=i,e.bitcount-=i,t.trans[n+r]},this.decode_trees=function(e,t,n){var r,i,o,s,a,l,u=new this.TREE,c=new Array(320);for(r=this.read_bits(e,5,257),i=this.read_bits(e,5,1),o=this.read_bits(e,4,4),s=0;19>s;++s)c[s]=0;for(s=0;o>s;++s){var f=this.read_bits(e,3,0);c[this.clcidx[s]]=f}for(this.build_tree(u,c,0,19),a=0;r+i>a;){var d=this.decode_symbol(e,u);switch(d){case 16:var h=c[a-1];for(l=this.read_bits(e,2,3);l;--l)c[a++]=h;break;case 17:for(l=this.read_bits(e,3,3);l;--l)c[a++]=0;break;case 18:for(l=this.read_bits(e,7,11);l;--l)c[a++]=0;break;default:c[a++]=d}}this.build_tree(t,c,0,r),this.build_tree(n,c,r,i)},this.inflate_block_data=function(e,t,n){for(var r=e.dest,i=r.length;;){var o=this.decode_symbol(e,t);if(256==o)return this.OK;if(256>o)r[i++]=o,e.history.push(o);else{var s,a,l,u;if(o-=257,s=this.read_bits(e,this.length_bits[o],this.length_base[o]),a=this.decode_symbol(e,n),l=e.history.length-this.read_bits(e,this.dist_bits[a],this.dist_base[a]),0>l)throw"Invalid zlib offset "+l;for(u=l;l+s>u;++u)r[i++]=e.history[u],e.history.push(e.history[u])}}},this.inflate_uncompressed_block=function(e){var t,n,r;if(e.bitcount>7){var i=Math.floor(e.bitcount/8);e.sourceIndex-=i,e.bitcount=0,e.tag=0}if(t=e.source[e.sourceIndex+1],t=256*t+e.source[e.sourceIndex],n=e.source[e.sourceIndex+3],n=256*n+e.source[e.sourceIndex+2],t!=(65535&~n))return this.DATA_ERROR;for(e.sourceIndex+=4,r=t;r;--r)e.history.push(e.source[e.sourceIndex]),e.dest[e.dest.length]=e.source[e.sourceIndex++];return e.bitcount=0,this.OK},this.inflate_fixed_block=function(e){return this.inflate_block_data(e,this.sltree,this.sdtree)},this.inflate_dynamic_block=function(e){return this.decode_trees(e,e.ltree,e.dtree),this.inflate_block_data(e,e.ltree,e.dtree)},this.init=function(){this.build_fixed_trees(this.sltree,this.sdtree),this.build_bits_base(this.length_bits,this.length_base,4,3),this.build_bits_base(this.dist_bits,this.dist_base,2,1),this.length_bits[28]=0,this.length_base[28]=258,this.reset()},this.reset=function(){this.d=new this.DATA(this),delete this.header},this.uncompress=function(e,t){var n,r=this.d;r.source=e,r.sourceIndex=t,r.bitcount=0,r.dest=[],"undefined"==typeof this.header&&(this.header=this.read_bits(r,16,0));var i=0;do{var o,s;switch(n=this.getbit(r),o=this.read_bits(r,2,0)){case 0:s=this.inflate_uncompressed_block(r);break;case 1:s=this.inflate_fixed_block(r);break;case 2:s=this.inflate_dynamic_block(r);break;default:return{status:this.DATA_ERROR}}if(s!=this.OK)return{status:this.DATA_ERROR};i++}while(!n&&r.sourceIndex<r.source.length);return r.history=r.history.slice(-this.WINDOW_SIZE),{status:this.OK,data:r.dest}}}var tinf;