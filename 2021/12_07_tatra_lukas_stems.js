################################ BASE ON STEMS REMOVAL ##################################################

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
// VARIANT FOR NUMBER OF STEMS REMAINING

var a_thinning31 = { type: "thinning", 
				   schedule: { minRel: 0.09, optRel: 0.10, maxRel: 0.11 , force=true},
				   constraint: ["stand.topHeight>0"],
                                   thinning: "custom",
				   onEvaluate: function() { console.log("1st THINNING ");return true;},
				    remainingStems: 300, targetValue: 200,  minDbh: 5,
				   classes: [30, 30, 20, 10, 10]
}



var a_thinning32 = { type: "thinning", 
				   schedule: { minRel: 0.19, optRel: 0.20, maxRel: 0.21 , force=true},
				   constraint: ["stand.topHeight>8"],
                                   thinning: "custom",
				   onEvaluate: function() { console.log("2nd THINNING ");return true;},
				    remainingStems: 350, targetValue: 150,  minDbh: 5,
				   classes: [30, 30, 20, 10, 10]
}



var a_thinning33 = { type: "thinning", 
				   schedule: { minRel: 0.29, optRel: 0.30, maxRel: 0.31 , force=true},
				   constraint: ["stand.topHeight>11"],
                                   thinning: "custom",
				   onEvaluate: function() { console.log("3rd THINNING ");return true;},
				   remainingStems: 375, targetValue: 125,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var a_thinning34 = { type: "thinning", 
				   schedule: { minRel: 0.39, optRel: 0.40, maxRel: 0.41 , force=true},
				   constraint: ["stand.topHeight>14"],
                                   thinning: "custom",
				   onEvaluate: function() { console.log("4th THINNING ");return true;},
				   remainingStems: 375, targetValue: 125,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var a_thinning35 = { type: "thinning", 
				   schedule: { minRel: 0.49, optRel: 0.50, maxRel: 0.51 , force=true},
				   constraint: ["stand.topHeight>16"],
                                   thinning: "custom",
				   onEvaluate: function() { console.log("5th THINNING ");return true;},
				   targetValue: 20,  targetVariable: "volume",  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}



var a_thinning36 = { type: "thinning", 
				   schedule: { minRel: 0.59, optRel: 0.60, maxRel: 0.61 , force=true},
				   constraint: ["stand.topHeight>18"],
                                   thinning: "custom",
				   onEvaluate: function() { console.log("6th THINNING ");return true;},
				   remainingStems: 400, targetValue: 100, targetRelative: true,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var a_thinning37 = { type: "thinning", 
				   schedule: { minRel: 0.69, optRel: 0.70, maxRel: 0.71 , force=true},
				   constraint: ["stand.topHeight>20"],
                                   thinning: "custom",
				   onEvaluate: function() { console.log("7th THINNING ");return true;},
				   remainingStems: 425, targetValue: 75,  minDbh: 5,
				   classes: [30, 30, 30, 10, 0]
}


var a_thinning38 = { type: "thinning", 
				   schedule: { minRel: 0.79, optRel: 0.80, maxRel: 0.81 , force=true},
				   constraint: ["stand.topHeight>21"],
                                   thinning: "custom",
				   onEvaluate: function() { console.log("8th THINNING ");return true;},
				   remainingStems: 425, targetValue: 75,  minDbh: 5,
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
				   remainingStems: 250, targetValue: 250,  minDbh: 5,
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


_______________________________________________________________________________________________________________________________________________________
_____________________________________________________ SECOND PART OF THE SCRIPT IN XML FOR THE PROJECT FILE IlAND  ____________________________________


<project>
  <system>
    <path>
      <home></home>
      <database>database</database>
      <lip>lip</lip>
      <temp>temp</temp>
      <script>scripts</script>
      <init>init</init>
      <output>output</output>
    </path>
    <database>
       <in>species_param_europe_allometry_20190521_SK.sqlite</in>
      <out>subregion_medium_lukas_b.sqlite</out>
      <climate>MTCLIM_corrected_vpd_1961-2016.sqlite</climate>
    </database>
    <logging>
      <logTarget>file</logTarget>
      <logFile>log/test_b.txt</logFile>
      <flush>false</flush>
    </logging>
    <settings>
      <multithreading>true</multithreading>
      <debugOutput>0</debugOutput>
      <debugOutputAutoSave>true</debugOutputAutoSave>
      <randomSeed>0</randomSeed>
      <expressionLinearizationEnabled>true</expressionLinearizationEnabled>
      <logLevel>Warning</logLevel>
    </settings>
    <javascript>
      <fileName/>
    </javascript>
  </system>
  <model>
    <settings>
      <regenerationEnabled>true</regenerationEnabled>
      <mortalityEnabled>true</mortalityEnabled>
      <growthEnabled>true</growthEnabled>
      <carbonCycleEnabled>true</carbonCycleEnabled>
      <epsilon>2.7</epsilon>
      <lightExtinctionCoefficient>0.6</lightExtinctionCoefficient>
      <lightExtinctionCoefficientOpacity>0.6</lightExtinctionCoefficientOpacity>
      <temperatureTau>6</temperatureTau>
      <airDensity>1.204</airDensity>
      <laiThresholdForClosedStands>3</laiThresholdForClosedStands>
      <boundaryLayerConductance>0.2</boundaryLayerConductance>
      <interceptionStorageNeedle>4</interceptionStorageNeedle>
      <interceptionStorageBroadleaf>2</interceptionStorageBroadleaf>
      <snowMeltTemperature>0</snowMeltTemperature>
      <waterUseSoilSaturation>false</waterUseSoilSaturation>
      <groundVegetationLAI>1</groundVegetationLAI>
      <groundVegetationPsiMin>-1.5</groundVegetationPsiMin>
      <usePARFractionBelowGroundAllocation>true</usePARFractionBelowGroundAllocation>
      <seedDispersal>
        <seedBelt>
          <enabled>false</enabled>
          <width>25</width>
          <sizeX>9</sizeX>
          <sizeY>10</sizeY>
          <species_1_9>pisy 0.2 bepe 0.07 abal 0.01 alin 0.08 potr 0.02 lade 0.03 piab 0.59</species_1_9>
          <species_2_9>fasy 0.02 pisy 0.19 bepe 0.04 soau 0.02 abal 0.02 potr 0.02 lade 0.02 piab 0.67</species_2_9>
          <species_3_9>pisy 0.64 potr 0.01 lade 0.01 piab 0.33 saca 0.01</species_3_9>
          <species_4_9>pisy 0.54 abal 0.01 acps 0.01 alin 0.04 tico 0.01 potr 0.01 lade 0.01 piab 0.35 saca 0.02</species_4_9>

        </seedBelt>
        <dumpSeedMapsEnabled>false</dumpSeedMapsEnabled>
        <dumpSeedMapsPath/>
        <externalSeedEnabled>false</externalSeedEnabled>
        <externalSeedSource/>
        <externalSeedSpecies>abal, piab, lade, pisy, fasy, quro, acps, frex, cabe, bepe, alin, qupe, algl, casa, pini, acca, acpl, qupu, pice, soau, soar, coav, alvi, potr, poni, tico, tipl, ulgl, saca</externalSeedSpecies>
        <externalSeedBuffer/>
        <externalSeedBackgroundInput>abal 0.0002 piab 0.000 lade 0.000175 pisy 0.0001 fasy 0.00035 quro 0.00005 acps 0.000125 frex 0.000075 cabe 0.00005 bepe 0.0001 qupe 0.000075 algl 0.00005 pini 0.00005 acca 0.00005 acpl 0.00005 qupu 0.000075 pice 0.000005 soau 0.0001 soar 0.00005 alvi 0.00005 tico 0.00005 tipl 0.00005 ulgl 0.00005 saca 0.00005</externalSeedBackgroundInput>
        <recruitmentDimensionVariation>0.1</recruitmentDimensionVariation>
        <longDistanceDispersal>
          <rings>5</rings>
          <thresholdArea>0.0001</thresholdArea>
          <thresholdLDD>0.0000001</thresholdLDD>
          <LDDSeedlings>0.5</LDDSeedlings>
        </longDistanceDispersal>
      </seedDispersal>
      <soil>
        <qb>5</qb>
        <qh>14.5</qh>
        <leaching>0.47</leaching>
        <el>0.152</el>
        <er>0.319</er>
        <swdDBHClass12>20</swdDBHClass12>
        <swdDBHClass23>100</swdDBHClass23>
        <useDynamicAvailableNitrogen>false</useDynamicAvailableNitrogen>
        <nitrogenDeposition>21.8</nitrogenDeposition>
      </soil>
      <grass>
        <enabled>false</enabled>
        <type>pixel</type>
        <grassDuration>polygon(x, 0,0, 6,0, 6,1, 30,1, 30,0)</grassDuration>
        <LIFThreshold>0.2</LIFThreshold>
        <grassPotential>polygon(0.9999*x^0.15)</grassPotential>
        <maxTimeLag>3</maxTimeLag>
        <grassEffect>polygon(0.9999*x^0.15)</grassEffect>
      </grass>
      <browsing>
        <enabled>false</enabled>
        <browsingPressure>1</browsingPressure>
      </browsing>
    </settings>
    <species>
      <source>species</source>
      <reader>readerstamp.bin</reader>
      <nitrogenResponseClasses>
        <class_1_a>-0.045</class_1_a>
        <class_1_b>10</class_1_b>
        <class_2_a>-0.055</class_2_a>
        <class_2_b>25</class_2_b>
        <class_3_a>-0.065</class_3_a>
        <class_3_b>40</class_3_b>
      </nitrogenResponseClasses>
      <CO2Response>
        <p0>1</p0>
        <baseConcentration>380</baseConcentration>
        <compensationPoint>80</compensationPoint>
        <beta0>0.3</beta0>
      </CO2Response>
      <lightResponse>
        <shadeTolerant>min(10*lri,max(0.1613*lri+0.7871,lri))</shadeTolerant>
        <shadeIntolerant>1-exp(-5.5*(lri-0.05))</shadeIntolerant>
        <LRImodifier>exp(ln(lri)/0.5*(1-0.5*relH))</LRImodifier>
      </lightResponse>
      <phenology>
<type id='1'>
          <vpdMin>0.9</vpdMin>
          <vpdMax>4.1</vpdMax>
          <dayLengthMin>10</dayLengthMin>
          <dayLengthMax>11</dayLengthMax>
          <tempMin>-2</tempMin>
          <tempMax>5</tempMax>
 
</type>
<type id='2'>
          <vpdMin>1</vpdMin>
          <vpdMax>4.1</vpdMax>
          <dayLengthMin>10</dayLengthMin>
          <dayLengthMax>11</dayLengthMax>
          <tempMin>-4</tempMin>
          <tempMax>3</tempMax>
 
</type>
      </phenology>
    </species>
    <world>
      <cellSize>2</cellSize>
      <width>18000</width>
      <height>10000</height>
      <buffer>200</buffer>
      <latitude>47</latitude>
      <resourceUnitsAsGrid>true</resourceUnitsAsGrid>
      <environmentEnabled>true</environmentEnabled>
      <environmentMode>grid</environmentMode>
      <environmentGrid>gis/environment_grid_medium.asc</environmentGrid>
      <environmentFile>gis/environment_NP_file_20190905.txt</environmentFile>
      <areaMask>
        <enabled>false</enabled>
        <imageFile>AFJZ_mask.png</imageFile>
      </areaMask>
      <timeEventsEnabled>false</timeEventsEnabled>
      <timeEventsFile></timeEventsFile>
      <location>
        <x>-347020.025100000028</x>
        <y>-1204487.113799999934 </y>
        <z>0</z>
        <rotation>0</rotation>
      </location>
      <standGrid>
        <enabled>true</enabled>
        <fileName>gis/medium_id_stands_1996.asc</fileName>
      </standGrid>
      <DEM/>
    </world>
    <site>
      <availableNitrogen>84</availableNitrogen>
      <soilDepth>38</soilDepth>
      <pctSand>9</pctSand>
      <pctSilt>53</pctSilt>
      <pctClay>38</pctClay>
      <youngLabileC>16360</youngLabileC>
      <youngLabileN>652.1</youngLabileN>
      <youngLabileDecompRate>0.4527519</youngLabileDecompRate>
      <youngLabileAbovegroundFraction>0.35</youngLabileAbovegroundFraction>
      <youngRefractoryC>46214</youngRefractoryC>
      <youngRefractoryN>121.2</youngRefractoryN>
      <youngRefractoryDecompRate>0.2093879</youngRefractoryDecompRate>
      <youngRefractoryAbovegroundFraction>0.15</youngRefractoryAbovegroundFraction>
      <somC>182000</somC>
      <somN>83.68</somN>
      <somDecompRate>0.02415841</somDecompRate>
      <soilHumificationRate>0.25</soilHumificationRate>
    </site>
    <climate>
      <co2concentration>340</co2concentration>
      <tableName>climateE9_S4_A4</tableName>
      <batchYears>40</batchYears>
      <temperatureShift>0</temperatureShift>
      <precipitationShift>1</precipitationShift>
      <randomSamplingEnabled>true</randomSamplingEnabled>
      <randomSamplingList></randomSamplingList>
      <filter/>
    </climate>
    <initialization>
      <mode>snapshot</mode>
      <type>iland</type>
      <randomFunction>max(1-x^2,0)</randomFunction>
      <file>after600y_spinup_snapshot.sqlite</file>
      <saplingFile></saplingFile>
      <snags>
        <swdC>12000</swdC>
        <swdCN>417.9</swdCN>
        <swdCount>50</swdCount>
        <otherC>4000</otherC>
        <otherCN>22.95</otherCN>
        <otherAbovegroundFraction>0.3</otherAbovegroundFraction>
        <swdDecompRate>0.036</swdDecompRate>
        <woodDecompRate>0.071</woodDecompRate>
        <swdHalfLife>13.926</swdHalfLife>
      </snags>
      <heightGrid>
        <enabled>false</enabled>
        <fileName>lidar_np.txt</fileName>
        <maxTries>10</maxTries>
        <fitFormula>polygon(x, 0,0, 0.8,1, 1.12, 1, 1.5,0)</fitFormula>
      </heightGrid>
    </initialization>
    <management>
      <enabled>true</enabled>
      <file></file>
      <abeEnabled>true</abeEnabled>
      <abe>
       <file>abe_2/tatra_lukas_b.js</file>
        <agentDataFile>abe_2/BAU_2021.csv</agentDataFile>
      </abe>
    </management>
    <parameter>
      <torus>false</torus>
      <debug_tree>0</debug_tree>
      <debug_clear>false</debug_clear>
      <gpp_per_year>0</gpp_per_year>
      <debugDumpStamps>false</debugDumpStamps>
    </parameter>
  </model>
  <output>
    <dynamic>
      <enabled>false</enabled>
      <columns> dbh.mean, dbh.max, dbh.min, dbh.p5, dbh.p25, dbh.p75, dbh.p95, height.mean, height.max, height.min, height.p5,height.p95, height.p25,height.p75, stress.mean, stress.max, if(stress&gt;0,1,0).sum, if(stress&gt;0,stress,0).sum, if(dbh&gt;0,1,0).sum, leafarea.sum,woodymass.sum,rootmass.sum,foliagemass.sum
      </columns>
    </dynamic>
    <tree>
      <enabled>false</enabled>
      <filter/>
    </tree>
    <treeremoved>
      <enabled>false</enabled>
      <filter/>
    </treeremoved>
    <stand>
      <enabled>true</enabled>
      <condition/>
      <by_ru>true</by_ru>
    </stand>
    <standdead>
      <enabled>false</enabled>
    </standdead>
    <production_month>
      <enabled>false</enabled>
    </production_month>
    <management>
      <enabled>false</enabled>
    </management>
    <sapling>
      <enabled>true</enabled>
      <condition/>
    </sapling>
    <saplingdetail>
      <enabled>true</enabled>
      <condition/>
      <minDbh/>
    </saplingdetail>
    <carbon>
      <enabled>true</enabled>
      <condition/>
      <conditionRU>1=0</conditionRU>
    </carbon>
    <carbonflow>
      <enabled>true</enabled>
      <condition/>
      <conditionRU>1=0</conditionRU>
    </carbonflow>
    <soilinput>
	<enabled>true</enabled>
   </soilinput>
    <water>
      <enabled>false</enabled>
      <condition/>
      <conditionRU>in(year, 5,10,15,20,25,30,35)</conditionRU>
    </water>
    <landscape>
      <enabled>true</enabled>
      <condition/>
    </landscape>
    <dynamicstand>
      <enabled>true</enabled>
      <condition/>
      <rufilter/>
      <comment/>
      <treefilter/>
      <by_species>true</by_species>
      <by_ru>true</by_ru>
      <columns>
if(dbh&gt;=20 and dbh&lt;40,volume,0).sum, if(dbh&gt;=40 and dbh&lt;60,volume,0).sum, if(dbh&gt;=60,1,0).sum,
if(dbh&lt;5,basalarea,0).sum, if(dbh&gt;=5 and dbh&lt;10,basalarea,0).sum, if(dbh&gt;=10 and dbh&lt;15,basalarea,0).sum, if(dbh&gt;=15 and dbh&lt;20,basalarea,0).sum, if(dbh&gt;=20 and dbh&lt;25,basalarea,0).sum, if(dbh&gt;=25 and dbh&lt;30,basalarea,0).sum, if(dbh&gt;=30 and dbh&lt;35,basalarea,0).sum, if(dbh&gt;=35 and dbh&lt;40,basalarea,0).sum, if(dbh&gt;=40 and dbh&lt;45,basalarea,0).sum, if(dbh&gt;=45 and dbh&lt;50,basalarea,0).sum, if(dbh&gt;=50 and dbh&lt;55,basalarea,0).sum, if(dbh&gt;=55 and dbh&lt;60,basalarea,0).sum, if(dbh&gt;=60 and dbh&lt;65,basalarea,0).sum, if(dbh&gt;=65 and dbh&lt;70,basalarea,0).sum, if(dbh&gt;=70 and dbh&lt;75,basalarea,0).sum, if(dbh&gt;=75 and dbh&lt;80,basalarea,0).sum, if(dbh&gt;=80,basalarea,0).sum,
if(height&lt;4,basalarea,0).sum, if(height&gt;=4 and height&lt;6,basalarea,0).sum, if(height&gt;=6 and height&lt;8,basalarea,0).sum, if(height&gt;=8 and height&lt;10,basalarea,0).sum, if(height&gt;=10 and height&lt;12,basalarea,0).sum, if(height&gt;=12 and height&lt;14,basalarea,0).sum, if(height&gt;=14 and height&lt;16,basalarea,0).sum, if(height&gt;=16 and height&lt;18,basalarea,0).sum, if(height&gt;=18 and height&lt;20,basalarea,0).sum, if(height&gt;=20 and height&lt;22,basalarea,0).sum, if(height&gt;=22 and height&lt;24,basalarea,0).sum, if(height&gt;=24 and height&lt;26,basalarea,0).sum, if(height&gt;=26 and height&lt;28,basalarea,0).sum, if(height&gt;=28 and height&lt;30,basalarea,0).sum, if(height&gt;=30 and height&lt;32,basalarea,0).sum, if(height&gt;=32 and height&lt;34,basalarea,0).sum, if(height&gt;=34 and height&lt;36,basalarea,0).sum, if(height&gt;=36,basalarea,0).sum,
basalarea.sum, dbh.mean, dbh.sd, dbh.p5, dbh.p25, dbh.p75, dbh.p95,
height.mean, height.sd, height.p5, height.p25, height.p75, height.p95,age.mean,age.sd,age.min,age.max
</columns>
    </dynamicstand>
    <barkbeetle>
      <enabled>false</enabled>
    </barkbeetle>
    <wind>
      <enabled>false</enabled>
    </wind>
    <fire>
      <enabled>false</enabled>
    </fire>
    <landscape_removed>
      <enabled>false</enabled>
      <includeHarvest>true</includeHarvest>
      <includeNatural>true</includeNatural>
    </landscape_removed>
    <abeStand>
      <enabled>true</enabled>
    </abeStand>
    <abeUnit>
      <enabled>true</enabled>
    </abeUnit>
    <abeStandRemoval>
      <enabled>true</enabled>
    </abeStandRemoval>
    <abeStandDetail>
      <enabled>true</enabled>
    </abeStandDetail>
  </output>
  <modules>
    <fire>
      <enabled>false</enabled>
      <onlySimulation>true</onlySimulation>
      <KBDIref>0.3</KBDIref>
      <rFireSuppression>1</rFireSuppression>
      <rLand>1</rLand>
      <meanAnnualPrecipitation>5000</meanAnnualPrecipitation>
      <averageFireSize>9650000</averageFireSize>
      <fireSizeSigma>1.633</fireSizeSigma>
      <fireReturnInterval>10</fireReturnInterval>
      <fireExtinctionProbability>0.05</fireExtinctionProbability>
      <fuelKFC1>0.75</fuelKFC1>
      <fuelKFC2>0.75</fuelKFC2>
      <fuelKFC3>0.75</fuelKFC3>
      <crownKill1>0.21111</crownKill1>
      <crownKill2>0.00445</crownKill2>
      <crownKillDbh>40</crownKillDbh>
      <burnSOMFraction>0.02</burnSOMFraction>
      <burnFoliageFraction>0.9</burnFoliageFraction>
      <burnBranchFraction>0.51</burnBranchFraction>
      <burnStemFraction>0.11</burnStemFraction>
      <wind>
        <speedMin>10</speedMin>
        <speedMax>20</speedMax>
        <direction>270</direction>
      </wind>
    </fire>
    <wind>
      <enabled>false</enabled>
      <speciesParameter>wind</speciesParameter>
      <soilFreezeMode>auto</soilFreezeMode>
      <triggeredByTimeEvent>true</triggeredByTimeEvent>
      <durationPerIteration>2</durationPerIteration>
      <gustModifier>0.2</gustModifier>
      <topoModifier>1</topoModifier>
      <directionVariation>30</directionVariation>
      <direction>0</direction>
      <dayOfYear>200</dayOfYear>
      <speed>0</speed>
      <duration>100</duration>
      <topoGridFile>gis/svf32_plot_RESCALED2.asc</topoGridFile>
      <factorEdge>3</factorEdge>
      <edgeDetectionThreshold>10</edgeDetectionThreshold>
      <topexModifierType>multiplicative</topexModifierType>
      <LRITransferFunction>max(min(3.733-6.467*LRI, 3.41),3)</LRITransferFunction>
      <edgeProbability>polygon(x,0,0,20,0.5)</edgeProbability>
      <edgeAgeBaseValue>20</edgeAgeBaseValue>
      <edgeBackgroundProbability>0.1</edgeBackgroundProbability>
      <onAfterWind/>
    </wind>
    <barkbeetle>
      <enabled>false</enabled>
      <minimumDbh>15</minimumDbh>
      <backgroundInfestationProbability>0.000685</backgroundInfestationProbability>
      <stormInfestationProbability>0.8</stormInfestationProbability>
      <baseWinterMortality>0.4</baseWinterMortality>
      <winterMortalityFormula>1-exp(-0.1005*x)</winterMortalityFormula>
      <spreadKernelFormula>exp(-((x/4.5)^2)/4/40.5)</spreadKernelFormula>
      <spreadKernelMaxDistance>257</spreadKernelMaxDistance>
      <cohortsPerGeneration>20</cohortsPerGeneration>
      <cohortsPerSisterbrood>30</cohortsPerSisterbrood>
      <colonizeProbabilityFormula>0.85*x+0.15</colonizeProbabilityFormula>
      <deadTreeSelectivity>0.9</deadTreeSelectivity>
      <outbreakClimateSensitivityFormula>Psummer^-0.9609</outbreakClimateSensitivityFormula>
      <outbreakDurationMin>10</outbreakDurationMin>
      <outbreakDurationMax>12</outbreakDurationMax>
      <outbreakDurationMortalityFormula>polygon(t, 0.5,0, 1,1)</outbreakDurationMortalityFormula>
      <initialInfestationProbability>0.000685</initialInfestationProbability>
      <referenceClimate>
        <tableName>climateE7_S4_A4</tableName>
        <seasonalPrecipSum>215, 366.13, 194.54, 100.81</seasonalPrecipSum>
        <seasonalTemperatureAverage>5.49, 14.48, 6.07, -4.39</seasonalTemperatureAverage>
      </referenceClimate>
      <onAfterBarkbeetle/>
    </barkbeetle>
  </modules>
  <user>
    <windspeed_factor>1</windspeed_factor>
    <code>value</code>
  </user>
</project>

