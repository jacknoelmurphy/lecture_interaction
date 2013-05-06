Questions = new Meteor.Collection("questions");

if (Meteor.isClient) {

  Template.compose.events({
    'submit form': function (event) {
      var $body = $('#que-body');
	  var $score = 1;
      event.preventDefault();

      Questions.insert({
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
    // code to run on server at startup
  });
}
