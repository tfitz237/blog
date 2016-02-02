Posts = new Mongo.Collection("posts");

Meteor.methods({    
    setPost: setPost,
    deletePost: deletePost
});



function deletePost(id) {
        var post = Posts.findOne({_id:id});
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        } else if (Meteor.userId() == post.owner) {
            Posts.remove(post);
        }

}


function setPost(edit, post) {
    var valid = (edit) ? (Meteor.userId() == post.owner) : true;
    if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
    } else if (valid) {
        var rtn = {
            type: post.type,
            text: post.text,
            title: post.title,
            updatedAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        };   
        rtn.tags = (edit) ? post.tags : {};
        rtn.createdAt = (edit) ? post.createdAt : new Date();
        switch (post.type) {
            case 'music':
            case 'link':
                rtn.url = post.url;
                var oldurl = (edit) ? Posts.findOne({_id: post._id}).url : null;
                if (!edit || (post.url != oldurl)) {
                    HTTP.call("GET", 'https://api.embedly.com/1/oembed', {params: {key:'afc044c2a50440c0bd8216adddc728f2',url:post.url}},
                        function(error,result) {
                            if (!error) {
                                rtn.embed = result.data;
                                rtn.title = result.title;
                                (edit) ? Posts.update(post._id, rtn) : Posts.insert(rtn);
                            }
                        }
                    );
                } else {
                    rtn.embed = post.embed;
                    (edit) ? Posts.update(post._id, rtn): Posts.insert(rtn);
                }
                break;
            case 'image':
                rtn.image = post.image;
            case 'text':
                (edit) ? Posts.update(post._id, rtn) : Posts.insert(rtn);
                break;
            } 
        }    
    
    
}    
    