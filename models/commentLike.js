var moment=require('moment');
var mongoose=require('mongoose');

var Schema=mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser: true});

mongoose.set('useFindAndModify', false); //取消更新时的弃用警告

var commentLikeSchema=new Schema({
    commentId:{
      type:String
    },
    userId:{
        type:String
    },
    createTime: {
        type: String,
        default:() => moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    }
});

module.exports=mongoose.model('CommentLike',commentLikeSchema);


