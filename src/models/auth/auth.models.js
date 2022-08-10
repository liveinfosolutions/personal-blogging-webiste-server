const mongosse = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
const { replaceByLabel } = require('../../global/global.methods');
const { SHARED_MESSAGES } = require('../../shared/shared.message');


const UserSchema = mongosse.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
});

UserSchema.plugin(uniqueValidator, { message : replaceByLabel(SHARED_MESSAGES.notUniqueError,'Email Address')});
exports.AuthModel = mongosse.model('User', UserSchema);