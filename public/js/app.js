(function($){
     $(document).on("click", "a[data-remote]", function(){
			$.post($(this).attr("href"));
			return false;
		    });
 })(jQuery);

(function($){
     var appCache = window.applicationCache;

     function getStatus(){
	 switch (appCache.status) {
	 case appCache.UNCACHED: // UNCACHED == 0
	     return 'UNCACHED';
	     break;
	 case appCache.IDLE: // IDLE == 1
	     return 'IDLE';
	     break;
	 case appCache.CHECKING: // CHECKING == 2
	     return 'CHECKING';
	     break;
	 case appCache.DOWNLOADING: // DOWNLOADING == 3
	     return 'DOWNLOADING';
	     break;
	 case appCache.UPDATEREADY:  // UPDATEREADY == 4
	     return 'UPDATEREADY';
	     break;
	 case appCache.OBSOLETE: // OBSOLETE == 5
	     return 'OBSOLETE';
	     break;
	 default:
	     return 'UKNOWN CACHE STATUS';
	     break;
	 };
     }

     $(function(){
	   var e = $("<div>");
	   $("#debug").append(e);
	   setInterval(function(){
			   e.text(getStatus());
		       }, 5000);
       });

     $(function(){
	   var e = $("<div>");
	   $("#debug").append(e);

	   function handleCacheEvent(event) {
	       e.append(event.type + " ");
	   }

	   // Fired after the first cache of the manifest.
	   appCache.addEventListener('cached', handleCacheEvent);

	   // Checking for an update. Always the first event fired in the sequence.
	   appCache.addEventListener('checking', handleCacheEvent);

	   // An update was found. The browser is fetching resources.
	   appCache.addEventListener('downloading', handleCacheEvent);

	   // The manifest returns 404 or 410, the download failed,
	   // or the manifest changed while the download was in progress.
	   appCache.addEventListener('error', handleCacheEvent);

	   // Fired after the first download of the manifest.
	   appCache.addEventListener('noupdate', handleCacheEvent);

	   // Fired if the manifest file returns a 404 or 410.
	   // This results in the application cache being deleted.
	   appCache.addEventListener('obsolete', handleCacheEvent);

	   // Fired for each resource listed in the manifest as it is being fetched.
	   appCache.addEventListener('progress', handleCacheEvent);

	   // Fired when the manifest resources have been newly redownloaded.
	   appCache.addEventListener('updateready', handleCacheEvent);

	   setInterval(function(){
			   try{
			       appCache.update();
			   } catch (x) {

			   }
		       }, 30000);

       });

})(jQuery);