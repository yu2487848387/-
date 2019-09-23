var moment=require('moment');
var mongoose=require('mongoose');

var Schema=mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser: true});

var articleSchema=new Schema({
    title:{
        type:String
    },
    content:{
        type:String
    },
    authorId:{
        type:String
    },
    authorID:{  //new
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    authorName:{
        type:String
    },
    likes:{
        type:Number,
        default: 0
    },
    createTime: {
        type: String,
        default:() => moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    },
    abstract:{
        type:String
    },
    firstImg:{
        type:String
    },
    wordNumber:{
        type:Number,
        default:0
    },
    commentNumber:{
        type:Number,
        default:0
    }
});

module.exports=mongoose.model('Article',articleSchema);


