require([
    "dojo/request/xhr",
    "dojo/dom-construct",
    "dojo/_base/window",
    "dojo/_base/array",
    "dojox/mobile/parser",
    "dojo/_base/declare",
    
    "storehouse/Storehouse",
    "dojo/_base/fx",
    "dojo/on",
    "dojo/_base/lang",
    "dojo/ready",
    "dojox/mobile/deviceTheme",
    "dojo/sniff",
    
    "dojo/window",
    
    "storehouse/engines/cookie",
    "storehouse/engines/indexeddb",
    "storehouse/engines/localstorage",
    "dojo/store/util/SimpleQueryEngine",
    
    "dojox/mobile", 
    "dojox/mobile/compat",
    "dojox/mobile/RoundRectList", 
    "dojox/mobile/RoundRect", 
    "dojox/mobile/TextBox", 
    "dojox/mobile/Button",
    "dojox/mobile/compat",
    "dojox/mobile/ContentPane",
    "dojox/mobile/ListItem",
    "dojox/mobile/RoundRectCategory",
    "dojox/mobile/Accordion",
    "dojox/mobile/ScrollableView",
    "dojox/mobile/SwapView",
    "dojox/mobile/View",
    "dojox/mobile/ListItem",
    "dojox/mobile/Button",
    "dojox/mobile/SimpleDialog",
    "dojox/mobile/Heading",
    "dojox/mobile/ProgressBar",
    "dojox/mobile/PageIndicator",
    
    "dijit/form/Form",
    "dijit/dijit", 
    "dojo",
    "dojo/date",
    "dojo/date/locale",

    "dojo/store/Observable",

    "dojo/ready",
    "dijit/form/NumberSpinner",
    "dijit/TitlePane",
   
    
    
    "dojox/calendar/Calendar",
    "dojox/calendar/MobileCalendar",
    "dojox/calendar/Calendar",
    "dojox/calendar/SimpleColumnView",
    "dojox/calendar/ColumnView",
    
    "dojox/calendar/ColumnViewSecondarySheet",
    "dojox/calendar/Touch",
    "dojox/calendar/Mouse",
    "dojox/calendar/MobileVerticalRenderer",
    "dojox/calendar/HorizontalRenderer",
    "dojox/calendar/ExpandRenderer"
    
    
	],

function(request,dom,win,array,parser,declare,Storehouse,fx,on) {
	
	
	
	parser.parse();
	
        var webappButton = dijit.byId("webappButton");
        var webapp = dijit.byId('webapp');
        
	var speed_diffusion = new Storehouse({
		storeId: 'speed_diffusion',
		idProperty: 'id'
	  });
        var storeProg = new dojo.store.Observable(speed_diffusion);
	var chaine = new Storehouse({
		storeId: 'chaine',
		idProperty: 'id_chaine'
	  }); 
	
        
        var colView = Array();
        
        
       
       
      // draw = function(){
           speed_diffusion.open().then(function(){
         
            //for(var n=0;n<3;n++){
            var n=0;
            colView[n] = declare([dojox.calendar.ColumnView, dojox.calendar.Touch,dojox.calendar.Mouse])({
                   // secondarySheetClass: secondarySheetClass,
                   //title:"TvFox",
                store: storeProg,
                query:function(item){
                        var bool = (parseInt(item.ordre) < (n+1)*10 && parseInt(item.ordre) > (n)*3);
                      // console.log(item);
                       //var bool = true;
                       return bool;
                },
                    layoutPriorityFunction:function (item,suivant){
                        var ordre = (item._item.ordre > suivant._item.ordre);
                        var date = (item._item.startDate > suivant._item.startDate);
                        var duree = (item._item.duree > suivant._item.duree);
                 
                        //console.log("item",item._item,suivant._item);
                    return (ordre );
                    },
                    summaryAttr:"summary",
                    cssClassFunc: function(item){ return 'Calendar'+item.ordre;},
                    verticalRenderer: dojox.calendar.MobileVerticalRenderer,
                   // horizontalRenderer: HorizontalRenderer,
                    expandRenderer: dojox.calendar.ExpandRenderer,
                    columnCount: 1,
                    hourSize: 120,
                    minHours:1,
                    maxHours: 24,
                    startDate:new Date(),
                horizontalGap:4,
                percentOverlap:0,
                timeSlotDuration:60
                   
            }, "cal"+n);
            
            
            colView[n].on("itemClick", function(e){
                
                    var vs = dojo.window.getBox();
                    
                    var width = vs.w -100;
                    
                    var debut =  dojo.date.locale.format(dojo.date.stamp.fromISOString(e.item.startTime),{selector:"time", timePattern: "HH:mm" , locale: "fr"});
                    var fin =  dojo.date.locale.format(dojo.date.stamp.fromISOString(e.item.endTime),{selector:"time", timePattern: "HH:mm" });
                    var duree = dojo.date.difference(dojo.date.stamp.fromISOString(e.item.startTime),dojo.date.stamp.fromISOString(e.item.endTime),"minute");
                    console.log(duree);
                    var dlg = new dojox.mobile.SimpleDialog({
                        closeButton:true,
                        closeButtonClass:"mblDomButtonSilverCircleRedCross",
                        style:'width:'+width +'px;'
                    });
                    
                    
                    win.body().appendChild(dlg.domNode);
                    
                    var texte = e.item.titre_diffusion;
                    texte +=  "<br>" + "<img  src=\"/Style/logos/logo"+e.item.ordre +".gif\">";
                    texte +=  " de  : " +  debut;
                    texte +=  ' à  : ' +  fin;
                    if(typeof e.item.texte == "string") texte +=  "<br>" +  e.item.texte;
                   
                    
                    if(e.item.photo != ''&& navigator.onLine)texte +=  "<br>" + "<img class=\"photopopup\" src=\"/Data/Images/"+e.item.photo +" \">";
                    
                   dom.create("div",{
                       class: "mblSimpleDialogText",
                       innerHTML: texte,
                       style:'width:'+width +'px;'
                   },dlg.domNode);
                   
                   //dojo.query(".mblSimpleDialogText").style("width", width);
                   var cancelBtn = new dojox.mobile.Button({
                        class: "mblSimpleDialogButton mblRedButton",
                        innerHTML: "Close"
                    });
                   cancelBtn.connect(cancelBtn.domNode, "click",
                         function(e){dlg.hide();});
                   cancelBtn.placeAt(dlg.domNode);
                    
                   dlg.show();
                   //piIns.start();
             });
             
             
           fx.fadeOut({
                node:"loadingPanel", 
                onEnd: function(node){
                        node.parentNode.removeChild(node)
             }}).play(500);
        });  
      // }
    
    install = function(){
	 
        var dlg = new dojox.mobile.SimpleDialog({closeButton:true,closeButtonClass:	"mblDomButtonSilverCircleRedCross"});
        
        win.body().appendChild(dlg.domNode);

       
       dom.create("div",{
           class: "mblSimpleDialogText",
           innerHTML: "Progression"
       },dlg.domNode);
        var pb = new dojox.mobile.ProgressBar({});
        pb.placeAt(dlg.domNode);

       var cancelBtn = new dojox.mobile.Button({
            class: "mblSimpleDialogButton mblRedButton",
            innerHTML: "Close"});
       cancelBtn.connect(cancelBtn.domNode, "click",
             function(e){dlg.hide();});
       cancelBtn.placeAt(dlg.domNode);

       dlg.show();
       
         var debut = new Date();
	 request("Remote/getProgramme.php", {
            handleAs: "json",
            preventCache:true
          }).then(function(data){
             speed_diffusion.open().then(function(){
                 var all = data.length;
                 pb.set("maximum",all);
                 var count = 0;
                 
                 array.forEach(data, function(entry, i){
                     
                     
                     
                     if(!speed_diffusion.get(entry.id)){
                       speed_diffusion.add(entry).then(function(){
                            if(Math.floor(count/10) == count/10  )pb.set("value",count.toString());


                            var fin_prog = new Date();
                             count++;
                             var duree = dojo.date.difference(debut,fin_prog,"second");
                          
                             if(count==all){
                                console.log( duree); 
                                dlg.hide();
                              }
                      });
                     }else{
                         pb.set("value",count.toString());
                         var fin_prog = new Date();
                         count++;
                        var duree = dojo.date.difference(debut,fin_prog,"second");
                       
                        if(count==all){
                            
                           dlg.hide();
                          
                          
                         }
                     }
                        
                           
                            
                      //
                        });
                        /**
                        speed_diffusion.applyData(data).then(function(res){
                            var fin_prog = new Date();
                            var duree = dojo.date.difference(debut,fin_prog,"second");
                            console.log( duree,"fin prog");
                         });
                         */
                          
                    });
          }, function(err){
            // Handle the error condition
          }, function(evt){
              console.log(evt);
            // Handle a progress event from the request if the
            // browser supports XHR2
          });
           
		
            dojo.xhrPost({
                handleAs:"json",
                preventCache:true,
                url:"Remote/getChaine.php",
                sync : false,
                load :dojo.hitch(this,function(response,ioArgs){
                    
                    chaine.open().then(function(){
                        // storehouse now is ready to be worked with
                        chaine.applyData(response).then(function(res){
                            var fin_chaine = new Date();
                            var duree = dojo.date.difference(debut,fin_chaine,"second");
                            console.log( duree,"fin chaine");
                         });

                    });
                })
            });	
	};
	
	refresh = function(){
            window.location.reload(false);
           
         };
        now = function(){

           var H = dojo.date.locale.format(new Date(),{selector:"time", timePattern: "H" });
            var T = new Date();
           //for(var n= 0;n<3;n++){
           var n=0;
            colView[n].set('startTimeOfDay', {hours: parseInt(H), duration: 250});
          
           colView[n].set("startDate",T);
           //}
        };
        tommorow = function(){
             var T = dojo.date.add(new Date(), "day", 1); 
            var n=0; 
            //for(var n= 0;n<3;n++){
            colView[n].set("startDate",T);
           //}
         }
         
        on(webappButton, "click", function(e) {

		e.preventDefault();
		// define the manifest URL
		var manifest_url = "http://tvfox.org/manifest.webapp";
		// install the app
		//alert(manifest_url );
		
		if(navigator.mozApps){
			
			var myapp = navigator.mozApps.install(manifest_url);
			myapp.onsuccess = function(data) {
			  // App is installed, remove button
                           // alert(data);
			
			  //this.parentNode.removeChild(this);
			  webapp.hide();
			};
			myapp.onerror = function(e) {
			  // App wasn't installed, info is in
			  // 
			 webapp.hide();
			  alert('Install failed, error: ' + this.error.name);
                          
			 };
		}else{
                    
                        webapp.hide();
                    alert('No support');
                    
                    
                }
	});
       
	//draw();
});
