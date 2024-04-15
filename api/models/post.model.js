import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

  userId:{
    type:'string',
    required:true,
  },

  content:{
      type:'string',
      required: true,
    },
    
      title:{
          type: 'string',
          required: true,
          unique: true,
      },
    image:{
        type: 'string',
        default:"https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg"
    },
    category:{
        type:'string',
        default:"uncategorized"
    },
    slug:{
        type:'string',
        required:true,
        unique:true,
    }
},{timestamps:true});

const Post = mongoose.model('Post',postSchema);

export default Post;
