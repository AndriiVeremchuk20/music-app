import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        require: true,
        unique: true,
    },
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    avatarPath: {
        type: String,
        default: null, 
        unique: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        require: true,
        default: Date.now(),
    }
});

const User = mongoose.model('User', userSchema);

export default User;