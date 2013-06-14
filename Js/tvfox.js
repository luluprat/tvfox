require([
    "dojo/dom-construct",
    "dojo/_base/window",
    "dojo/_base/array",
    "dojox/mobile/parser", 
    "storehouse/Storehouse",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/ready",
    "dojox/mobile/deviceTheme",
    "dojo/sniff",
    "storehouse/engines/cookie",
    "storehouse/engines/indexeddb",
    "storehouse/engines/localstorage",
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
    "dijit/form/Form",
    "dijit/dijit", 
    "dojo",
    "dojo/date",
    "dojo/date/locale",

    "dojo/store/Observable",

    "dojo/ready",
    "dojo/store/util/SimpleQueryEngine",
    "dojox/mobile/SimpleDialog",
    "dojox/mobile/Heading",
    "dojox/mobile/ProgressBar",
    
    

    "dojox/calendar/MobileCalendar",
    "dojox/calendar/Calendar",
    "dojox/calendar/ColumnView"
    
	],

function(dom,win,array,parser,Storehouse) {
	
	
	
	parser.parse();
	
	var speed_diffusion = new Storehouse({
		storeId: 'speed_diffusion',
		idProperty: 'id'
	  });
	var chaine = new Storehouse({
		storeId: 'chaine',
		idProperty: 'id_chaine'
	  }); 
	var dialog =  dijit.byId("dialog");
        
        var calendar;
	
        speed_diffusion.open().then(function(){
            
            calendar = new dojox.calendar.Calendar({
                dateInterval: "day",
                selectionMode:"single",
              
                query:function(item){
                    // var bool = (item.ordre =="1");
                    var bool = true;
                    return bool;
                },
                cssClassFunc: function(item){ return 'Calendar'+item.ordre;},
                decodeDate: function(s){
                    return new Date(s);
                },
                columnViewProps:{
                    startDate:new Date(),
                    horizontalGap:10,
                    percentOverlap:0,
                    timeSlotDuration:60,
                    hourSize:200,
                    minHours:0,
                    maxHours:24,
                    layoutPriorityFunction:function (item,suivant){
                
                    console.log("item",item._item,suivant._item);
                    return (item._item.ordre<suivant._item.ordre);
                    }
                },
                store: new dojo.store.Observable(speed_diffusion),
                style: "position:relative;width:100%;height:800px"
            }, "chart");
          
          
          

            calendar.on("itemClick", function(e){
                    var debut =  dojo.date.locale.format(new Date(e.item.startTime),{selector:"time", timePattern: "HH:mm" });
                    var fin =  dojo.date.locale.format(new Date(e.item.endTime),{selector:"time", timePattern: "HH:mm" });
                    var dlg = new dojox.mobile.SimpleDialog({closeButton:true,closeButtonClass:	"mblDomButtonSilverCircleRedCross"});
                    win.body().appendChild(dlg.domNode);
                    
                    var texte = e.item.summary;
                    if(typeof e.item.texte == "string") texte +=  "<br>" +  e.item.texte;
                    texte +=  "<br> de  : " +  debut;
                    texte +=  '<br> à  : ' +  fin;
                    if(e.item.photo != '')texte +=  "<br>" + "<img class=\"photopopup\" src=\"/Data/Images/"+e.item.photo +" \">";
                    
                   dom.create("div",{
                       class: "mblSimpleDialogText",
                       innerHTML: texte
                   },dlg.domNode);
                   
                   
                   var cancelBtn = new dojox.mobile.Button({
                        class: "mblSimpleDialogButton mblRedButton",
                        innerHTML: "Close"});
                   cancelBtn.connect(cancelBtn.domNode, "click",
                         function(e){dlg.hide();});
                   cancelBtn.placeAt(dlg.domNode);
                    
                   dlg.show();
                   //piIns.start();
             });
       });  
    
    install = function(){
		
            var debut = new Date();
		
            dojo.xhrPost({
                handleAs:"json",
                preventCache:true,
                url:"Remote/getProgramme.php",
                sync : false,
                load :dojo.hitch(this,function(response,ioArgs){
                    speed_diffusion.open().then(function(){
                        speed_diffusion.applyData(response).then(function(res){
                            var fin_prog = new Date();
                            var duree = dojo.date.difference(debut,fin_prog,"second");
                            console.log( duree,"fin prog");
                         });

                          
                    });
                })
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
	
	drawCalendar = function(){

           calendar.refreshRendering();
           console.log("refresh");
         };
         
       
	
});
