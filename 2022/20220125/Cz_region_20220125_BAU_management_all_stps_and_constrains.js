/*
################################################################    Kostelec Czech Silviculture Management     ###########################################################################
##########################################################                      Clear cut                          ########################################################################


This management script is doing businness-as-usual activities on the full landscape of our study area in the Kostelec for iLand model.
MARCO BALDO
2022/01/25
We have one agent and one unit. 1 and 5 stps
This selection was done in preprocess (inside R environment).
Activities that this script is doing:
Planting
Thinning x9 x5 stand treatment programs
clearcut 
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

// STP1 planting_1 = planting for site 1 extreme and expose soils 80% Quercus petreae ( Sessile oak) and 20% Pinus sylvestris (Scotch pine).


var planting_1 = {
	 type: "planting", 
	 schedule: 2 ,    
	 items: [ {species: "qupe",  height: 0.5, fraction: 0.8 , clear: false},
		  {species: "pisy",  height: 0.5, fraction: 0.2 	}],
		  
// Here just doing logging to logfile:
	 onExit: function() { 	fmengine.log("Planting qupe fraction= 0.8" );
    			     	fmengine.log("Planting pisy fraction= 0.2" ); }
};

// STP2  planting_3 = planting for site 3 acidic soils 40% Quercus petreae L. ( Sessile oak) and 60% Pinus sylvestris L. (Scotch pine).


var planting_3 = {
	 type: "planting", 
	 schedule: 2 ,    
	 items: [ {species: "pisy",  height: 0.5, fraction: 0.6 , clear: false},
		  {species: "qupe",  height: 0.5, fraction: 0.4 	}],
		  
// Here just doing logging to logfile:
	 onExit: function() { 	fmengine.log("Planting pisy fraction= 0.6" );
    			     	fmengine.log("Planting qupe fraction= 0.4" ); }
};

// STP3 planting_5 = planting for site 5 rich soils 60% Picea abies L. (Norway sprunce) and 40% Fagus sylvatica L. (European beech).


var planting_5 = {
	 type: "planting", 
	 schedule: 2 ,    
	 items: [ {species: "piab",  height: 0.5, fraction: 0.6 , clear: false},
		  {species: "fasy",  height: 0.5, fraction: 0.4 	}],
		  
// Here just doing logging to logfile:
	 onExit: function() { 	fmengine.log("Planting piab fraction= 0.6" );
    			     	fmengine.log("Planting fasy fraction= 0.4" ); }
};

// STP4 planting_7a = planting for site 7a partially waterlock soil 60% Picea abies L. (Norway sprunce) and 40% Quercus petra L. (Sessile oak).


var planting_7a = {
	 type: "planting", 
	 schedule: 2 ,    
	 items: [ {species: "piab",  height: 0.5, fraction: 0.6 , clear: false},
		  {species: "qupe",  height: 0.5, fraction: 0.4 	}],
		  
// Here just doing logging to logfile:
	 onExit: function() { 	fmengine.log("Planting piab fraction= 0.6" );
    			     	fmengine.log("Planting qupe fraction= 0.4" ); }
};

// STP5 planting_7b = planting for site 7b waterlock soil 100% Alnus glutinosa L. (European alder).


var planting_7b = {
	 type: "planting", 
	 schedule: 2 ,    
	 items: [ {species: "algl",  height: 0.5, fraction: 1 , clear: false}, ],
		  
// Here just doing logging to logfile:
	 onExit: function() { 	fmengine.log("Planting alql fraction= 1" ); }
};


//--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
//                                                      ---  T H I N N I N G S  --->   

// http://iland-model.org/ABE+activity+thinning
// For thinnings there are build in method in the Bilek L., excel file, and we use it. Stand top height and dbh variable CHANGE DURING THE ACTIVITY/AGE
// WE ARE USING A DIFFERENT METHOD FOR ANY KIND OF SOIL (extreme and expose soils site 1, acidic soils site 3, rich soils site 5, partially waterlock soils Oak type site 7a, waterlock soils Alder type site 7b. 
// (only for shelterwood) WE ARE USING SHELTERWOOD MANAGEMENT FOR LAST THINNING
// VARIANT FOR NUMBER OF STEMS REMAINING AND WITHOUT HEIGHT CONSTRAINS + volume target
// For stems constrains I made 5 trees in more of the target because was > of some n. i.g. thin 11 -> stems n. > 3050 = remainingStems: 3055

///////////////////////////////////////           THINNING STP1        //////////////////////////////////////////////////////

var thinning11 = { type: "thinning", 
				   schedule: { minRel: 0.09, optRel: 0.10, maxRel: 0.11 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("1st THINNING ");return true;},
				    remainingStems: 3055, targetValue: 25,  targetVariable: "volume", targetRelative: true,  minDbh: 0,
				   classes: [30, 30, 20, 10, 10]
}



var thinning12 = { type: "thinning", 
				   schedule: { minRel: 0.19, optRel: 0.20, maxRel: 0.21 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("2nd THINNING ");return true;},
				   remainingStems: 855, targetValue: 25,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 20, 10, 10]
}



var thinning13 = { type: "thinning", 
				   schedule: { minRel: 0.29, optRel: 0.30, maxRel: 0.31 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("3rd THINNING ");return true;},
				   remainingStems: 505, targetValue: 25,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var thinning14 = { type: "thinning", 
				   schedule: { minRel: 0.39, optRel: 0.40, maxRel: 0.41 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("4th THINNING ");return true;},
				   remainingStems: 305, targetValue: 20,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var thinning15 = { type: "thinning", 
				   schedule: { minRel: 0.49, optRel: 0.50, maxRel: 0.51 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("5th THINNING ");return true;},
				   remainingStems: 205, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}



var thinning16 = { type: "thinning", 
				   schedule: { minRel: 0.59, optRel: 0.60, maxRel: 0.61 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("6th THINNING ");return true;},
				   remainingStems: 155, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var thinning17 = { type: "thinning", 
				   schedule: { minRel: 0.69, optRel: 0.70, maxRel: 0.71 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("7th THINNING ");return true;},
				   remainingStems: 125, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var thinning18 = { type: "thinning", 
				   schedule: { minRel: 0.79, optRel: 0.80, maxRel: 0.81 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("8th THINNING ");return true;},
				   remainingStems: 105, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var thinning19 = { type: "thinning", 
				   schedule: { minRel: 0.89, optRel: 0.90, maxRel: 0.91 , force=true},
				   
                                 thinning: "custom",
				   onEvaluate: function() { console.log("9th THINNING ");return true;},
				   remainingStems: 95, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}

///////////////////////////////////////           THINNING STP2        //////////////////////////////////////////////////////

var thinning31 = { type: "thinning", 
				   schedule: { minRel: 0.09, optRel: 0.10, maxRel: 0.11 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("1st THINNING ");return true;},
				    remainingStems: 2005, targetValue: 30,  targetVariable: "volume", targetRelative: true,  minDbh: 0,
				   classes: [30, 30, 20, 10, 10]
}



var thinning32 = { type: "thinning", 
				   schedule: { minRel: 0.19, optRel: 0.20, maxRel: 0.21 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("2nd THINNING ");return true;},
				   remainingStems: 1055, targetValue: 30,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 20, 10, 10]
}



var thinning33 = { type: "thinning", 
				   schedule: { minRel: 0.29, optRel: 0.30, maxRel: 0.31 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("3rd THINNING ");return true;},
				   remainingStems: 705, targetValue: 30,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var thinning34 = { type: "thinning", 
				   schedule: { minRel: 0.39, optRel: 0.40, maxRel: 0.41 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("4th THINNING ");return true;},
				   remainingStems: 455, targetValue: 20,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var thinning35 = { type: "thinning", 
				   schedule: { minRel: 0.49, optRel: 0.50, maxRel: 0.51 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("5th THINNING ");return true;},
				   remainingStems: 375, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}



var thinning36 = { type: "thinning", 
				   schedule: { minRel: 0.59, optRel: 0.60, maxRel: 0.61 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("6th THINNING ");return true;},
				   remainingStems: 265, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var thinning37 = { type: "thinning", 
				   schedule: { minRel: 0.69, optRel: 0.70, maxRel: 0.71 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("7th THINNING ");return true;},
				   remainingStems: 255, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var thinning38 = { type: "thinning", 
				   schedule: { minRel: 0.79, optRel: 0.80, maxRel: 0.81 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("8th THINNING ");return true;},
				   remainingStems: 245, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var thinning39 = { type: "thinning", 
				   schedule: { minRel: 0.89, optRel: 0.90, maxRel: 0.91 , force=true},
				   
                                 thinning: "custom",
				   onEvaluate: function() { console.log("9th THINNING ");return true;},
				   remainingStems: 215, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}

///////////////////////////////////////           THINNING STP3        //////////////////////////////////////////////////////


var thinning51 = { type: "thinning", 
				   schedule: { minRel: 0.09, optRel: 0.10, maxRel: 0.11 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("1st THINNING ");return true;},
				    remainingStems: 1505, targetValue: 40,  targetVariable: "volume", targetRelative: true,  minDbh: 0,
				   classes: [10, 20, 25, 25, 20]
}



var thinning52 = { type: "thinning", 
				   schedule: { minRel: 0.19, optRel: 0.20, maxRel: 0.21 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("2nd THINNING ");return true;},
				   remainingStems: 1005, targetValue: 30,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [10, 20, 25, 25, 20]
}



var thinning53 = { type: "thinning", 
				   schedule: { minRel: 0.29, optRel: 0.30, maxRel: 0.31 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("3rd THINNING ");return true;},
				   remainingStems: 705, targetValue: 20,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [10, 20, 25, 25, 20]
}


var thinning54 = { type: "thinning", 
				   schedule: { minRel: 0.39, optRel: 0.40, maxRel: 0.41 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("4th THINNING ");return true;},
				   remainingStems: 455, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [10, 20, 25, 25, 20]
}


var thinning55 = { type: "thinning", 
				   schedule: { minRel: 0.49, optRel: 0.50, maxRel: 0.51 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("5th THINNING ");return true;},
				   remainingStems: 385, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [10, 20, 25, 25, 20]
}



var thinning56 = { type: "thinning", 
				   schedule: { minRel: 0.59, optRel: 0.60, maxRel: 0.61 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("6th THINNING ");return true;},
				   remainingStems: 335, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var thinning57 = { type: "thinning", 
				   schedule: { minRel: 0.69, optRel: 0.70, maxRel: 0.71 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("7th THINNING ");return true;},
				   remainingStems: 265, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var thinning58 = { type: "thinning", 
				   schedule: { minRel: 0.79, optRel: 0.80, maxRel: 0.81 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("8th THINNING ");return true;},
				   remainingStems: 245, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var thinning59 = { type: "thinning", 
				   schedule: { minRel: 0.89, optRel: 0.90, maxRel: 0.91 , force=true},
				   
                                 thinning: "custom",
				   onEvaluate: function() { console.log("9th THINNING ");return true;},
				   remainingStems: 205, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}

///////////////////////////////////////           THINNING STP4        //////////////////////////////////////////////////////


var thinning71a = { type: "thinning", 
				   schedule: { minRel: 0.09, optRel: 0.10, maxRel: 0.11 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("1st THINNING ");return true;},
				    remainingStems: 1505, targetValue: 45,  targetVariable: "volume", targetRelative: true,  minDbh: 0,
				   classes: [10, 20, 25, 25, 20]
}


var thinning72a = { type: "thinning", 
				   schedule: { minRel: 0.19, optRel: 0.20, maxRel: 0.21 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("2nd THINNING ");return true;},
				   remainingStems: 1005, targetValue: 30,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [10, 20, 25, 25, 20]
}


var thinning73a = { type: "thinning", 
				   schedule: { minRel: 0.29, optRel: 0.30, maxRel: 0.31 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("3rd THINNING ");return true;},
				   remainingStems: 705, targetValue: 20,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [10, 20, 25, 25, 20]
}


var thinning74a = { type: "thinning", 
				   schedule: { minRel: 0.39, optRel: 0.40, maxRel: 0.41 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("4th THINNING ");return true;},
				   remainingStems: 455, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [10, 20, 25, 25, 20]
}


var thinning75a = { type: "thinning", 
				   schedule: { minRel: 0.49, optRel: 0.50, maxRel: 0.51 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("5th THINNING ");return true;},
				   remainingStems: 385, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [10, 20, 25, 25, 20]
}


var thinning76a = { type: "thinning", 
				   schedule: { minRel: 0.59, optRel: 0.60, maxRel: 0.61 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("6th THINNING ");return true;},
				   remainingStems: 335, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var thinning77a = { type: "thinning", 
				   schedule: { minRel: 0.69, optRel: 0.70, maxRel: 0.71 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("7th THINNING ");return true;},
				   remainingStems: 265, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var thinning78a = { type: "thinning", 
				   schedule: { minRel: 0.79, optRel: 0.80, maxRel: 0.81 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("8th THINNING ");return true;},
				   remainingStems: 245, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var thinning79a = { type: "thinning", 
				   schedule: { minRel: 0.89, optRel: 0.90, maxRel: 0.91 , force=true},
				   
                                 thinning: "custom",
				   onEvaluate: function() { console.log("9th THINNING ");return true;},
				   remainingStems: 205, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


///////////////////////////////////////           THINNING STP5        //////////////////////////////////////////////////////

var thinning71b = { type: "thinning", 
				   schedule: { minRel: 0.09, optRel: 0.10, maxRel: 0.11 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("1st THINNING ");return true;},
				    remainingStems: 705, targetValue: 25,  targetVariable: "volume", targetRelative: true,  minDbh: 0,
				   classes: [10, 20, 25, 25, 20]
}



var thinning72b = { type: "thinning", 
				   schedule: { minRel: 0.19, optRel: 0.20, maxRel: 0.21 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("2nd THINNING ");return true;},
				   remainingStems: 505, targetValue: 25,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [10, 20, 25, 25, 20]
}



var thinning73b = { type: "thinning", 
				   schedule: { minRel: 0.29, optRel: 0.30, maxRel: 0.31 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("3rd THINNING ");return true;},
				   remainingStems: 405, targetValue: 20,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [10, 20, 25, 25, 20]
}


var thinning74b = { type: "thinning", 
				   schedule: { minRel: 0.39, optRel: 0.40, maxRel: 0.41 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("4th THINNING ");return true;},
				   remainingStems: 305, targetValue: 20,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [10, 20, 25, 25, 20]
}


var thinning75b = { type: "thinning", 
				   schedule: { minRel: 0.49, optRel: 0.50, maxRel: 0.51 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("5th THINNING ");return true;},
				   remainingStems: 255, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [10, 20, 25, 25, 20]
}



var thinning76b = { type: "thinning", 
				   schedule: { minRel: 0.59, optRel: 0.60, maxRel: 0.61 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("6th THINNING ");return true;},
				   remainingStems: 205, targetValue: 15,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var thinning77b = { type: "thinning", 
				   schedule: { minRel: 0.69, optRel: 0.70, maxRel: 0.71 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("7th THINNING ");return true;},
				   remainingStems: 155, targetValue: 10,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var thinning78b = { type: "thinning", 
				   schedule: { minRel: 0.79, optRel: 0.80, maxRel: 0.81 , force=true},
				   
                                   thinning: "custom",
				   onEvaluate: function() { console.log("8th THINNING ");return true;},
				   remainingStems: 125, targetValue: 10,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var thinning79b = { type: "thinning", 
				   schedule: { minRel: 0.89, optRel: 0.90, maxRel: 0.91 , force=true},
				   
                                 thinning: "custom",
				   onEvaluate: function() { console.log("9th THINNING ");return true;},
				   remainingStems: 105, targetValue: 10,  targetVariable: "volume", targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


//- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
//                                                      ---   C L E A R C U T   --->   



/// final harvest for all stands, specific dbh treshold can be set in the options of the stp
//  we use default 5 cm dbh threshold



// clearcut for STPs: we do NOT remove the regeneration thanks the tree.filter    https://iland-model.org/ABE+activity+scheduled?highlight=scheduler
// !! try to change scheduled in general !!

var clearcut =  { type: "scheduled",
			 schedule: { minRel: 0.99, optRel: 1.0, maxRel: 1.01, force=true },

			onEvaluate: function(){ 

	fmengine.log("finalHarvest:" + activity.finalHarvest);
					trees.loadAll();

	fmengine.log("---THE U WHAT iLAND USE HERE:" + stand.U);         // HAVE A LOOK AT "fmengine.log" HERE AND FOR THE FOLLOWING, IN THE XLXS FILE THE CODE IS A BIT DIFFERENT
	fmengine.log("Number of trees before selecting: "+ trees.count);

					 trees.filter("dbh>5")
					 trees.filter("age>0")

	fmengine.log("finLcut: using age threshold: "+stand.U*(0) );
	fmengine.log("Number of trees after selecting: "+trees.count);   // HERE THERE IS A KIND OF FUNCTION tree.count THAT CAN BE USED FOR THE TRASHOLD OF REMAINING TREES?! FOR THINNINIG

					trees.harvest(); 
                                        return true;},
			onExecute: function() { 

         fmengine.log("I really do the harvest..."); 

					trees.removeMarkedTrees(); 	
                 			},
					onCreate: function() {activity.finalHarvest=true;  },
		onSetup: function() {  } 
					
};



//- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
//                                                      ---   F I N A L C U T S  --->  S H E L T E R W O O D  


/// final harvest for all stands, specific dbh treshold can be set in the options of the stp
//  we use default 10 cm dbh threshold



// shelterwood cut for STP2: we do NOT remove the regeneration thanks the tree.filter

//var finalcut1_sw =  { type: "scheduled",
//			 schedule: { minRel: 0.99, optRel: 1.0, maxRel: 1.01, force=true },
//			onEvaluate: function(){ 
//					trees.loadAll();
//trees.filter("dbh>10")
//trees.filter("age>40")
//					trees.harvest(); 
//					return true; },
//			onExecute: function() { 
//        					trees.removeMarkedTrees(); },
//					onCreate: function() {activity.finalHarvest=true;  },
//					onSetup: function() {  } 
//					
//};


//- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
////////////////////////////////////////////////////////////////////  STPS LIST ACTIVITIES  /////////////////////////////////////////////////

		
/// This show what activites are set for STP1	
var stp1 = { U: [140,140,140], // short/normal/long rotation age --- are ignored if U is provided in input file  ... we have it in .csv
            options: {}, 
			planting1:  planting_1, 
			
			thinning1: thinning11,
			thinning2: thinning12,
			thinning3: thinning13,
			thinning4: thinning14,
			thinning5: thinning15,
			thinning6: thinning16,
			thinning7: thinning17,
			thinning8: thinning18,
			thinning9: thinning19,
			clearcut1:  clearcut,

            // standmonitoring: stand_monitor

      onInit: function() {}  
			
};



// register the stand treatment program stp with the name 'stp'
console.log('adding STPs...');
fmengine.addManagement(stp1, 'STP1');


//---------------------------------------------------------------------------------------------------------------------------------------
/// This show what activites are set for STP2	
var stp2 = { U: [120,120,120], // short/normal/long rotation age --- are ignored if U is provided in input file  ... we have it in .csv
            options: {}, 
			planting3:  planting_3, 
			
			thinning1: thinning31,
			thinning2: thinning32,
			thinning3: thinning33,
			thinning4: thinning34,
			thinning5: thinning35,
			thinning6: thinning36,
			thinning7: thinning37,
			thinning8: thinning38,
			thinning9: thinning39,
			clearcut3:  clearcut,

            // standmonitoring: stand_monitor

      onInit: function() {}  
			
};



// register the stand treatment program stp with the name 'stp'
console.log('adding STPs...');
fmengine.addManagement(stp2, 'STP2');


//---------------------------------------------------------------------------------------------------------------------------------------

/// This show what activites are set for STP3	
var stp3 = { U: [120,120,120], // short/normal/long rotation age --- are ignored if U is provided in input file  ... we have it in .csv
            options: {}, 
			planting5:  planting_5, 
			
			thinning1: thinning51,
			thinning2: thinning52,
			thinning3: thinning53,
			thinning4: thinning54,
			thinning5: thinning55,
			thinning6: thinning56,
			thinning7: thinning57,
			thinning8: thinning58,
			thinning9: thinning59,
			clearcut5:  clearcut,

            // standmonitoring: stand_monitor

      onInit: function() {}  
			
};



// register the stand treatment program stp with the name 'stp'
console.log('adding STPs...');
fmengine.addManagement(stp3, 'STP3');


//---------------------------------------------------------------------------------------------------------------------------------------

/// This show what activites are set for STP4	
var stp4 = { U: [120,120,120], // short/normal/long rotation age --- are ignored if U is provided in input file  ... we have it in .csv
            options: {}, 
			planting7a:  planting_7a, 
			
			thinning1: thinning71a,
			thinning2: thinning72a,
			thinning3: thinning73a,
			thinning4: thinning74a,
			thinning5: thinning75a,
			thinning6: thinning76a,
			thinning7: thinning77a,
			thinning8: thinning78a,
			thinning9: thinning79a,
			clearcut7a:  clearcut,

            // standmonitoring: stand_monitor

      onInit: function() {}  
			
};



// register the stand treatment program stp with the name 'stp'
console.log('adding STPs...');
fmengine.addManagement(stp4, 'STP4');

//---------------------------------------------------------------------------------------------------------------------------------------

/// This show what activites are set for STP5	
var stp5 = { U: [80,80,80], // short/normal/long rotation age --- are ignored if U is provided in input file  ... we have it in .csv
            options: {}, 
			planting7b:  planting_7b, 
			
			thinning1: thinning71b,
			thinning2: thinning72b,
			thinning3: thinning73b,
			thinning4: thinning74b,
			thinning5: thinning75b,
			thinning6: thinning76b,
			thinning7: thinning77b,
			thinning8: thinning78b,
			thinning9: thinning79b,
			clearcut7b:  clearcut,

            // standmonitoring: stand_monitor

      onInit: function() {}  
			
};



// register the stand treatment program stp with the name 'stp'
console.log('adding STPs...');
fmengine.addManagement(stp5, 'STP5');


//---------------------------------------------------------------    SCHEDULE AGENT TYPE        -------------------------------------------------------------------------------------------
// without doent's work well the model
// minimal agent type/            https://iland-model.org/ABE?highlight=minimal+agent+type        link 2 :    https://iland-model.org/ABE+agents
//  VERY IMPORTANT FOR THE BELOW CONSTRAINS UNDERSTANDING   https://iland-model.org/doxy/struct_a_b_e_1_1_scheduler_options.html

var base_agent = {
	scheduler: { 
		 enabled: true,
                 minScheduleHarvest: 1,
		 maxScheduleHarvest: 20,
		 scheduleRebounceDuration: 15,
		 maxHarvestLevel: 150,         // default: 1.5
		 deviationDecayRate: 0.1,      // default: 0.1
		 useSustainableHarvest: 0,   // 0 is bottom-up harvest planning (i.e., stands are always processed at their optimal dates), and 1 is top-down approach (i.e, the scheduling algorithm decides when a stand should be processed).
		 harvestIntensity: 1}, 

	
	
	
////////////// EDIT IT IF YOU WANT SWITCH STAND STPS WITH SOME TRASHOLD LIKE PROPORTION OF ONE SPECIES 
////////////// PAY ATTENTION 
////////////// a list of all STPs the agent has access to....
	
stp: {  'STP1': 'STP1' ,'STP2': 'STP2', 'STP3': 'STP3','STP4': 'STP4','STP5': 'STP5','default':'STP3' },
newAgent: function() { return {  scheduler: this.scheduler }; },

        onSelect: function() { if (stand.flag("group")==1) {
              console.log(stand.flag("group")) ;
console.log('we should go back to STP1');
return 'STP1';
   }; 

if  (stand.flag("group")==2) {
console.log(stand.flag("group")) ;
console.log('we are in STP2');
    return 'STP2';
                    };

if (stand.flag("group")==3) {
              console.log(stand.flag("group")) ;
console.log('we should go back to STP3');
return 'STP3';                                    //  REMEMBER TO CHANGE IT WHILE YOU ADD OTHER STPS
}; 

if (stand.flag("group")==4) {
              console.log(stand.flag("group")) ;
console.log('we should go back to STP4');
return 'STP4';
}; 

if (stand.flag("group")==5) {
              console.log(stand.flag("group")) ;
console.log('we should go back to STP5');
return 'STP5';
}; 

if (stand.flag("group")==6) {
              console.log(stand.flag("group")) ;
console.log('we should go back to STP3');
return 'STP3';
};

},

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
