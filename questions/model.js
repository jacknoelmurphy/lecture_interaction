//Creates collection to hold questions
Questions = new Meteor.Collection("questions");

//Specifies permissions on actions
Questions.allow({
	//Users can only insert if they are logged in, make the user the owner of the question
	insert: function(userId, que){
		return userId && que.owner === userId;
	},
	
	//User can only update if they are logged in
	update: function(userId, ques, fields, modifier){
		return userId;
	},
	
	//User can only remove a question if tey are logged in and they created that question
	remove: function(id, que){
		return id && que.owner === id;
	}
});