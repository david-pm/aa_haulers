var $event=$.event,$special,resizeTimeout;$special=$event.special.debouncedresize={setup:function(){$(this).on("resize",$special.handler)},teardown:function(){$(this).off("resize",$special.handler)},handler:function(a,b){var c=this,d=arguments,e=function(){a.type="debouncedresize",$event.dispatch.apply(c,d)};resizeTimeout&&clearTimeout(resizeTimeout),b?e():resizeTimeout=setTimeout(e,$special.threshold)},threshold:250};var BLANK="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";$.fn.imagesLoaded=function(a){function b(){var b=$(i),c=$(j);e&&(j.length?e.reject(g,b,c):e.resolve(g)),$.isFunction(a)&&a.call(d,g,b,c)}function c(a,c){a.src!==BLANK&&-1===$.inArray(a,h)&&(h.push(a),c?j.push(a):i.push(a),$.data(a,"imagesLoaded",{isBroken:c,src:a.src}),f&&e.notifyWith($(a),[c,g,$(i),$(j)]),g.length===h.length&&(setTimeout(b),g.unbind(".imagesLoaded")))}var d=this,e=$.isFunction($.Deferred)?$.Deferred():0,f=$.isFunction(e.notify),g=d.find("img").add(d.filter("img")),h=[],i=[],j=[];return $.isPlainObject(a)&&$.each(a,function(b,c){"callback"===b?a=c:e&&e[b](c)}),g.length?g.bind("load.imagesLoaded error.imagesLoaded",function(a){c(a.target,"error"===a.type)}).each(function(a,b){var d=b.src,e=$.data(b,"imagesLoaded");return e&&e.src===d?void c(b,e.isBroken):b.complete&&void 0!==b.naturalWidth?void c(b,0===b.naturalWidth||0===b.naturalHeight):void((b.readyState||b.complete)&&(b.src=BLANK,b.src=d))}):b(),e?e.promise(d):d};var Grid=function(){function a(a){u=$.extend(!0,{},u,a),j.imagesLoaded(function(){b(!0),e(),c()})}function b(a){k.each(function(){var b=$(this);b.data("offsetTop",b.offset().top),a&&b.data("height",b.height())})}function c(){d(k),p.on("debouncedresize",function(){n=0,m=-1,b(),e();var a=$.data(this,"preview");"undefined"!=typeof a&&g()})}function d(a){a.on("click","span.exit",function(a){g(),a.preventDefault()}).children("a").on("click",function(a){var b=$(this).parent();l===b.index()?g():f(b),a.preventDefault()})}function e(){i={width:p.width(),height:p.height()}}function f(a){var b=$.data(this,"preview"),c=a.data("offsetTop");if(n=0,"undefined"!=typeof b){if(m===c)return b.update(a),!1;c>m&&(n=b.height),g()}m=c,b=$.data(this,"preview",new h(a)),b.open()}function g(){l=-1;var a=$.data(this,"preview");a.close(),$.removeData(this,"preview")}function h(a){this.$item=a,this.expandedIdx=this.$item.index(),this.create(),this.update()}var i,j=$("#og-grid"),k=j.children("li"),l=-1,m=-1,n=0,o=10,p=$(window),q=$("html, body"),r={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"},s=r[Modernizr.prefixed("transition")],t=Modernizr.csstransitions,u={minHeight:500,speed:350,easing:"ease"};return h.prototype={create:function(){this.$title=$("<h3></h3>"),this.$description=$("<p></p>"),this.$href=$('<a href="#">Visit website</a>'),this.$details=$('<div class="og-details"></div>').append(this.$title,this.$description,this.$href),this.$loading=$('<div class="loading"></div>'),this.$fullimage=$('<div class="feature"></div>').append(this.$loading),this.$closePreview=$('<span class="exit"></span>'),this.$previewInner=$('<div class="viewer-inner"></div>').append(this.$closePreview,this.$fullimage,this.$details),this.$previewEl=$('<div class="viewer"></div>').append(this.$previewInner),this.$item.append(this.getEl()),t&&this.setTransition()},update:function(a){if(a&&(this.$item=a),-1!==l){var b=k.eq(l);b.removeClass("expanded"),this.$item.addClass("expanded"),this.positionPreview()}l=this.$item.index();var c=this.$item.children("a"),d={href:c.attr("href"),largesrc:c.data("largesrc"),title:c.data("title"),description:c.data("description")};this.$title.html(d.title),this.$description.html(d.description),this.$href.attr("href",d.href);var e=this;"undefined"!=typeof e.$largeImg&&e.$largeImg.remove(),e.$fullimage.is(":visible")&&(this.$loading.show(),$("<img/>").load(function(){var a=$(this);a.attr("src")===e.$item.children("a").data("largesrc")&&(e.$loading.hide(),e.$fullimage.find("img").remove(),e.$largeImg=a.fadeIn(350),e.$fullimage.append(e.$largeImg))}).attr("src",d.largesrc))},open:function(){setTimeout($.proxy(function(){this.setHeights(),this.positionPreview()},this),25)},close:function(){var a=this,b=function(){t&&$(this).off(s),a.$item.removeClass("expanded"),a.$previewEl.remove()};return setTimeout($.proxy(function(){"undefined"!=typeof this.$largeImg&&this.$largeImg.fadeOut("fast"),this.$previewEl.css("height",0);var a=k.eq(this.expandedIdx);a.css("height",a.data("height")).on(s,b),t||b.call()},this),25),!1},calcHeight:function(){var a=i.height-this.$item.data("height")-o,b=i.height;a<u.minHeight&&(a=u.minHeight,b=u.minHeight+this.$item.data("height")+o),this.height=a,this.itemHeight=b},setHeights:function(){var a=this,b=function(){t&&a.$item.off(s),a.$item.addClass("expanded")};this.calcHeight(),this.$previewEl.css("height",this.height),this.$item.css("height",this.itemHeight).on(s,b),t||b.call()},positionPreview:function(){var a=this.$item.data("offsetTop"),b=this.$previewEl.offset().top-n,c=this.height+this.$item.data("height")+o<=i.height?a:this.height<i.height?b-(i.height-this.height):b;q.animate({scrollTop:c},u.speed)},setTransition:function(){this.$previewEl.css("transition","height "+u.speed+"ms "+u.easing),this.$item.css("transition","height "+u.speed+"ms "+u.easing)},getEl:function(){return this.$previewEl}},{init:a}}();