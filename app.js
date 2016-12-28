'use strict';

const Slimbot = require('slimbot');
const slimbot = new Slimbot('316885611:AAFsCSJja-OVfRaj5dgRFtJr87PHSkH3D8M');

const watson = require('watson-developer-cloud');
const conversation = watson.conversation({
  username: '5c8173e9-e913-4060-be0c-433f87a1bc17',
  password: 'ubdTHlLmL1gS',
  version: 'v1',
  version_date: '2016-09-20'
});


var fromId;
var context = {};

// Register listeners

slimbot.on('message', msg => {
	fromId = msg.from.id;
  	var firstName = msg.from.first_name;
  	var reply = msg.message_id;

  	var strQuery = msg.text;
  	var strResponse;

  	conversation.message({
    	workspace_id: '7a31bf49-5cb1-4920-9efd-403ed80bc3d6',
    	input: {'text': strQuery},
    	context: context
 		},  
 		function(err, result) {
    		if (err)
      			console.log('error:', err);
    		else
	      	strResponse = result.output.text.toString();
          context = result.context;
	      	//console.log("\n.....................................\n");
	      	//console.log("Response: " + strResponse);
	      	return slimbot.sendMessage(fromId, strResponse).then(message => {
  				console.log(msg.text);
  				console.log("\n----------------\n");
  				console.log(message.result.text);
  				console.log("\n================\n\n");
			});
		})
	});



// Call API

slimbot.startPolling();
