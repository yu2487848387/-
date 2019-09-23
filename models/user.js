
var mongoose=require('mongoose');

var Schema=mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser: true});

mongoose.set('useFindAndModify', false);

var userSchema=new Schema({
    email:{
        type:String,
    },
    nickname:{
        type:String,
        default:''
    },
    password:{
        type:String
    },
    age:{
        type:Number,
        default:18
    },
    sex:{
        type:Number,
        default:0
    },
    header_img:{
        type:String,
        default: 'public/img/tou1.jpg'
    },
    state:{
        type:Number,
        default:1
    },
    qq:{
        type:String,
        default:''
    },
    person_introduce:{
        type:String,
        default:''
    }
});

module.exports=mongoose.model('User',userSchema);


