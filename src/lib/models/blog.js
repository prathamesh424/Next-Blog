import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,  
  },
  description: {
    type: String,
    required: true, 
  },
  picture: {
    type: String, 
    required: false,
    default: "" 
  },
  categories: {
    type: [String],  
    default: [],    
  },
  createdAt: {
    type: Date,
    default: Date.now 
  },
  author:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required : true  
  },
});

BlogSchema.plugin(mongooseAggregatePaginate)
const Blog = mongoose.models.Blog ||  mongoose.model('Blog', BlogSchema);

export default Blog;
