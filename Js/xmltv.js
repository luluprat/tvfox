require([
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
	"dijit/form/Form",
	"dijit/dijit", 
	"dojo",
	"dojo/date",
	"dojo/date/locale",
	
	"dojo/store/Observable",
	"dojo/store/Memory",
	"dojo/store/Cache",
	"dojo/ready",
	"dojo/store/util/SimpleQueryEngine",
	"dojox/mobile/SimpleDialog",
	"dojox/mobile/Heading",
	"dojox/mobile/ProgressBar",
	"dojox/charting/Chart",
	"dojox/charting/plot2d/Bars",
	"dojox/charting/plot2d/Bubble",
        "dojox/charting/plot2d/Columns",
        "dojox/charting/plot2d/StackedColumns",
        "dojox/charting/plot2d/ClusteredColumns",
	"dojox/charting/plot2d/StackedBars",
	"dojox/charting/plot2d/ClusteredBars",
	"dojox/charting/plot2d/MarkersOnly",
	"dojox/charting/plot2d/Lines",
	"dojox/charting/plot2d/Default",
	"dojox/charting/themes/Tufte",
	"dojox/charting/themes/PrimaryColors",
	"dojox/charting/themes/Claro",
	"dojox/charting/themes/Tom",
	"dojox/charting/axis2d/Default",
	// Require the highlighter
    "dojox/charting/action2d/Highlight",
    "dojox/charting/action2d/Tooltip",
    "dojox/charting/action2d/Magnify",
 
    //  We want to use Markers
    "dojox/charting/plot2d/Markers",
    "dojox/charting/StoreSeries",
    "dojox/charting/widget/Chart",
    "dojox/gantt/GanttChart", "dojox/gantt/GanttProjectItem", "dojox/gantt/GanttTaskItem",
    "dojox/calendar/MobileCalendar",
    "dojox/calendar/ColumnView"
    
	],

function(array,parser,Storehouse,lang,on,ready,deviceTheme,sniff) {
	
	/**
	var Theme ;
	if(sniff("iphone")){
		deviceTheme.loadDeviceTheme("iphone");
		Theme = "iphone";
		
	}else {
		deviceTheme.loadDeviceTheme("Custom");
		Theme = "Custom";
	}
	
	alert(Theme);
	*/
	
	parser.parse();
	var bar;
	var speed_diffusion = new Storehouse({
		storeId: 'speed_diffusion',
		idProperty: 'id'
	  });
	var chaine = new Storehouse({
		storeId: 'chaine',
		idProperty: 'id_chaine'
	  }); 
	
	 
	var myForm = dijit.byId("formNom");
	//var nom = dijit.byId("nom");
	var progressBar = dijit.byId("progressBar");
	var dialog =  dijit.byId("dialog");
	var offlineButton = dijit.byId("offline");
	var webappButton = dijit.byId("webapp");
	var chart = dijit.byId("chart");
	
        var calendar;
	//nom.focus();
        speed_diffusion.open().then(dojo.hitch(this,function(){
            
            calendar = new dojox.calendar.MobileCalendar({
                dateInterval: "day",
                selectionMode:"single",
                query:function(item){
                     var bool = (item.chaine_nom==="TF1");
                     if(bool)console.log(item);
                    /**
                     *if(item.chaine_nom=="TF1"){
                        console.log(item);
                        bool = true;
                    }else{
                        bool = false;
                    }
                    */
                    return bool;
                },
                        //{"ordre":"1"}
                    
                cssClassFunc: function(item){ return 'Calendar'+item.ordre;},
                decodeDate: function(s){
                    return new Date(s);
                },
                columnViewProps:{
                    startDate:new Date(),
                    horizontalGap:10,
                    percentOverlap:0,
                    timeSlotDuration:60,
                    hourSize:600,
                    minHours:0
                    
                },
                store: new dojo.store.Observable(speed_diffusion),
                style: "position:relative;width:100%;height:400px"
            }, "chart");
            console.log(calendar);
            //calendar.columnView.set("startTimeOfDay", {hours:9, duration:1000});
            calendar.on("itemContextMenu", function(e){
                    dojo.stopEvent(e.triggerEvent);
                    console.log("itemContextMenu", e.item.summary);
                    if(e.item.calendar == undefined){
                            alert("itemContextMenu not ok");
                    }
            });

            calendar.on("itemClick", function(e){
                    console.log("itemClick", e.item.summary);
                    if(e.item.calendar == undefined){
                            alert("itemClick not ok");
                    }
            });
            calendar.on("itemDoubleClick", function(e){
                    console.log("itemDoubleClick", e.item.summary);
                    if(e.item.calendar == undefined){
                            alert("itemDoubleClick not ok");
                    }
            });
            calendar.on("itemRollOver", function(e){
                    console.log("itemRollOver", e.item.summary);
                    if(e.item.calendar == undefined){
                            alert("itemRollOver not ok");
                    }
            });
            calendar.on("itemRollOut", function(e){
                    console.log("itemRollOut", e.item.summary);
                    if(e.item.calendar == undefined){
                            alert("itemRollOut not ok");
                    }
            });

            // editing events
            calendar.on("itemEditBegin", function(e){
                    console.log("itemEditBegin", e.storeItem.summary);
                    if(e.storeItem.calendar == undefined){
                            alert("itemEditBegin not ok");
                    }
            });
            calendar.on("itemEditBeginGesture", function(e){
                    console.log("itemEditBeginGesture", e.storeItem.summary);
                    if(e.storeItem.calendar == undefined){
                            alert("itemEditBeginGesture not ok");
                    }
            });
            calendar.on("itemEditMoveGesture", function(e){
                    console.log("itemEditMoveGesture", e.storeItem.summary);
                    if(e.storeItem.calendar == undefined){
                            alert("itemEditMoveGesture not ok");
                    }
            });
            calendar.on("itemEditResizeGesture", function(e){
                    console.log("itemEditResizeGesture", e.storeItem.summary);
                    if(e.storeItem.calendar == undefined){
                            alert("itemEditResizeGesture not ok");
                    }
            });
            calendar.on("itemEditEndGesture", function(e){
                    console.log("itemEditEndGesture", e.storeItem.summary);
                    if(e.storeItem.calendar == undefined){
                            alert("itemEditEndGesture not ok");
                    }
            });
            calendar.on("itemEditEnd", function(e){
                    console.log("itemEditEnd", e.storeItem.summary);
                    if(e.storeItem.calendar == undefined){
                            alert("itemEditEnd not ok");
                    }
            });
            
            new dojox.calendar.ColumnView({
                itemToRendererKindFunc: function(item){
                    return item.allDay ||
                    this.dateFuncObj.difference(item.startTime, item.endTime, "minute") > 1440 ? "null" : "vertical";
                    },
                secondarySheetProps: {
                    itemToRendererKindFunc: function(item){
                    return item.allDay ||
                        this.dateFuncObj.difference(item.startTime, item.endTime, "minute") > 1440 ? "horizontal" : null;
                    }
                }
             });
            
          }));  
        
	
	affichage = function (response){
		
						var viewResult = dijit.byId("resultList");
						
						var Child = viewResult.getChildren();
						array.forEach(Child, function(entry, i){
							viewResult.removeChild(entry);
						});
						
						//var item1 = new dojox.mobile.RoundRectList({});
						var item1 = new dojox.mobile.Accordion({});
						viewResult.addChild(item1);
						var nom_precedent = '';
						var prenom_precedent = '';
						var item3_precedent;
						var item2_precedent;
						var fonction_precedente = '';
						console.log(response.length);
						if(response.length>0){
						array.forEach(response, function(entry, i){
							
							var item3;
							var f;
							if( nom_precedent != entry.title || prenom_precedent != entry["@attributes"].channel ){
								var item2 = new dojox.mobile.RoundRectList({
									label: '<span class="headList">' + entry["@attributes"].channel + ' ' + entry.title + '</span>'
								});	
								 item3 = new dojox.mobile.ListItem({
									 clickable: true ,
									 variableHeight	:true
									
								});
								 item1.addChild(item2);
								 f = entry.structure + ' : ' + entry.fonction;
								 
							}
							else{
								item2 = item2_precedent;
								item3 = item3_precedent;
								
								if(fonction_precedente ==  entry.structure + ' : ' + entry.fonction +  '<br>' )
									f = entry.structure + ' : ' + entry.fonction;
								else
									f = fonction_precedente + entry.structure + '  : ' +entry.fonction;
							}
															
							
							var content = item3.domNode.childNodes;
							
							content[0].innerHTML ='<span class="titleList">'+  f + '</span><br> '; 
							if(entry.bureau!="")content[0].innerHTML +=	'<span class="contentList"><img src="Style/orange/080.png"> ' + entry.bureau +'<br> </span>' ;
							if(entry.mailpro!="")content[0].innerHTML +=	'<span class="contentList"><a href="mailto:' + entry.mailpro +'" ><img src="Style/orange/005.png"> ' + entry.mailpro +'<br> </span>' ;
								
							if(entry.tel!="")content[0].innerHTML +=	'<span class="contentList"><a href="tel:' + entry.tel + '" ><img src="Style/orange/012.png"> ' + entry.tel + '</a></span>' ;
							
							
								
							item2.addChild(item3);	
							
							
							nom_precedent = entry.title;
							prenom_precedent = entry["@attributes"].channel;
							item3_precedent = item3;
							item2_precedent = item2;
							fonction_precedente =  entry.structure + ' : ' + entry.fonction +   '<br>' ;
						});
					}else{
						var item2 = new dojox.mobile.RoundRectList({
							label: '<span class="headList">Aucun résultat</span>'
						});	
						 item1.addChild(item2);
					}
						
						viewResult.startup();
		
		
	}
	/**
	on(myForm, "submit", function(e) {
		e.preventDefault();
		if (myForm.isValid()) {
			
			if(offlineButton.selected){
				var responseNom;
				var responsePrenom;
				var response;
				
				
				var Exp = new RegExp(nom.value,"i");
				speed_diffusion.open().then(function(){
					responseNom = speed_diffusion.query({ title:  Exp },{count:50,sort: [{attribute: "title", ascending: true},{attribute: "@attributes.channel", descending: false}]});
					
					
					
					affichage(responseNom);
				});
				
				
				
			}else{	
				console.log("online");
				dojo.xhrPost({
					handleAs:"json",
					preventCache:true,
					url:"Remote/getList.php",
					form:"formNom",
					sync : true,
					load :affichage
					
				});
			}
		}
	});
	*/
	install = function(){
		
		
		
            dojo.xhrPost({
                handleAs:"json",
                preventCache:true,
                url:"Remote/getProgramme.php",
                sync : true,
                load :dojo.hitch(this,function(response,ioArgs){
                    dialog.show();
                    var prog = response;
                    progressBar.set("maximum",prog.length);

                    speed_diffusion.open().then(function(){
                            // storehouse now is ready to be worked with
                        var data = speed_diffusion.applyData(prog);


                        
                        dialog.hide();
                    });
                })
            });	
		
            dojo.xhrPost({
                handleAs:"json",
                preventCache:true,
                url:"Remote/getChaine.php",
                sync : true,
                load :dojo.hitch(this,function(response,ioArgs){
                    dialog.show();
                    var c = response;
                    progressBar.set("maximum",c.length);

                    chaine.open().then(function(){
                        // storehouse now is ready to be worked with
                        var data = chaine.applyData(c);

                        
                        dialog.hide();

                    });
                })
            });	
	}
	
	offline = function(){
		console.log();
	}
	/**
	on(webappButton, "click", function(e) {

		e.preventDefault();
		// define the manifest URL
		var manifest_url = "http://audience.ac-creteil.fr/mobile/manifest.webapp";
		// install the app
		//alert(manifest_url );
		
		if(navigator.mozApps){
			
			var myapp = navigator.mozApps.install(manifest_url);
			myapp.onsuccess = function(data) {
			  // App is installed, remove button
			//alert(data);
			console.log(webappButton);
			  //this.parentNode.removeChild(this);
			  webappButton.hide();
			};
			myapp.onerror = function(e) {
			  // App wasn't installed, info is in
			  // 
			 console.log(webappButton);
			  alert('Install failed, error: ' + this.error.name);
			 };
		}
	});
	**/
	// get a reference to the button and call install() on click
	afficher = function(){
		
		// recuperation //
		var maintenant = new Date();
		speed_diffusion.open().then(function(){
			//.log("recherche");
			programmes = speed_diffusion.query(function(object){
				//console.log(new Date(object.date_diffusion) , maintenant);
				
				return (new Date(object.date_diffusion) < dojo.date.add(maintenant, "hour", +1)) && (new Date(object.date_diffusion) > dojo.date.add(maintenant, "hour", -1));
			},
			{
				//count:50,
				sort: [{attribute: "ordre", ascending: true},{attribute: "date_diffusion", ascending: true}]}
			)
			// programmes = speed_diffusion.query({ date_diffusion:  Exp },{count:50,sort: [{attribute: "ordre", ascending: true}]});
			//console.log(programmes);	
			drawProgram(programmes);
		});
		
				
				
	};
	
	draw = function(programmes){
		var label = new Array();
		n = dojo.byId("chart");
		bar = new dojox.charting.widget.Chart(n,{
			markers: true
			});
			bar.addPlot("default", {type: "Bars",label: true, labelStyle: "outside",labelOffset: 25});
			bar.setTheme(dojox.charting.themes.Tom);
			
			var chaine_nom = new Array();
			var size = new Array();
			var plot = new Array();
			var X=1;
			
			
			/*
			 * 
			 * chart.addSeries("y", new StoreSeries(store, { query: { site: 1 } }, "value"));
			 *new  StoreSeries(store,kwArg,function getValueObject(item, store){
			  // let's create our object
			  var o = {
				x: item["order"],
				y: item["value"],
				tooltip: item["title"],
				color: item["urgency"] ? "red" : "green"
			  };
			  // we can massage the object, if we want, and return it
			  return o;
			}
			* */
			
			
			array.forEach(programmes, function(entry, i){
				var heure =  parseInt(dojo.date.locale.format(new Date(entry.date_diffusion), {selector:"date", datePattern:"H" } ));
				var minute = parseInt(dojo.date.locale.format(new Date(entry.date_diffusion), {selector:"date", datePattern:"mm" } ))/60*100;
				var dat = parseFloat(heure+"."+minute);
				chaine_nom[i] = entry.chaine_nom;
				/**
				if(entry.duree_diffusion > 40) size[i]= 2; 
				else if(entry.duree_diffusion > 10) size[i]=entry.duree_diffusion/20
				else size[i]= 0.5;
				*/
				plot[i] = new Array();
				plot[i].push(dat );
				plot[i].push({x:X,y:dat,size:size[i-1]})
				
				if(i>0){
					if(chaine_nom[i] == chaine_nom[i-1]){
						plot[i-1].push(dat);
						
						//plot[i-1].push({x:X,y:dat,size:size[i-1]});
						plot[i] = plot[i-1];
					}else{
						console.log(plot[i-1],i-1);
						bar.addSeries(chaine_nom[i-1],plot[i-1]);
						//{ x: x0, y: y0, size: size0 },
						label.push({'value': X, 'text': chaine_nom[i-1]});
						X++;
						
					}
				}
				
			});
			/**
			bar.addAxis("x", {
					majorLabels: true, 
					minorLabels: true, 
					includeZero: false, 
					minorTicks: false, 
					microTicks: false,
					majorTickStep: 2,
					htmlLabels: true,                                                                    
					labelFunc: function(value){
						return value + " s";
					},
					//maxLabelSize: 30,
					fixUpper: "major", fixLower: "major",                                                
					majorTick: { length: 3 }
				});
			*/
			console.log(label);
			bar.addAxis("y", {
				labels: label,
				includeZero: false,
				vertical: true
				});
			var min =  parseInt(dojo.date.locale.format(new Date(), {selector:"date", datePattern:"H" } ));
				
			bar.addAxis("x", {
					labelFunc: function(value){
						return value + " mn";
					},
					//maxLabelSize: 50,
					min:min,
					vertical: false,
					includeZero: false,
					 htmlLabels: true
					
				});
		console.log(bar);
		new dojox.charting.action2d.Highlight(bar,"default");
		bar.render();	
		
	};
	
        drawProgram = function(){



                n = dojo.byId("chart");
                bar = new dojox.charting.Chart(n,{
                        markers: true
                });
                bar.addPlot("default", {type: "Bubble",gap: 5,label: true});
                bar.setTheme(dojox.charting.themes.PrimaryColors);


                    var tabChaine= new Array();
                    var tabProg= new Array();
                    chaine.open().then(dojo.hitch(this,function(){
                        speed_diffusion.open().then(dojo.hitch(this,function(){

                            chaine.query({},{sort: [{attribute: "ordre", ascending: true}]}).forEach(function(obj){
                                 console.log(obj);
                                 tabChaine[obj.ordre] = obj.chaine_nom;
                                 
                                
                                
                                
                                
                                
                                
                                
                                
                                 var SS = new dojox.charting.StoreSeries(
                                    speed_diffusion,
                                    { 
                                            query : function(object){

                                                    var maintenant = new Date();
                                                    var Bool = ((new Date(object.date_diffusion) < dojo.date.add(maintenant, "hour", +1)) && (new Date(object.date_diffusion) > dojo.date.add(maintenant, "hour", -1))&&(object.chaine_nom == obj.chaine_nom));

                                                    return Bool;
                                            },

                                            //count:50,
                                            sort: [{attribute: "ordre", ascending: true},{attribute: "date_diffusion", ascending: true}]
                                    }
                                    ,
                                    function getValueObject(item, store){
                                            tabProg[item.id_diffusion]=item["titre_diffusion"];
                                            var heure =  parseInt(dojo.date.locale.format(new Date(item["date_diffusion"]), {selector:"date", datePattern:"H" } ));
                                            var minute = parseInt(dojo.date.locale.format(new Date(item["date_diffusion"]), {selector:"date", datePattern:"mm" } ))/60*100;
                                            var dat = parseFloat(heure+"."+minute);

                                           var o = {
                                            y: dat,
                                            x: item["ordre"],
                                            size:item["duree_diffusion"]/100,
                                            tooltip: item["titre_diffusion"],
                                            //color: item["urgency"] ? "red" : "green",
                                            legend:item["titre_diffusion"]
                                           };
                                           return o; 
                                    }
                              );
                            
                            bar.addSeries(obj.chaine_nom,SS);


                            });

                            bar.addAxis("y", {
                                    labels: "text",
                                    includeZero: false,
                                    vertical: true
                            });
                            var min =  parseInt(dojo.date.locale.format(new Date(), {selector:"date", datePattern:"H" } ));

                            bar.addAxis("x", {
                                labelFunc: function(text,value,precision){
                                    console.log(tabChaine[value],value);
                                        return ''+tabChaine[value]+'';
                                },
                                natural: true,
                                //maxLabelSize: 50,
                                //min:min,
                                
                                majorLabels: true,
                                minorTicks: true,
                                minorLabels: true,

                                includeZero: false,
                                 htmlLabels: true,
                                microTicks: true,
                                microLabels:true
                            });

                            //SS.fetch();

                            var tip = new dojox.charting.action2d.Tooltip(bar, "default",{text:function(value,text){
                                    console.log(value,text);
                                    console.log(value.x,value.chart.series[value.x])
                                    //tabProg[value.id_diffusion];
                                
                            }});
                            var magnify = new dojox.charting.action2d.Magnify(bar, "default");
                            var highlight = new dojox.charting.action2d.Highlight(bar, "default");

                            bar.render();
                            console.log("fin");


                          }));  
                    }));

               
		
	}
        
        drawGantt = function(){

    
                
            //n = dojo.byId("chart");
            var ganttChart = new dojox.gantt.GanttChart({
              readOnly: false,        // optional: determine if gantt chart is editable
              dataFilePath: "gantt_default.json",    // optional: json data file path for load and save, default is "gantt_default.json"
              height: 400,            // optional: chart height in pixel, default is 400px
              width: 1200,            // optional: chart width in pixel, default is 600px
              withResource: true,// optional: display the resource chart or not
              withTaskId:false
            }, "chart");  
            
            
             var project = new dojox.gantt.GanttProjectItem({
                id: 1,
                name: "XMLTV",
                startDate: new Date()
              });
       
 
  

            
              var maintenant = new Date();
             
               speed_diffusion.open().then(function(){	

                    speed_diffusion.query(function(obj){
                          return (new Date(obj.date_diffusion) < dojo.date.add(maintenant, "hour", +1)) && (new Date(obj.date_diffusion) > dojo.date.add(maintenant, "hour", -1));
                        },{
                                  //count:50,
                                  sort: [{attribute: "ordre", ascending: true},{attribute: "date_diffusion", ascending: true}]}
                          ).forEach(dojo.hitch(this,function(dif){
                                  var D = dojo.date.locale.format(new Date(dif.date_diffusion), {selector:"date", datePattern:"H" });
                                  console.log(new Date(dif.t));
                                
                            var prog = new dojox.gantt.GanttTaskItem({
                                id: dif.id_diffusion,
                                name: dif.titre_diffusion,
                                startTime: new Date(dif.date_diffusion),
                                duration: dif.duree_diffusion/1440,
                                percentage: 0,
                               taskOwner: dif.chaine_nom
                               
                            });
                            project.addTask(prog);
                           
                       }));
                    ganttChart.addProject(project);

  // Initialize and Render
  ganttChart.init();

                });
                
                        
         }
         
        drawCalendar = function(){

           
           
           
             calendar.refreshRendering();
             console.log("refresh");
                   
                   // chaine.open().then(dojo.hitch(this,function(){
                        
                       
                //    }));

               
		
	} 
         
       
	
});
