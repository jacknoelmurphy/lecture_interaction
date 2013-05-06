Questions = new Meteor.Collection("questions");

Questions.allow({
	
	insert: function(userId, que){
		return userId && que.owner === userId;
	},
	
	update: function(id, ques, fields, modifier){
		return true;
	},
	
	remove: function(id, que){
		return id && que.owner === id;
	}
});