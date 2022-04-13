import mongoose, { Schema, model } from 'mongoose';
import { issueJWT } from 'src/utils/utils';
import validator from "validator"
import { BadRequest, GeneralError } from '../utils/errors';

enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface User extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    age: number;
    role: Role;
    tokens: [string];
};

const UserSchema = new Schema<User>({
    name: {
        type: Schema.Types.String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new BadRequest("Email is invalid");
            }
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new BadRequest('Password cannot contain "password"');
            }
        },
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new BadRequest("Age must be a postive number");
            }
        },
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: 'USER',
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
}, {
    timestamps: true,
});

UserSchema.virtual("collections", {
    ref: "Collection",
    localField: "_id",
    foreignField: "creator",
})

UserSchema.virtual("arts", {
    ref: "Art",
    localField: "_id",
    foreignField: "creator",
})

UserSchema.statics.findDuplicateEmails = async function (email: string) {
    try {
        let user = await this.findOne({ email }).lean();
        if (user) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new GeneralError(error);
    }
};

export default model<User>('User', UserSchema);