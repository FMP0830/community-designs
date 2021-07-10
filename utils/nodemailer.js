import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { URL, NODEMAILER_MAIL, NODEMAILER_PASS } = publicRuntimeConfig;

import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
	port: 465,
	host: 'smtp.gmail.com',
	auth: {
		user: NODEMAILER_MAIL,
		pass: NODEMAILER_PASS
	},
	secure: true
});

export function welcomeMail(user) {
	return {
		from: NODEMAILER_MAIL,
		to: user.email,
		subject: `${user.username}, Welcome to Community Designs`,
		html: `<div>
      <p>Hello there, ${user.firstName} ${user.lastName}, we thank your for registering into our webapage</p>
      <p>We want to take this time to tell you two important things</p>
      <ul>
        <li>First, we will not share your personal data with third parties or external companies, and any change in this policy will be notified according to EU GDPL</li>
        <br/>
        <li>Second, you need to activate your account in order to access all functionalities, please do so by following this link</li>
        <br />
        <br />
        <a href='${URL}/account/activate/${user.id}'>Activate your account</a>
      </ul>
    </div>`
	};
}

export function resetPwdMail(user) {
	return {
		from: NODEMAILER_MAIL,
		to: user.email,
		subject: `Reset your Community Designs password`,
		html: `<div>
      <p>Hello there, ${user.firstName} ${user.lastName}, we have received a request to reset your password</p>
      <br />
      <p>You can do so by visiting <a href='${URL}/account/reset-password/${user.id}'>this link</a></p>
      <br />
      <p>If you do not know what this email is about, feel free to ignore it, sorry for the inconvenience</p>
    </div>`
	};
}

export function newPwdMail(user) {
	return {
		from: NODEMAILER_MAIL,
		to: user.email,
		subject: `Your new Community Designs password`,
		html: `<div>
      <p>Hello there, ${user.firstName} ${user.lastName}, your password has been correctly updated</p>
      <br />
      <p>You can log in with the new password at <a href='${URL}/account/login'>this link</a></p>
      <br />
      <p>If you do not know what this email is about, feel free to ignore it, sorry for the inconvenience</p>
    </div>`
	};
}
