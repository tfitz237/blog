Posts = new Mongo.Collection("posts");

Meteor.methods({
    addPost: function (post) {
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        } else if(Meteor.userId() == post._id) {
            var rtn = {
                type: post.type,
                text: post.text,
                title: post.title,
                createdAt: new Date(),
                updatedAt: new Date(),
                owner: Meteor.userId(),
                username: Meteor.user().username
            };
            
            switch (post.type) {
                case 'music':
                case 'link':
                    rtn.url = post.url;
                    HTTP.call("GET", 'https://api.embedly.com/1/oembed', {params: {key:'afc044c2a50440c0bd8216adddc728f2',url:post.url}},
                        function(error,result) {
                            if(!error) {
                                rtn.embed = result.data;
                                    console.log(rtn);                            
                                Posts.insert(rtn);
                            }
                    });
                    break;
                case 'image':
                    rtn.image = post.image;
                case 'text':
                    Posts.insert(rtn);
                    break;
            }
        }
    },
    editPost: function(post) {
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        } else if(Meteor.userId() == post._id) {
            var rtn = {
                type: post.type,
                text: post.text,
                title: post.title,
                createdAt: post.createdAt,
                updatedAt: new Date(),
                owner: Meteor.userId(),
                username: Meteor.user().username
            };
            
            switch (post.type) {
                case 'music':
                case 'link':
                    rtn.url = post.url;
                    var oldurl = Posts.findOne({_id: post._id});
                    if(post.url != oldurl) {
    
                        HTTP.call("GET", 'https://api.embedly.com/1/oembed', {params: {key:'afc044c2a50440c0bd8216adddc728f2',url:post.url}},
                            function(error,result) {
                                if(!error) {
                                    rtn.embed = result.data;
                                    console.log(rtn);
                                    Posts.update(post._id, rtn);
                                }
                        });
                    } else {
                        rtn.embed = post.embed;
                        Posts.update(post._id, rtn);
                    }
                    break;
                case 'image':
                    rtn.image = post.image;
                case 'text':
                    Posts.update(post._id, rtn);
                    break;
            } 
        }
    },
    deletePost: function(post) {
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        } else if(Meteor.userId() == post._id) {
            Posts.remove(post);
        }
    }
    
    
    
})