var defaultTemperatureData = {
	'currentTemp': 10,
	'heatingOptions': {
		'legend': true,
		'title': 'Temperature - Defaults',
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
	'temperature_rows': [['11:29', 23.1], ['11:28', 24.2], ['11:27', 25.3], ['11:26', 26.4], ['11:25', 27.5], 
                ['11:24', 28.8], ['11:23', 29.9], ['11:22', 30.0], ['11:21', 25.5], ['11:20', 20.0]
  ],
  'thermostatTempValue': 0,
  'HeatingOn': false
}

export default defaultTemperatureData;
