const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true, minlength: 3 },
		email: {
			type: String,
			unique: true,
			lowercase: true,
			trim: true,
			required: true,
			match: [
				/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
				'Please fill a valid password'
			]
		},
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		birthdate: { type: String, required: true },
		photo: {
			type: String,
			default:
				'https://i.pinimg.com/originals/3e/dc/d2/3edcd292c8aa108b8e48f03993d01635.png'
		},
		com_points: { type: Number, default: 0 },
		address: {
			street: { type: String, required: true },
			block: { type: String, required: true },
			city: { type: String, required: true },
			state: { type: String },
			country: { type: String, required: true },
			postcode: { type: String, required: true }
		},
		designs: [
			{ type: mongoose.Schema.Types.ObjectId, default: [], ref: 'Design' }
		],
		orders: [
			{ type: mongoose.Schema.Types.ObjectId, default: [], ref: 'Purchase' }
		]
	},
	{
		timestamps: true,
		toJSON: {
			transform: (doc, ret) => {
				ret.id = doc._id;
				delete ret._id;
				delete ret.__v;
				delete ret.password;

				return ret;
			}
		}
	}
);

export default mongoose.models.User || mongoose.model('User', userSchema);
