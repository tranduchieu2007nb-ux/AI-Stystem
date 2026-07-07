const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            maxlength: 254
        },

        password: {
            type: String,
            required: true,
            select: false
        },

        location: {
            type: String,
            trim: true,
            maxlength: 160,
            default: ""
        },

        avatar: {
            type: String,
            trim: true,
            default: ""
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
            required: true
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
                return ret;
            }
        }
    }
);
module.exports =
    mongoose.models.User ||
    mongoose.model("User", userSchema);