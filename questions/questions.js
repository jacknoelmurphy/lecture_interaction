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

  Template.list.events({
    'click .que-remove': function(event) {
      Questions.update({$que-remove: {score: 1}});
    }
  });

  Template.list.questions = Questions.find({}, {sort: {score: -1}});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
