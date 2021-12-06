/*
This management script is doing businness-as-usual activities on the full landscape of our study area in the Low Tatra for iLand model.
Laura Dobor
2017/08/18 - 2021/10/14
We have one agent and one unit. But have 2 stps: one for stand where beech and fir presents (in 0, or 1 layer), they go to stp2 to a shelterwood management (1b), others go to stp1 (1a) small scale clearcut.
This selection was done in preprocess (in R).
Activities that this script is doing:
Planting
Tending
Thinning max 4 times in one rotation period
Regeneration cut: in shelterwood cases
Clearcut
Salvaging: We added there salvaging in order to remove dead trees which produced in the BB module.
 */



//--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
//                                                 ---       P L A N T I N G  ----
//
//  At the input file there are columns with the fractions how planting should be done: PlantPiab	PlantAbal	PlantPisy	PlantFasy	PlantLade	PlantBrLf
//  Values are summing up to 1.  The last one is BrLf means broadleaf, and distributed into acps (40%), frex(30%) and ulgl(30%). 
// Defines a fraction 0-1 of 2x2m pixels for which to plant trees of the given species. The `fraction` is interpreted as a probability, i.e. for each 2x2m pixel a random number decides whether to plant or not.
//   Planting is in 2nd year of every rotation (schedule: 2 )
//   50 cm high trees are planted wall to wall
//   We are not clearing the existing tree saplings at the site. (clear: false)

var a_planting = {
	 type: "planting", 
	 schedule: 2 ,    
	 items: [ {species: "piab",  height: 0.5, fraction: function() { return  stand.flag("PlantPiab");}, clear: false},
		  {species: "abal",  height: 0.5, fraction: function() { return  stand.flag("PlantAbal");}	},
		  {species: "lade",  height: 0.5, fraction: function() { return  stand.flag("PlantLade");}	},
		  {species: "pisy",  height: 0.5, fraction: function() { return  stand.flag("PlantPisy");}	},
		  {species: "fasy",  height: 0.5, fraction: function() { return  stand.flag("PlantFasy");}	},
                       
		  {species: "acps",  height: 0.5, fraction: function() { return  (4*stand.flag("PlantBrLf")/10)	;}},
		  {species: "frex",  height: 0.5, fraction:  function() { return (3*stand.flag("PlantBrLf")/10);}	},
		  {species: "ulgl",  height: 0.5, fraction:  function() { return (3*stand.flag("PlantBrLf")/10);}	}],
// Here just doing logging to logfile:
	 onExit: function() { 	fmengine.log("Planting piab fraction= " + stand.flag("PlantPiab") );
    			     	fmengine.log("Planting lade fraction= " + stand.flag("PlantLade") );
				fmengine.log("Planting abal fraction= " + stand.flag("PlantAbal") );
			      	fmengine.log("Planting pisy fraction= " + stand.flag("PlantPisy") );
				fmengine.log("Planting fasy fraction= " + stand.flag("PlantFasy") );
				fmengine.log("Planting acps fraction= " + (4*stand.flag("PlantBrLf")/10));
				fmengine.log("Planting frex fraction= " + (3*stand.flag("PlantBrLf")/10));
				fmengine.log("Planting ulgl fraction= " + (3*stand.flag("PlantBrLf")/10));}
};

//--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
//                                                      ---  T E N D I N G    --->          
// Tending is scriped as a manual activity (there is no builit-in tending module like planting, so this is more detailed here
// 3 activity, because for different SIs tended at different age. 
// For a given stand only that one is activated which is needed. This is set based on input data file, checking which years is written into tending column. To make it active is set in the bottom of this script.
// 
// now the tree selection is based on dbh, going from the smallest.              


////  
var a_tending = { type: "scheduled",     
	                schedule: { minRel: 0.19, optRel: 0.20, maxRel: 0.21, force: false}, // the min-max window  force true: if there is a stand which is older than this it will cut in the 0 year
                    onEvaluate: function(){ 
                                  trees.loadAll();    // Load all trees from the stand
                                              

	fmengine.log("We need to remove this total volume at tending: "+stand.volume*stand.area*20/100);             		
             
				   trees.sort("dbh");      // Sort trees: small trees at the beginning of the list
				   trees.filter("incsum(volume) < " + (stand.volume*stand.area*20/100)     );      // Select as much trees to have the volume that we need to remove 
				   trees.simulate=false;    // Removes trees next line immediately.
                   trees.harvest();
                   trees.loadAll();
                                   
	fmengine.log("Stand volume after tending: "+stand.volume*stand.area);	 
                                   return true;  },   // end on onevaluate
			onExecute: function() {}
}


//--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
//                                                      ---  T H I N N I N G S  --->   

// http://iland-model.org/ABE+activity+thinning
// For thinnings there are build in method, and we use it. Stand top height must be > 4m, dbh>5cm


var a_thinning1 = { type: "thinning", 
				   schedule: { minRel: 0.34, optRel: 0.35, maxRel: 0.36 , force=true},
				   constraint: ["stand.topHeight>4"],
                                   thinning: "custom",
				   onEvaluate: function() { console.log("1st THINNING ");return true;},
				   targetValue: 35,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [45, 45, 10, 0, 0]
}


var a_thinning2 =  {type: "thinning", 
				   schedule: { minRel: 0.49, optRel: 0.5, maxRel: 0.51, force=true },
				   constraint: ["stand.topHeight>4"],
                                   thinning: "custom",
				   onEvaluate: function() {console.log("2nd THINNING ");return true;},
			           targetValue: 22,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [45, 45, 10, 0, 0]
}


var a_thinning3 =  {type: "thinning", 
				   schedule: { minRel: 0.59, optRel: 0.6, maxRel:0.61, force=true },
				   constraint: ["stand.topHeight>4"],
                                   thinning: "custom",
				   onEvaluate: function() {console.log("3nd THINNING ");return true;},
				   targetValue: 17,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [45, 45, 10, 0, 0]
}





///             F R O M   A B O V E    A T   S T P 2     
  
 
var a_thinning3_FA =  {type: "thinning", 
				   schedule: { minRel: 0.59, optRel: 0.6, maxRel:0.61 , force=true},
				   constraint: ["stand.topHeight>4"],
                                   thinning: "custom",
				   onEvaluate: function() {console.log("3nd THINNING ");return true;},
				   targetValue: 17,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [0, 0, 10, 45, 45]
}



//- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
//                                                      ---  R E G E N E R A T I O N    C U T S  --->   


/// This is a harvest before the clearcut, which used the shelterwood stands. the timing relative to the rotation period 75-80% of full rotation
/// The intensity is 40% of volume to remove


 var a_regcut = { type: "scheduled",
					schedule: { minRel: 0.75, optRel: 0.785, maxRel: 0.8, force: true},
					onEvaluate: function() {
						 trees.loadAll(); 
						 
 	fmengine.log("Volume of the stand per ha before REGCUT: "+stand.volume);
 	fmengine.log("Stand area: "+stand.area);
 	fmengine.log("Volume of the stand: "+stand.volume*stand.area);

					var nbefore=trees.count
					var volumetoremove=stand.volume*stand.area*60/100  

	fmengine.log("We need to remove total volume of : "+volumetoremove);
		
                    trees.sort("-dbh")                // Sort trees: thick trees at the beginning of the list
                    trees.filter("incsum(volume) < " + volumetoremove);      // We select the 40% of the volume
				     		 		
				    trees.simulate=false;    // Removes trees next line immediately.
                    trees.harvest();

   fmengine.log("Volume per ha after regcut: "+stand.volume);	
                     trees.loadAll();
                     var nafter=trees.count
                           
	fmengine.log("Number of trees before vs after: "+nbefore+" vs "+nafter);
                     return true; 
					 },   
			onExecute: function() { },
			

};



//- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
//                                                      ---   C L E A R C U T S  --->   



/// final harvest for all stands, specific dbh treshold can be set in the options of the stp
//  we use general 10 cm dbh threshold

// clearcut for STP1: we removed all the saplings and clear the whole stand:
var a_clearcut =  { type: "scheduled",
		   schedule: { minRel: 0.95, optRel: 1.0, maxRel: 1.05, force=true },
				onEvaluate: function(){ 
                      trees.loadAll();
                      if (stp.options.dbh!=undefined) {
                          trees.harvest("dbh>" + stp.options.dbh );
                          fmengine.log("clearcut: using threshold: " + stp.options.dbh );
                      } else {
                          trees.harvest("dbh>5"); 
                      }
                      return true; },
				  onExecute: function() { 
        fmengine.log("I really do the harvest..."); 

					    trees.removeMarkedTrees(); // but do the same thing as the default operation 
		fmengine.log("removed " + n + " saplings");
                        trees.killSaplings("");
						 },
					onCreate: function() { activity.finalHarvest=true; },
					onSetup: function() {  },
					

};

// clearcut for STP2: we do NOT removethe saplings + we remove only trees that are older than the 50% of the rotation time.

var a_clearcut_sw =  { type: "scheduled",
			 schedule: { minRel: 0.95, optRel: 1.0, maxRel: 1.05, force=true },

			onEvaluate: function(){ 

	fmengine.log("finalHarvest:" + activity.finalHarvest);
					trees.loadAll();

	fmengine.log("---THE U WHAT iLAND USE HERE:" + stand.U);
	fmengine.log("Number of trees before selecting: "+trees.count);

					trees.filter("age>80")

	fmengine.log("clearcut: using age threshold:80 " );
	fmengine.log("Number of trees after selecting: "+trees.count);

					trees.harvest(); 
					return true; 
                                        
 					},
			onExecute: function() { 
         fmengine.log("I really do the harvest..."); 
					trees.removeMarkedTrees(); 	
                 			},
					onCreate: function() {activity.finalHarvest=true;  },
					onSetup: function() {  } 
					

};


//- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
//                                                      ---   S A L V A G E R  ---> 
// http://iland-model.org/ABE+activity+salvage
// after disturbances salvager start to work:
// We set in project file what % to remove after disturbance. We remove only trees with dbh>10
// We look how many trees remained after the disurbance, and if the thresholds exceeds the onExecute part gets active. In this case We reset the stand to have rotation start again, and do planting, after the damage, and salvage.
// NOTE: salvager is doing the restart of stands after big disturbance, so even if we do not want to make salvage, needed to set some small value to project file to activate this feature of restarting. e.g 0.1% to remove or sth like this.

var a_salvager = { type: 'salvage',  schedule: { repeat: true },
    		 disturbanceCondition: "dbh>10 and rnd(0,1)<"+Globals.setting('user.salvage.remove'),
    		 onExecute: function() {
		 trees.loadAll();
		  
 fmengine.log("Remained after disturbance: " + trees.count + " normal trees");
                 var n = trees.killSaplings('');
 fmengine.log("Plus remained: " + n + " saplings");
 fmengine.log("We do not do harvest, and clearing, only RESET")

                fmengine.runActivity(stand.id, "planting"); // assuming the name of the activity is "planting"      
 fmengine.log("PLANTING AFTER RESET");

	//stand.trace = true; // enable tracing ...
		
	 },

	 debugSplit: false,
	 thresholdIgnoreDamage: 10, // modified, WR: was 100000  above this threshold clearing and splitting is tested
	 thresholdClearStand: 0.8,  // added WR    if the relative damage is higher than this,the onExecute part is activated, and we do resart of the rotation there.
	 thresholdSplitStand: 1.0, // added WR (no splitting)   if this is smaller than the clearstand, it is splitted if rel.damage higher than this value. WE do not want stands to be splitted and re-numbered.
     




    }			

// now for STP2 it is the same as to stp1
var a_salvager_sw = { type: 'salvage',  schedule: { repeat: true , force:true},
     disturbanceCondition: "dbh>10 and rnd(0,1)<"+Globals.setting('user.salvage.remove'),
     onExecute: function() {
		 
		 trees.loadAll();
		 //trees.harvest("dbh>5");  // ... WE DO NOT DO CLEARING
		  
   fmengine.log("Remained after disturbance: " + trees.count + " normal trees");
                  var n = trees.killSaplings('');
   fmengine.log("Plus remained: " + n + " saplings");
                 //trees.killSaplings("");
   fmengine.log("We do not do harvest, and clearing, one RESET")

                fmengine.runActivity(stand.id, "planting"); // assuming the name of the activity is "planting"      
                fmengine.log("PLANTING AFTER RESET");
		 //stand.trace = true; // enable tracing ...
	
	 },

	 debugSplit: false,
	 thresholdIgnoreDamage: 10, // modified, WR: was 100000  above this threshold clearing and splitting is tested
	 thresholdClearStand: 0.8,  // added WR    if the relative damage is higher than this, it is cleared
	 thresholdSplitStand: 1.0, // added WR (no splitting)   if this is smaller than the clearstand, it is splitted if rel.damage higher than this value

    }	


var stand_monitor= { type: 'general', schedule: { repeat: true, repeatInterval: 5 },
                     action: function() {
                         fmengine.log('stand_monitor active: piab: ' + stand.relSpeciesBasalAreaOf('piab'));
                         if (stand.relSpeciesBasalAreaOf('piab')>0.5) {
                             // or some other condition
                             fmengine.log('switch stand ' + stand.Id + ' to other STP');
                             stand.stp = 'STP1';
                         }
                     }
        }
		
		
/// This show what activites are set for STP1 and STP2		
var stp1 = { U: [100,100,100], // short/normal/long rotation age --- are ignored if U is provided in input file  ... we have it in .csv
            options: {}, 
			planting: a_planting, 
            tending: a_tending,
			
			thinning1: a_thinning1,
			thinning2: a_thinning2,
			thinning3: a_thinning3,

			clearcut: a_clearcut,
			//salvaging: a_salvager,
			stand_monitor1: stand_monitor,
                  onInit: function() {}  
			
};

var stp2 = { U: [120,120,120], // short/normal/long rotation age
            options: {}, // no options
			//planting: a_planting,
            tending: a_tending,
			
			thinning1: a_thinning1,
			thinning2: a_thinning2,
			thinning3_FA: a_thinning3_FA,
                		
			regcut: a_regcut,
 			clearcut_sw: a_clearcut_sw ,
			//salvaging_sw: a_salvager_sw,
			stand_monitor1: stand_monitor,
    		onInit: function() {}
};

// register the stand treatment program stp with the name 'stp'
console.log('adding STPs...');
fmengine.addManagement(stp1, 'STP1');
fmengine.addManagement(stp2, 'STP2');


// minimal agent type
var base_agent = {
	scheduler: { 
		 enabled: true,
                 minScheduleHarvest: 1,
		 maxScheduleHarvest: 10,
		 scheduleRebounceDuration: 15,
		 maxHarvestLevel: 1.5, // default: 1.5
		 deviationDecayRate: 0.1,  // default: 0.1
		 useSustainableHarvest: 0,   // 0 is bottom-up harvest planning (i.e., stands are always processed at their optimal dates), and 1 is top-down approach (i.e, the scheduling algorithm decides when a stand should be processed).
		 harvestIntensity: 1}, 

	// a list of all STPs the agent has access to....
	stp: {  'STP1': 'STP1' ,'STP2': 'STP2', 'default':'STP2'	},
	newAgent: function() { return {  scheduler: this.scheduler }; },

        onSelect: function() { if (stand.relSpeciesBasalAreaOf('piab')>0.50) {
			               console.log(stand.relSpeciesBasalAreaOf('piab')) ;
								console.log('we should go back to STP1');
								return 'STP1';
								}; 
							   if (stand.relSpeciesBasalAreaOf('piab')<=0.50) {
								   console.log(stand.relSpeciesBasalAreaOf('piab')) ;
								   console.log('we are in STP2');
							     return 'STP2';
		}},
	run: function() { console.log('base-agent run called');
                         console.log(stand.relSpeciesBasalAreaOf('piab'))  }
};






console.log('adding Agents...');
// register the agent-factory object base_agent under the name agenttype
fmengine.addAgentType(base_agent, 'agenttype');
// use the 'agenttype' agent-factory and create an agent named 'agent'
fmengine.addAgent('agenttype', 'agent');


// Writing out grids:   this is only to write out some grids (maps) of some info...

function onYearEnd()
{
 console.log("GlobalEvent: on year end: " + Globals.year);



}
