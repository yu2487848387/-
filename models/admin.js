//管理员表
var moment=require('moment');
var mongoose=require('mongoose');

var Schema=mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser: true});

var adminSchema=new Schema({
    adminName:{
      type: String
    },
    adminPassword:{
        type:String
    },
    createTime: {
        type: String,
        default:() => moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    }
});

module.exports=mongoose.model('Admin',adminSchema);


