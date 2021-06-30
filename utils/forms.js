import { v4 as uuidv4 } from 'uuid';

export const signupFormStartingState = {
	username: '',
	email: '',
	password: '',
	pwdValidation: '',
	firstName: '',
	lastName: '',
	birthdate: '',
	street: '',
	block: '',
	city: '',
	state: '',
	country: '',
	postcode: ''
};

export function signupFormItems(formData, handleChange, handleFile) {
	return [
		{
			id: '06fe36dd-a4de-4dee-a558-d4a60a13dfe7',
			name: 'username',
			label: 'Username',
			type: 'text',
			placeholder: 'Your username',
			value: formData.username,
			change: handleChange
		},
		{
			id: 'f937b9e3-c629-427c-af2c-90e1f225480b',
			name: 'email',
			label: 'Email',
			type: 'email',
			placeholder: 'Your email address is...',
			value: formData.email,
			change: handleChange
		},
		{
			id: '5b47d5cd-959f-4432-94f3-8b39d3030e48',
			name: 'password',
			label: 'Password',
			type: 'password',
			placeholder: 'Your password',
			value: formData.password,
			change: handleChange
		},
		{
			id: '326bf76d-ef6f-4221-8d90-31ca6bf00c21',
			name: 'pwdValidation',
			label: 'Repeat your password',
			type: 'password',
			placeholder: 'Repeat your password',
			value: formData.pwdValidation,
			change: handleChange
		},
		{
			id: 'c7cc643e-d928-4fb3-b763-985b627ce55f',
			name: 'firstName',
			label: 'First Name',
			type: 'text',
			placeholder: 'First Name',
			value: formData.firstName,
			change: handleChange
		},
		{
			id: '3f5f57a9-5841-4eff-ab2c-31818374ad71',
			name: 'lastName',
			label: 'Last Name',
			type: 'text',
			placeholder: 'Last Name',
			value: formData.lastName,
			change: handleChange
		},
		{
			id: '48632754-8d0b-4fb8-a288-a4d9d5cfa195',
			name: 'birthdate',
			label: 'Date of birth',
			type: 'date',
			placeholder: '2000-01-01',
			value: formData.birthdate,
			change: handleChange
		},
		{
			id: '968e438a-d253-46a0-9ee7-bb10784b8714',
			name: 'image',
			label: 'Profile pic',
			type: 'file',
			change: handleFile
		},
		{
			id: 'b0c1f479-8c60-4226-80b6-c83b0f641f11',
			name: 'street',
			label: 'Street',
			type: 'text',
			placeholder: 'Street',
			value: formData.street,
			change: handleChange
		},
		{
			id: 'a87c7932-5032-4d88-9cce-a9b1e9efec50',
			name: 'block',
			label: 'Block',
			type: 'text',
			placeholder: 'Block',
			value: formData.block,
			change: handleChange
		},
		{
			id: 'da2ef8c9-ac31-460c-ba6b-ffac481d30f0',
			name: 'city',
			label: 'City',
			type: 'text',
			placeholder: 'City',
			value: formData.city,
			change: handleChange
		},
		{
			id: '9a453639-c264-4303-9be5-8f136978e37b',
			name: 'state',
			label: 'State',
			type: 'text',
			placeholder: 'State',
			value: formData.state,
			change: handleChange
		},
		{
			id: '410b54a5-4dd0-4fe6-8f10-5e35cc1e73dd',
			name: 'country',
			label: 'Country',
			type: 'text',
			placeholder: 'Country',
			value: formData.country,
			change: handleChange
		},
		{
			id: '0ea29181-3943-479f-b5c9-b37e065d2209',
			name: 'postcode',
			label: 'Postcode',
			type: 'text',
			placeholder: 'Postcode',
			value: formData.postcode,
			change: handleChange
		}
	];
}

export const loginFormStartingState = {
	username: '',
	password: ''
};

export function loginFormItems(formData, handleChange) {
	return [
		{
			id: '62c8a8bf-4bdc-4bb7-a084-245c2dbcc927',
			name: 'email',
			label: 'Email',
			type: 'email',
			placeholder: 'Your email address is...',
			value: formData.email,
			change: handleChange
		},
		{
			id: '3661c761-260b-49e9-988d-7e4f821280e3',
			name: 'password',
			label: 'Password',
			type: 'password',
			placeholder: 'Your password',
			value: formData.password,
			change: handleChange
		}
	];
}

export function editProfileStartingState(user) {
	return {
		username: user.username,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		street: user.address.street,
		block: user.address.block,
		city: user.address.city,
		state: user.address.state,
		country: user.address.country,
		postcode: user.address.postcode
	};
}

export function editProfileItems(formData, handleChange) {
	return [
		{
			id: '1bc24273-09b5-442e-bd20-d94ec7c7289d',
			name: 'username',
			label: 'Username',
			type: 'text',
			placeholder: 'Your username',
			value: formData.username,
			change: handleChange
		},
		{
			id: '21aed24f-8e24-421e-a6f5-cd27b5b637ec',
			name: 'email',
			label: 'Email',
			type: 'email',
			placeholder: 'Your email address is...',
			value: formData.email,
			change: handleChange
		},
		{
			id: '706607b0-8705-4edc-8b1d-8efd85337acd',
			name: 'firstName',
			label: 'First Name',
			type: 'text',
			placeholder: 'First Name',
			value: formData.firstName,
			change: handleChange
		},
		{
			id: '38c5fba0-36d0-4fbe-8828-6f3338e75082',
			name: 'lastName',
			label: 'Last Name',
			type: 'text',
			placeholder: 'Last Name',
			value: formData.lastName,
			change: handleChange
		},
		{
			id: '7ddc926e-022c-43ba-8ecc-af6c1e93f0c0',
			name: 'street',
			label: 'Street',
			type: 'text',
			placeholder: 'Street',
			value: formData.street,
			change: handleChange
		},
		{
			id: 'ecaaa9f5-5188-42d5-b1ae-8cedecc49190',
			name: 'block',
			label: 'Block',
			type: 'text',
			placeholder: 'Block',
			value: formData.block,
			change: handleChange
		},
		{
			id: '32644e2e-55de-4d15-ae90-7b4aea7a9690',
			name: 'city',
			label: 'City',
			type: 'text',
			placeholder: 'City',
			value: formData.city,
			change: handleChange
		},
		{
			id: 'ec219507-f257-447c-abdd-6535a6b6f9a5',
			name: 'state',
			label: 'State',
			type: 'text',
			placeholder: 'State',
			value: formData.state,
			change: handleChange
		},
		{
			id: '1d53b565-6a62-4ba9-92a9-e77993124ae4',
			name: 'country',
			label: 'Country',
			type: 'text',
			placeholder: 'Country',
			value: formData.country,
			change: handleChange
		},
		{
			id: '069257fc-6bb4-49ca-9354-a58f60e595a5',
			name: 'postcode',
			label: 'Postcode',
			type: 'text',
			placeholder: 'Postcode',
			value: formData.postcode,
			change: handleChange
		}
	];
}

export function editProfileHiddenItems(
	birthdate,
	image,
	handleChange,
	handleFile
) {
	return [
		{
			id: '2c229deb-c13e-40eb-85ca-85b4f64483eb',
			name: 'birthdate',
			label: 'Date of birth',
			type: 'date',
			placeholder: '2000-01-01',
			value: birthdate,
			change: handleChange
		},
		{
			id: '3125f49c-3c47-48fe-9068-4e44eb67f493',
			name: 'image',
			label: 'Profile pic',
			type: 'file',
			change: handleFile
		}
	];
}

export const uploadDesignStartingState = {
	title: '',
	description: '',
	price: 0
};

export function uploadDesignItems(formData, handleChange, image, handleFile) {
	return [
		{
			id: 'f7eaf4ce-5e2b-4bc3-a06c-d496e6af66de',
			name: 'title',
			label: 'Design title',
			type: 'text',
			placeholder: "This design's title",
			value: formData.title,
			change: handleChange
		},
		{
			id: 'e4c0aeb2-94ac-403a-a577-acc8f76b7cb3',
			name: 'description',
			label: "Design's description",
			type: 'text',
			placeholder: 'What is this piece about?',
			value: formData.description,
			change: handleChange
		},
		{
			id: '6cee78ef-38d2-4d07-80bb-885f70e16c41',
			name: 'price',
			label: 'Price',
			type: 'number',
			placeholder: 'Your price',
			value: formData.price,
			change: handleChange
		},
		{
			id: '4c799304-02e8-42d1-8540-6fd65ff72f0f',
			name: 'image',
			label: 'Choose your image',
			type: 'file',
			change: handleFile
		}
	];
}

export function updateDesignStartingState(design) {
	return {
		title: design.title,
		description: design.description,
		price: design.price
	};
}

export function updateDesignItems(formData, handleChange, image, handleFile) {
	return [
		{
			id: 'b696a539-d56a-4ddd-a99f-fb25886fde3f',
			name: 'title',
			label: 'Design title',
			type: 'text',
			placeholder: "This design's title",
			value: formData.title,
			change: handleChange
		},
		{
			id: '813c6682-0721-4b08-a454-007253700fa6',
			name: 'description',
			label: "Design's description",
			type: 'text',
			placeholder: 'What is this piece about?',
			value: formData.description,
			change: handleChange
		},
		{
			id: '27641b19-9829-4a21-8203-1fecf2be85e3',
			name: 'price',
			label: 'Price',
			type: 'number',
			placeholder: 'Your price',
			value: formData.price,
			change: handleChange
		},
		{
			id: 'e7f00462-2480-4b82-ae7d-d6b7b64d05a9',
			name: 'image',
			label: 'Choose your image',
			type: 'file',
			change: handleFile
		}
	];
}
