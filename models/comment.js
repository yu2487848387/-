var moment=require('moment');
var mongoose=require('mongoose');

var Schema=mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser: true});

var commentSchema=new Schema({
    content:{
        type:String
    },
    userId:{
        type:String
    },
    userName:{
        type:String
    },
    userHeaderImg:{
        type:String
    },
    likes:{
        type:Number,
        default: 0
    },
    articleId:{
      type:String
    },
    articleID:{ //关联文章表
        type: Schema.Types.ObjectId,
        ref:'Article'
    },
    commentTo:{
      type:String
    },
    createTime: {
        type: String,
        default:() => moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    },
    flag:{
        type:String,
        default:'-1'
    }
});

module.exports=mongoose.model('Comment',commentSchema);


