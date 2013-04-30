Questions = new Meteor.Collection("questions");

if (Meteor.isClient) {
  var MAX_CHARS = 140;

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
      $('#remaining').html(MAX_CHARS);
    },

    'keyup #que-body': function() {
      $('#remaining').html(MAX_CHARS - $('#tweet-body').val().length);
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

  Template.list.events({
    'click .icon-thumbs-up': function(event) {
      Questions.update(Session.get("selected_question"), {$inc: {score: 1}});
    }
  });
  Template.list.events({
    'click .icon-thumbs-down': function(event) {
      Questions.update(Session.get("selected_question"), {$inc: {score: -1}});
    }
  });
  

  Template.list.questions = Questions.find({}, {sort: {score: -1, created_at: -1}});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
