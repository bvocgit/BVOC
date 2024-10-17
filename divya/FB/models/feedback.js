var mongoose =  require('mongoose');

var feedbackSchema = new mongoose.Schema({
    name : {
        type : String,
        required : function() { return !this.confidential; }
    },

    email : {
        type : String,
        // required : function() { return !this.confidential; }
    },

    feedback : {
        type : String,
        required : true
    },

    category : {
        type : String,
        enum : ['student', 'employee', 'client', 'teacher'],
        required : true
    },

    confidential : {
        type : Boolean,
        required : true
    },

    timestamp : {
        type : Date,
        default : Date.now
    }
});

var Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;