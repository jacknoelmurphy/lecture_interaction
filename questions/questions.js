
if (Meteor.isClient) {

  Meteor.startup(function () {
    Meteor.subscribe("ques");
  });

  Template.compose.events({
    'submit form': function (event) {
      var $body = $('#que-body');
	  var $score = 1;
      event.preventDefault();
	
	  if(!Meteor.userId()) {
		alert("You must login to post a question.");
		return;
	  }
	
      Questions.insert({
		owner: Meteor.userId(),
        body: $body.val(),
		score: $score,
        created_at: Date()
      });
	  
	  $body.val('');
    }
  });
  
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
    'click .icon-thumbs-up': function(event) {
      Questions.update(Session.get("selected_question"), {$inc: {score: 1}});
    },
	'click .icon-thumbs-down': function(event) {
      Questions.update(Session.get("selected_question"), {$inc: {score: -1}});
	},
	'click .icon-remove': function(event) {
      Questions.remove(Session.get("selected_question"));
    }
  });
  
  
  Template.list.questions = Questions.find({}, {sort: {score: -1, created_at: -1}});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.publish("ques", function(){
		return Questions.find({}, {
			fields:{ }
		})
	});
  });
}
