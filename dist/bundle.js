(()=>{function e(e,n){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=t(e))||n&&e&&"number"==typeof e.length){r&&(e=r);var o=0,a=function(){};return{s:a,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,l=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return c=e.done,e},e:function(e){l=!0,i=e},f:function(){try{c||null==r.return||r.return()}finally{if(l)throw i}}}}function t(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}document.addEventListener("DOMContentLoaded",(function(){Array.from(document.getElementsByClassName("navbar-burger")).forEach((function(e){e.addEventListener("click",(function(){var t=document.getElementById(e.dataset.target);t&&(e.classList.toggle("is-active"),t.classList.toggle("is-active"))}))})),Array.from(document.getElementsByClassName("nav-link")).forEach((function(e){e.addEventListener("click",(function(){var t=document.getElementById(e.dataset.target),n=document.getElementById(t.dataset.target);t&&n&&(t.classList.remove("is-active"),n.classList.remove("is-active"))}))})),function(){var r=new window.Terminal({fontFamily:'"Cascadia Code", Menlo, monospace',theme:{foreground:"#F8F8F8",background:"#2D2E2C",selection:"#5DA5D533",black:"#1E1E1D",brightBlack:"#262625",red:"#CE5C5C",brightRed:"#FF7272",green:"#5BCC5B",brightGreen:"#72FF72",yellow:"#CCCC5B",brightYellow:"#FFFF72",blue:"#5D5DD3",brightBlue:"#7279FF",magenta:"#BC5ED1",brightMagenta:"#E572FF",cyan:"#5DA5D5",brightCyan:"#72F0FF",white:"#F8F8F8",brightWhite:"#FFFFFF"},cursorBlink:!0}),o=new window.FitAddon.FitAddon;r.loadAddon(o),r.open(document.querySelector(".terminal-wrapper")),o.fit(),window.addEventListener("resize",(function(){setTimeout((function(){o.fit()}),20)}));var a=!1;try{var i=new window.WebglAddon.WebglAddon;r.loadAddon(i),a=!0}catch(e){console.warn("WebGL addon threw an exception during load",e)}function c(e){l="",e.write("\r\n$ ")}document.querySelector(".xterm").addEventListener("wheel",(function(e){r.buffer.active.baseY>0&&e.preventDefault()}));var l="",d={help:{f:function(){var e;r.writeln(["Welcome to xterm.js! Try some of the commands below.",""].concat((e=Object.keys(d).map((function(e){return"  ".concat(e.padEnd(10)," ").concat(d[e].description)})),function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||t(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())).join("\n\r")),c(r)},description:"Prints this help message"},ls:{f:function(){r.writeln(["a","bunch","of","fake","files"].join("\r\n")),r.prompt(r)},description:"Prints a fake directory structure"},loadtest:{f:function(){for(var t=[],n=0,o=0;o<50;o++){var i=1+Math.floor(79*Math.random());n+=i+2;var c=new Uint8Array(i+2);c[0]=10;for(var l=1;l<i+1;l++)c[l]=97+Math.floor(25*Math.random());c[c.length-1]=13,t.push(c)}for(var d=performance.now(),f=0;f<1024;f++){var s,u=e(t);try{for(u.s();!(s=u.n()).done;){var m=s.value;r.write(m)}}catch(e){u.e(e)}finally{u.f()}}r.write("",(function(){var e=Math.round(performance.now()-d),t=(n/1024*(1/(e/1e3))).toFixed(2);r.write("\n\r\nWrote ".concat(n,"kB in ").concat(e,"ms (").concat(t,"MB/s) using the ").concat(a?"webgl":"canvas"," renderer")),r.prompt()}))},description:"Simulate a lot of data coming from a process"}};r._initialized||(r._initialized=!0,r.prompt=function(){r.write("\r\n$ ")},r.writeln("type `help` to see some options:"),c(r),r.onData((function(e){switch(e){case"":r.write("^C"),c(r);break;case"\r":(function(e,t){var n=t.trim().split(" ")[0];if(n.length>0){if(e.writeln(""),n in d)return void d[n].f();e.writeln("".concat(n,": command not found"))}c(e)})(r,l),l="";break;case"":r._core.buffer.x>2&&(r.write("\b \b"),l.length>0&&(l=l.substr(0,l.length-1)));break;default:(e>=String.fromCharCode(32)&&e<=String.fromCharCode(126)||e>=" ")&&(l+=e,r.write(e))}})))}()}))})();