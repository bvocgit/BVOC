const mongoose=require('mongoose');
mongoose.connect(`mongodb://localhost:27017/testapp1`);
const userSchema= mongoose.Schema({
    burger:String,
    beverage:String,
    dessert:String
});

const User = mongoose.model('User', userSchema);

module.exports = User;