import _ from 'lodash';

var temperatureDataDownStairs = {
	'currentTemp': 23,
	'heatingOptions': {
		'legend': true,
		'title': 'Temperature - Downstairs',
		'hAxis': { 'title': 'Time' }, 
		'vAxis': { 'title': 'Temperature' } 
	},
	heatingColumns: [
	  {
	    'label': 'Time',
	    'type': 'string',
	  },
	  {
	    'label': 'Temperature',
	    'type': 'number',
	  },
	],
	'temperature_rows': [['11:29', 23.1], ['11:28', 20.2], ['11:27', 19.3], ['11:26', 18.5], ['11:25', 21.1], 
                ['11:24', 17.2], ['11:23', 21.9], ['11:22', 24.3], ['11:21', 18.5], ['11:20', 22.5]
  ],
  'thermostatTempValue': 18.3,
  'HeatingOn': false
};

var temperatureDataUpStairs = {
	'currentTemp': 21,
	'heatingOptions': {
		'legend': true,
		'title': 'Temperature - Upstairs',
		'hAxis': { 'title': 'Time' }, 
		'vAxis': { 'title': 'Temperature' } 
	},
	heatingColumns: [
	  {
	    'label': 'Time',
	    'type': 'string',
	  },
	  {
	    'label': 'Temperature',
	    'type': 'number',
	  },
	],
	'temperature_rows': [['11:29', 21.1], ['11:28', 22.2], ['11:27', 20.3], ['11:26', 22.5], ['11:25', 23.1], 
		 	 				['11:24', 21.2], ['11:23', 20.9], ['11:22', 20.3], ['11:21', 19.5], ['11:20', 20.5]
  ],
  'thermostatTempValue': 20.5,
  'HeatingOn': true
};




var apiHeating = {
  getHeatingDataDownStairs : function() {
    console.log("stubAPI->getHeatingDataDownStairs() function called...");
    var promise = new Promise ((resolve,reject) => {
      setTimeout(() => resolve(temperatureDataDownStairs), 1000 );
    }) ;
   return promise ;
   //return temperatureDataDownStairs;
  },

  getHeatingDataUpStairs : function() {
    console.log("stubAPI->getHeatingDataUpStairs() function called...");
    var promise = new Promise ((resolve,reject) => {
      setTimeout(() => resolve(temperatureDataUpStairs), 1000 );
    }) ;
   return promise ;
   //return temperatureDataUpStairs;
  }

} // var apiHeating

export default apiHeating;
