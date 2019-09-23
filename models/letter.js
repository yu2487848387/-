var mongoose = require('mongoose');
var moment=require('moment');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true});

mongoose.set('useFindAndModify', false);

var letterSchema = new Schema({
    fromUserId: {
        type: String
    },
    toUserId: {
        type: String
    },
    fromNickname: {
        type: String,
        default: ''
    },
    fromHeader_img: {
        type: String,
        default: 'public/img/tou1.jpg'
    },
    content:{
      type:String
    },
    state: {
        type: Number,
        default: 0
    },
    createTime: {
        type: String,
        default:() => moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    }
});

module.exports = mongoose.model('Letter', letterSchema);


