/*! Real Shadow v1.3.4 http://indamix.github.io/real-shadow | https://raw.github.com/Indamix/real-shadow/master/license.txt */
(function(l,h){function f(d,g){this!==l&&(g=d,d=this);g=g||{};for(var a=0;a<d.length;++a){var c=d[a],b=g,m=t(c),c={node:c,x:m.x,y:m.y,c:c.getAttribute("data-shadow-color")||b.color,inset:b.inset?"inset":"",inverse:b.inverse?-1:1};b.angle!==h?c.angle=b.angle:(b.pageX!==h&&(c.pageX=b.pageX),b.pageY!==h&&(c.pageY=b.pageY));c.type=b.type;if("drop"===b.type){if(r===h){var m=(m="webkit","-"+m+"-"),e=document.createElement("div");e.style.cssText=m+"filter:drop-shadow(0 0 0 #000)";r=0<e.style.length}c.length=
  b.length||4;c.opacity=b.opacity||0.2}else c.length=b.length||7,c.opacity=b.opacity||0.05;"flat"===b.style&&(c.style=b.style,c.length=b.length||40,c.opacity=b.opacity||1);n.push(c)}s||(!1!==g.followMouse&&g.angle===h&&(document.body.addEventListener("mousemove",f.frame),s=!0),l.addEventListener("resize",f.update));f.frame();return d}function u(d){return(0===d?0:0>d?1:-1)*Math.pow(Math.abs(d),1/3)}function t(d){var g=d.clientWidth>>1,a=d.clientHeight>>1;do g+=d.offsetLeft,a+=d.offsetTop;while(d=d.offsetParent);
  return{x:g,y:a}}var v=1/1500,w=Math.PI,n=[],s,r;f.reset=function(){n=[];document.body.removeEventListener("mousemove",f.frame);l.removeEventListener("resize",f.update);s=!1};f.update=function(){for(var d=n.length,g;d--;){g=n[d];var a=t(g.node);g.x=a.x;g.y=a.y}f.frame()};f.frame=function(d){d||(d={pageX:l.innerWidth>>1,pageY:0});for(var g=n.length,a;g--;){a=n[g];var c=(a.pageX===h?d.pageX:a.pageX)-a.x,b=(a.pageY===h?d.pageY:a.pageY)-a.y,f=Math.pow(c*c+b*b,0.8)*v+1;2.3<f&&(f=2.3);if("drop"!==a.type||
  r){var e=a;a=a.angle===h?Math.atan2(c,b)-w:a.angle;c=Array(e.length-1);b=Math.cos(a);a=Math.sin(a);for(var k=void 0,p=1;p<e.length;++p)k=("flat"===e.style?p:Math.pow(p,f))*e.inverse,c[p-1]=(k*a|0)+"px "+(k*b|0)+"px "+("flat"===e.style?0:Math.pow(p,1.7)|0)+"px rgba("+(e.c||"0,0,0")+","+e.opacity+")"+e.inset;"drop"===e.type?e.node.style.webkitFilter="drop-shadow("+c.join(") drop-shadow(")+")":e.node.style["text"===e.type?"textShadow":"boxShadow"]=c.join(",")}else e=a,e.filter||(a="real-shadow-"+Math.random().toString(36).substr(2),
  k=(new DOMParser).parseFromString('<svg height="0" xmlns="http://www.w3.org/2000/svg"><filter id="'+a+'"><feGaussianBlur in="SourceAlpha"/><feOffset result="b"/><feFlood/><feComposite in2="b" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></svg>',"application/xml"),e.filter={offset:k.getElementsByTagName("feOffset")[0],blur:k.getElementsByTagName("feGaussianBlur")[0],color:k.getElementsByTagName("feFlood")[0]},document.body.appendChild(k.children[0]),e.node.style.filter=
  "url(#"+a+")"),e.filter.offset.setAttribute("dx",u(c)),e.filter.offset.setAttribute("dy",u(b)),e.filter.blur.setAttribute("stdDeviation",2*f),e.filter.color.setAttribute("flood-color","rgba(0,0,0,"+(0.6-f/8)+")")}};var q=!1;"function"===typeof l.jQuery&&($.fn.realshadow=f,q=!0);"undefined"!==typeof define&&define.amd&&(define(function(){return f}),q=!0);"undefined"!==typeof module&&module.exports&&(module.exports=f,q=!0);q||(l.realshadow=f)})(this);