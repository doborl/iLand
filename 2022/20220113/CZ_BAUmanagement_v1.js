/*

Laura Dobor
2021/12/29 

empty management so far....

 */



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






// clearcut for STP1: we removed all the saplings and clear the whole stand:
var a_clearcut =  { type: "scheduled",
		   schedule: { minRel: 0.95, optRel: 1.0, maxRel: 1.05, force=true },
		   onEvaluate: function(){ 
                      trees.loadAll();
                       trees.harvest("dbh>5");  
		   },
       
		   onExecute: function() { 
                     fmengine.log("I really do the harvest..."); 
                     trees.removeMarkedTrees(); // but do the same thing as the default operation 
	
		   },
					onCreate: function() { activity.finalHarvest=true; },
					onSetup: function() {  },
					

};


		
		
/// This show what activites are set for STP1 and STP2		
var stp1 = { U: [500,500,500], // short/normal/long rotation age --- are ignored if U is provided in input file  ... we have it in .csv
            options: {}, 
		
			thinning1: a_thinning1,
			thinning2: a_thinning2,
			thinning3: a_thinning3,

			clearcut: a_clearcut,
	
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
		 maxScheduleHarvest: 20,
		 scheduleRebounceDuration: 15,
		 maxHarvestLevel: 1.5, // default: 1.5
		 deviationDecayRate: 0.1,  // default: 0.1
		 useSustainableHarvest: 1,   // 0 is bottom-up harvest planning (i.e., stands are always processed at their optimal dates), and 1 is top-down approach (i.e, the scheduling algorithm decides when a stand should be processed).
		 harvestIntensity: 1}, 

	// a list of all STPs the agent has access to....
	stp: {  'STP1': 'STP1' , 'default':'STP1'	},
	newAgent: function() { return {  scheduler: this.scheduler }; },

        onSelect: function() { if (stand.relSpeciesBasalAreaOf('piab')>0.50) {
			               console.log(stand.relSpeciesBasalAreaOf('piab')) ;
								console.log('we should go back to STP1');
								return 'STP1';
								}; 
							   if (stand.relSpeciesBasalAreaOf('piab')<=0.50) {
								   console.log(stand.relSpeciesBasalAreaOf('piab')) ;
								   console.log('we are in STP1');
							     return 'STP1';
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
