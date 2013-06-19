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
    "dojox/mobile/ListItem",
    "dojox/mobile/Button",
    "dojox/mobile/SimpleDialog",
    "dojox/mobile/Heading",
    "dojox/mobile/ProgressBar",
     
    
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
	
        
        var colView;
        
        
       
	
        speed_diffusion.open().then(function(){
            
            
            /**
            calendar = new dojox.calendar.MobileCalendar({
                dateInterval: "day",
                selectionMode:"single",
                views:dojox.calendar.SimpleColumnView,
                query:function(item){
                     var bool = (parseInt(item.ordre) < 10);
                   // console.log(item);
                    //var bool = true;
                    return bool;
                },
                cssClassFunc: function(item){ return 'Calendar'+item.ordre;},
                decodeDate: function(s){
                    //console.log(s,dojo.date.locale.parse(s,{datePattern:"yyyy-mm-ddTh:m:s"}),new Date((s)),dojo.date.stamp.fromISOString(s));
                    return  new dojo.date.stamp.fromISOString(s);
                },
                columnViewProps:{
                    startDate:new Date(),
                    horizontalGap:4,
                    percentOverlap:0,
                    timeSlotDuration:60,
                    hourSize:120,
                    minHours:0,
                    maxHours:24,
                    layoutPriorityFunction:function (item,suivant){
                        var ordre = (item._item.ordre > suivant._item.ordre);
                        var date = (item._item.startDate > suivant._item.startDate);
                        var duree = (item._item.duree > suivant._item.duree);
                 
                        //console.log("item",item._item,suivant._item);
                    return (ordre );
                    },
                    
                    startTimeOfDay:{
                        hours:21,
                       duration:1000
                     }
                    
                },
                store: storeProg,
                style: "position:relative;width:100%;height:400px"
            }, "chart");
            
          */
            colView = declare([dojox.calendar.ColumnView, dojox.calendar.Touch,dojox.calendar.Mouse])({
                   // secondarySheetClass: secondarySheetClass,
                   title:"TvFox",
                    store: storeProg,
                     query:function(item){
                        var bool = (parseInt(item.ordre) < 10);
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
                   
            }, "chart");
            colView.startup();
            /*
            colView.set("startTimeOfDay",{
                        hours:10,
                       duration:1000
                     });
            */
            
            colView.on("itemClick", function(e){
                
                    var vs = dojo.window.getBox();
                    
                    var width = vs.w -100;
                    
                    var debut =  dojo.date.locale.format(new Date(e.item.startTime),{selector:"time", timePattern: "HH:mm" });
                    var fin =  dojo.date.locale.format(new Date(e.item.endTime),{selector:"time", timePattern: "HH:mm" });
                   
                    var dlg = new dojox.mobile.SimpleDialog({
                        closeButton:true,
                        closeButtonClass:"mblDomButtonSilverCircleRedCross",
                        style:'width:'+width +'px;'
                    });
                    console.log(dlg);
                    
                    win.body().appendChild(dlg.domNode);
                    
                    var texte = e.item.summary;
                    texte +=  "<br>" + "<img  src=\"/Style/logos/logo"+e.item.ordre +".gif\">";
                    texte +=  " de  : " +  debut;
                    texte +=  ' à  : ' +  fin;
                    if(typeof e.item.texte == "string") texte +=  "<br>" +  e.item.texte;
                   
                    
                    if(e.item.photo != '')texte +=  "<br>" + "<img class=\"photopopup\" src=\"/Data/Images/"+e.item.photo +" \">";
                    
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
           colView.set('startTimeOfDay', {hours: parseInt(H), duration: 250});
           var T = new Date();
           colView.set("startDate",T);
         };
        tommorow = function(){
             var T = dojo.date.add(new Date(), "day", 1);
             colView.set("startDate",T);
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
                            alert(data);
			
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
       
	
});
