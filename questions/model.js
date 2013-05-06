Questions = new Meteor.Collection("questions");

Questions.allow({
	
	insert: function(userId, que){
		return userId && que.owner === userId;
	},
	
	update: function(userId, ques, fields, modifier){
		return userId;
	},
	
	remove: function(id, que){
		return id && que.owner === id;
	}
});