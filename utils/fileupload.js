import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { CLOUDINARY_NAME, CLOUDINARY_PRESET } = publicRuntimeConfig;

export default async function uploadFile(fileToUpload) {
	console.log(CLOUDINARY_NAME);

	const data = new FormData();

	data.append('file', fileToUpload);
	data.append('upload_preset', CLOUDINARY_PRESET);
	data.append('cloud_name', CLOUDINARY_NAME);
	data.append('folder', 'community-designs');

	const upload = await fetch(
		`https://api.Cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
		{
			method: 'POST',
			body: data
		}
	);

	const imgUpload = await upload.json();
	console.log('imgUpload result', imgUpload);
	return imgUpload.url;
}
