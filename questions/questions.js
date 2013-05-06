// on the client
if (Meteor.isClient) {
  //allows client to subscribe to list of questions published by server
  Meteor.startup(function () {
    Meteor.subscribe("ques");
  });
	// handle the compose event
  Template.compose.events({
    'submit form': function (event) {
      var $body = $('#que-body');
	  var $score = 1;
      event.preventDefault();
		// check if user is logged in before entering question
	  if(!Meteor.userId()) {
		alert("You must login to post a question.");
		return;
	  }
		//insert question into database collection
      Questions.insert({
		owner: Meteor.userId(),
        body: $body.val(),
		score: $score,
        created_at: Date()
      });
	  // clear textarea after create
	  $body.val('');
    }
  });
  // deals with selected question
  Template.question.selected = function () {
    return Session.equals("selected_question", this._id) ? "selected" : '';
  };
  
  Template.question.events({
    'click': function () {
      Session.set("selected_question", this._id);
    }
	
  });
  
  Template.question.que = function(){
	return Questions.findOne(Session.get("selected"));
  };
  
	// Deals with up-vote, down-vote, remove buttons
  Template.list.events({
	// thumbs up - increment score
    'click .icon-thumbs-up': function(event) {
      Questions.update(Session.get("selected_question"), {$inc: {score: 1}});
    },
	// thumbs down - decrement score
	'click .icon-thumbs-down': function(event) {
      Questions.update(Session.get("selected_question"), {$inc: {score: -1}});
	},
	// remove selected question
	'click .icon-remove': function(event) {
      Questions.remove(Session.get("selected_question"));
    }
  });
  
  // sort in descending score, then time created
  Template.list.questions = Questions.find({}, {sort: {score: -1, created_at: -1}});
}

// on the server
if (Meteor.isServer) {
  Meteor.startup(function () {
	//Publishes the list of questions so the client can subscribe to them
    Meteor.publish("ques", function(){
		return Questions.find({}, {
			fields:{ }
		})
	});
  });
}
