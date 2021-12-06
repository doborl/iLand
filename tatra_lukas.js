
/*

Edit this part with Lukas STPs...

This management script is doing businness-as-usual activities on the full landscape of our study area in the Low Tatra for iLand model.
MARCO BALDO
2021/12/01 - 2021/12/03

We have one agent and one unit. 1 stp: WE PLANT 60% Pinus sylvestris (Scotch Pine) and 40% Quercus petraea (Sessile Oak). We used only stp1 with planiting 9 thinning and with a finalcut shelterwood type. yer), shelterwood management (1b).
This selection was done in preprocess (in R).

Activities that this script is doing:

Planting
Thinning x9 with 1 sw times in one rotation period
Shelterwood (sw) Finalcut




 */



//--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
//                                                 ---       P L A N T I N G  ----
//
//  At the input file there are columns with the fractions how planting should be done: PlantPiab	PlantAbal	PlantPisy	PlantFasy	PlantLade	PlantBrLf
//  Values are summing up to 1.  The last one is BrLf means broadleaf, and distributed into acps (40%), frex(30%) and ulgl(30%). 
//  Defines a fraction 0-1 of 2x2m pixels for which to plant trees of the given species. The `fraction` is interpreted as a probability, i.e. for each 2x2m pixel a random number decides whether to plant or not.
//  Planting is in 2nd year of every rotation (schedule: 2 )
//  50 cm high trees are planted wall to wall
//  We are not clearing the existing tree saplings at the site. (clear: false)



var a_planting_3 = {
	 type: "planting", 
	 schedule: 2 ,    
	 items: [ {species: "pisy",  height: 0.5, fraction: 0.6 , clear: false},
		  {species: "qupe",  height: 0.5, fraction: 0.4 	}],
		  
// Here just doing logging to logfile:
	 onExit: function() { 	fmengine.log("Planting pisy fraction= 0.6" );
    			     	fmengine.log("Planting qupe fraction= 0.4" ); }
};



//--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
//                                                      ---  T H I N N I N G S  --->   

// http://iland-model.org/ABE+activity+thinning
// For thinnings there are build in method in the Bilek L., excel file, and we use it. Stand top height and dbh variable CHANGE DURING THE ACTIVITY/AGE
// WE ARE USING THE METHOD_3_STP -> 3 IS THE KIND OF SOIL (ACIDIC SITE). 
// WE ARE USING SHELTERWOOD MANAGEMENT FOR FINELCUT.


var a_thinning31 = { type: "thinning", 
				   schedule: { minRel: 0.09, optRel: 0.10, maxRel: 0.11 , force=true},
				   constraint: ["stand.topHeight>0"],
                                   thinning: "custom",
				   onEvaluate: function() { console.log("1st THINNING ");return true;},
				   targetValue: 40,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 20, 10, 10]
}



var a_thinning32 = { type: "thinning", 
				   schedule: { minRel: 0.19, optRel: 0.20, maxRel: 0.21 , force=true},
				   constraint: ["stand.topHeight>8"],
                                   thinning: "custom",
				   onEvaluate: function() { console.log("2nd THINNING ");return true;},
				   targetValue: 30,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 20, 10, 10]
}



var a_thinning33 = { type: "thinning", 
				   schedule: { minRel: 0.29, optRel: 0.30, maxRel: 0.31 , force=true},
				   constraint: ["stand.topHeight>11"],
                                   thinning: "custom",
				   onEvaluate: function() { console.log("3rd THINNING ");return true;},
				   targetValue: 25,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var a_thinning34 = { type: "thinning", 
				   schedule: { minRel: 0.39, optRel: 0.40, maxRel: 0.41 , force=true},
				   constraint: ["stand.topHeight>14"],
                                   thinning: "custom",
				   onEvaluate: function() { console.log("4th THINNING ");return true;},
				   targetValue: 25,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var a_thinning35 = { type: "thinning", 
				   schedule: { minRel: 0.49, optRel: 0.50, maxRel: 0.51 , force=true},
				   constraint: ["stand.topHeight>16"],
                                   thinning: "custom",
				   onEvaluate: function() { console.log("5th THINNING ");return true;},
				   targetValue: 20,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}



var a_thinning36 = { type: "thinning", 
				   schedule: { minRel: 0.59, optRel: 0.60, maxRel: 0.61 , force=true},
				   constraint: ["stand.topHeight>18"],
                                   thinning: "custom",
				   onEvaluate: function() { console.log("6th THINNING ");return true;},
				   targetValue: 20,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var a_thinning37 = { type: "thinning", 
				   schedule: { minRel: 0.69, optRel: 0.70, maxRel: 0.71 , force=true},
				   constraint: ["stand.topHeight>20"],
                                   thinning: "custom",
				   onEvaluate: function() { console.log("7th THINNING ");return true;},
				   targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var a_thinning38 = { type: "thinning", 
				   schedule: { minRel: 0.79, optRel: 0.80, maxRel: 0.81 , force=true},
				   constraint: ["stand.topHeight>21"],
                                   thinning: "custom",
				   onEvaluate: function() { console.log("8th THINNING ");return true;},
				   targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


//var a_thinning39 = { type: "thinning", 
//				   schedule: { minRel: 0.89, optRel: 0.90, maxRel: 0.91 , force=true},
//				   constraint: ["stand.topHeight>22"],
//                                 thinning: "custom",
//				   onEvaluate: function() { console.log("9th THINNING ");return true;},
//				   targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
//				   classes: [30, 30, 30, 10, 0]
//}



var a_thinning3_sw1 = { type: "thinning", 
				   schedule: { minRel: 0.89, optRel: 0.9, maxRel: 0.91 , force=true},
				   constraint: ["stand.topHeight>0"],
                                   thinning: "custom",
				   onEvaluate: function() { console.log("1st THINNING ");return true;},
				   targetValue: 50,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [40, 30, 20, 5, 5]
}




//- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
//                                                      ---   F I N A L C U T S  --->   



/// final harvest for all stands, specific dbh treshold can be set in the options of the stp
//  we use default 10 cm dbh threshold



// clearcut for STP1: we do NOT remove the saplings + we don't use an age threshold.

var a_finalcut_sw =  { type: "scheduled",
			 schedule: { minRel: 0.99, optRel: 1.0, maxRel: 1.01, force=true },

			onEvaluate: function(){ 

	fmengine.log("finalHarvest:" + activity.finalHarvest);
					trees.loadAll();

	fmengine.log("---THE U WHAT iLAND USE HERE:" + stand.U);
	fmengine.log("Number of trees before selecting: "+trees.count);

					 trees.filter("age>0")

	fmengine.log("finLcut: using age threshold: "+stand.U*(0) );
	fmengine.log("Number of trees after selecting: "+trees.count);   //HERE THERE IS A KIND OF FUNCTION tree.count THAT CAN BE USED FOR THE TRASHOLD OF REMAINING TREES?! FOR THINNINIG

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


		
/// This show what activites are set for STP1	
var stp1 = { U: [100,100,100], // short/normal/long rotation age --- are ignored if U is provided in input file  ... we have it in .csv
            options: {}, 
			planting:  a_planting_3, 
			
			thinning1: a_thinning31,
			thinning2: a_thinning32,
			thinning3: a_thinning33,
			thinning4: a_thinning34,
			thinning5: a_thinning35,
			thinning6: a_thinning36,
			thinning7: a_thinning37,
			thinning8: a_thinning38,
			thinning9: a_thinning3_sw1,
			finalcut:  a_finalcut_sw,

                  onInit: function() {}  
			
};



// register the stand treatment program stp with the name 'stp'
console.log('adding STPs...');
fmengine.addManagement(stp1, 'STP1');



// minimal agent type
var base_agent = {
	scheduler: { 
		 enabled: true,
                 minScheduleHarvest: 1,
		 maxScheduleHarvest: 10,
		 scheduleRebounceDuration: 15,
		 maxHarvestLevel: 150, // default: 1.5
		 deviationDecayRate: 0.1,  // default: 0.1
		 useSustainableHarvest: 1,
		 harvestIntensity: 1}, 

	// a list of all STPs the agent has access to....
	stp: {  'STP1': 'STP1' , 'default':'STP1'	},
	newAgent: function() { return {  scheduler: this.scheduler }; },

        onSelect: function() { if (stand.relSpeciesBasalAreaOf('pisy')>0.50) {                // if the initial species distribution is like this, choose STP1
			               console.log(stand.relSpeciesBasalAreaOf('pisy')) ;
					console.log('we should go back to STP1');
					return 'STP1';
								}; 
				if (stand.relSpeciesBasalAreaOf('pisy')<=0.50) {
					console.log(stand.relSpeciesBasalAreaOf('pisy')) ;                        // if the initial species distribution is like this, choose STP1
					 console.log('we are in STP1');
					return 'STP1';
		}},
	run: function() { console.log('base-agent run called');
                         console.log(stand.relSpeciesBasalAreaOf('pisy'))  }
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
