// Practicando Firebase Auth
// https://firebase.google.com/docs/auth/web/password-auth?hl=es-419

// 0. Datos para conectar con la base de datos de mi proyecto en Firebase
// Change this string 'XXXXXXXXXXXX' for yor data
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "XXXXXXXXXXXX",
	authDomain: "XXXXXXXXXXXX",
	databaseURL: "XXXXXXXXXXXX",
	projectId: "XXXXXXXXXXXX",
	storageBucket: "XXXXXXXXXXXX",
	messagingSenderId: "XXXXXXXXXXXX",
	appId: "XXXXXXXXXXXX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.info("Firebase Conexion:", firebase);



/**
 * @const firebaseErrors
 * @type {Object}
 * @description List of firebase errors
 */
const firebaseErrors = {
	"auth/internal-error": "Internal error",
	"argument-error": "",
	"app-not-authorized": "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
	"app-not-installed": "The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",
	"captcha-check-failed": "",
	"code-expired": "",
	"cordova-not-ready": "Cordova framework is not ready.",
	"cors-unsupported": "This browser is not supported.",
	"credential-already-in-use": "This credential is already associated with a different user account.",
	"custom-token-mismatch": "The custom token corresponds to a different audience.",
	"requires-recent-login": "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
	"dynamic-link-not-activated": "Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",
	"email-already-in-use": "The email address is already in use by another account.",
	"expired-action-code": "The action code has expired. ",
	"cancelled-popup-request": "This operation has been cancelled due to another conflicting popup being opened.",
	"internal-error": "An internal error has occurred.",
	"invalid-app-credential": "",
	"invalid-app-id": "The mobile app identifier is not registed for the current project.",
	"invalid-user-token": "The user's credential is no longer valid. The user must sign in again.",
	"invalid-auth-event": "An internal error has occurred.",
	"invalid-verification-code": "",
	"invalid-cordova-configuration": "The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
	"invalid-custom-token": "The custom token format is incorrect. Please check the documentation.",
	"invalid-email": "The email address is badly formatted.",
	"invalid-api-key": "Your API key is invalid, please check you have copied it correctly.",
	"invalid-credential": "The supplied auth credential is malformed or has expired.",
	"invalid-message-payload": "The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
	"invalid-oauth-provider": "EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",
	"unauthorized-domain": "This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
	"invalid-action-code": "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",
	"wrong-password": "The password is invalid or the user does not have a password.",
	"invalid-identifier-number": "",
	"invalid-recipient-email": "The email corresponding to this action failed to send as the provided recipient email address is invalid.",
	"invalid-sender": "The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",
	"invalid-verification-id": "",
	"missing-iframe-start": "An internal error has occurred.",
	"auth-domain-config-required": "Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",
	"missing-app-credential": "",
	"missing-verification-code": "",
	"missing-identifier-number": "",
	"missing-verification-id": "",
	"app-deleted": "This instance of FirebaseApp has been deleted.",
	"account-exists-with-different-credential": "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
	"network-request-failed": "A network error (such as timeout, interrupted connection or unreachable host) has occurred.",
	"no-auth-event": "An internal error has occurred.",
	"no-such-provider": "User was not linked to an account with the given provider.",
	"operation-not-allowed": "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",
	"operation-not-supported-in-this-environment": 'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
	"popup-blocked": "Unable to establish a connection with the popup. It may have been blocked by the browser.",
	"popup-closed-by-user": "The popup has been closed by the user before finalizing the operation.",
	"provider-already-linked": "User can only be linked to one identity for the given provider.",
	"quota-exceeded": "",
	"redirect-cancelled-by-user": "The redirect operation has been cancelled by the user before finalizing.",
	"redirect-operation-pending": "A redirect sign-in operation is already pending.",
	timeout: "The operation has timed out.",
	"user-token-expired": "The user's credential is no longer valid. The user must sign in again.",
	"too-many-requests": "We have blocked all requests from this device due to unusual activity. Try again later.",
	"user-cancelled": "User did not grant your application the permissions it requested.",
	"user-not-found": "There is no user record corresponding to this identifier. The user may have been deleted.",
	"user-disabled": "The user account has been disabled by an administrator.",
	"user-mismatch": "The supplied credentials do not correspond to the previously signed in user.",
	"user-signed-out": "",
	"weak-password": "The password must be 6 characters long or more.",
	"web-storage-unsupported": "This browser is not supported or 3rd party cookies and data may be disabled."
};


/**
 * @function stringToNode
 * @description Convert string to DOM node
 * @param {String} string String to convert
 * @returns {Element}
 */
function stringToNode(string) {
	const nodeDOM = document.createRange().createContextualFragment(string);
	return nodeDOM;
}


/**
 * @function scrollTop
 * @description Reset scroll window to top
 */
function scrollTop() {
	window.scrollTo(0, 0);
}


/**
 * @function labelAnimation
 * @description Add animation to label of the focus field
 */
function labelAnimation() {
	const formFields = document.getElementsByClassName("c-form__field--anim");

	[...formFields].map((field) => {
		// Reset all empty fields on focus/blur
		const fieldValue = field.value;
		if (fieldValue === "") {
			field.parentNode.classList.remove("is-focus");
		} else {
			field.parentNode.classList.add("is-focus");
		}

		// This empty field on focus
		field.addEventListener("focus", function () {
			const $thisField = this;

			$thisField.parentNode.classList.add("is-focus");
		});

		// This empty field on blur
		field.addEventListener("blur", function () {
			const $thisField = this;
			const $thisFieldValue = $thisField.value;

			if ($thisFieldValue === "") {
				$thisField.parentNode.classList.remove("is-focus");
			} else {
				$thisField.parentNode.classList.add("is-focus");
			}
		});
	});
}


/**
 * @function hideAllSections
 * @description Reset status of sections hide it
 */
function hideAllSections() {
	const sections = document.getElementsByClassName("c-page__article");
	[...sections].map((section) => section.classList.remove("is-active"));
}


/**
 * @function showSection
 * @description Show section and hide the others
 * @param {String} idName Id name selector
 */
function showSection(idName) {
	const section = document.getElementById(idName);
	hideAllSections();
	section.classList.add("is-active");
}


/**
 * @function removeSection
 * @description Remove element DOM
 * @param {String} idName Id name selector
 */
function removeSection(idName) {
	const section = document.getElementById(idName);
	if (section) {
		section.parentNode.removeChild(section);
	}
}


/**
 * @function insertSection
 * @description Insert section
 * @param {String} sectionName Section name
 * @param {String} createTemplate Name of function for create template of section
 * @param {Null|Object} data User data for the template
 */
function insertSection(sectionName, createTemplate, data = null) {
	const content = document.getElementById("section");
	const template = (data === null) ? createTemplate() : createTemplate(data);
	const templateNode = stringToNode(template);
	removeSection(sectionName);
	content.appendChild(templateNode);
}


/**
 * @function message
 * @description Create, insert and add events for the message component
 * @param {Object} data Message data for the template
 */
function message(data) {

	function insertTemplate() {
		const template = `
		<div id="message" class="c-message ${data.className}">
			<div id="messageButtonClose" class="c-message__inner">
				<button class="c-message__close">
					<i class="fas fa-times"></i>
				</button>
				<h6 class="c-message__title">
					${data.title}
				</h6>
				<p class="c-message__description">
					${data.description}
				</p>
			</div>
		</div>
		`;

		const nodeTemplate = stringToNode(template);
		document.getElementById("body").appendChild(nodeTemplate);
	}

	function showHideAnimation() {
		setTimeout(function () {
			const message = document.getElementById("message");
			message.classList.add("is-show");
		}, 100);

		setTimeout(function () {
			removeSection("message");
		}, 10500);
	}

	function addEventClose() {
		const buttonClose = document.getElementById("messageButtonClose");
		buttonClose.addEventListener("click", function () {
			setTimeout(function () {
				const message = document.getElementById("message");
				message.classList.remove("is-show");
			}, 0);

			setTimeout(function () {
				removeSection("message");
			}, 100);
		});
	}

	removeSection("message");
	insertTemplate();
	showHideAnimation();
	addEventClose();
}


/**
 * @function createAdorableAvatar
 * @description Create photo default with the API Adorable Avatars
 * @param {String} email For create the photo it need a email
 */
function createAdorableAvatar(email) {
	const photoDefault = `https://api.adorable.io/avatars/285/${email}.png`;
	return photoDefault;
}


/**
 * @function createArrayDataUser
 * @description Obtain registered user data
 * @param {Object} data User data for create a
 * @returns {Object|Boolean}
 */
function createArrayDataUser(data) {
	if (data != null) {
		const userData = {
			id: data.uid,
			creationTime: data.metadata.creationTime,
			lastSignInTime: data.metadata.lastSignInTime,
			name: data.displayName,
			email: data.email,
			photo: data.photoURL,
			emailVerified: data.emailVerified,
			isAnonymous: data.isAnonymous
		};

		return userData;
	} else {
		return false;
	}
}


/**
 * @function createTemplateAccount
 * @description Create template with user data
 * @param {Object} data User data
 */
function createTemplateAccount(data) {
	const dataUser = createArrayDataUser(data);

	if (dataUser !== false) {
		let templateName, templateEmail, templatePhoto;

		if (dataUser.name !== null) {
			templateName = `
				<div class="c-account-data__item">
					<p>
						<strong class="c-account-data__title">
							Name:
						</strong>
						${dataUser.name}
					</p>
				</div>
				`;
		} else {
			templateName = "";
		}

		if (dataUser.email !== null) {
			templateEmail = `
				<div class="c-account-data__item">
					<p>
						<strong class="c-account-data__title">
							Email:
						</strong>
						${dataUser.email}
					</p>
				</div>
				`;
		} else {
			templateEmail = "";
		}

		if (dataUser.photo !== null && dataUser.name) {
			templatePhoto = `
				<div class="c-account-data__item">
					<img class="c-account-data__photo" src="${dataUser.photo}" alt="${dataUser.name}">
				</div>
				`;
		} else {
			templatePhoto = "";
		}


		const template = `
			<article id="account" class="c-page__article is-active">
				<div class="c-account-data c-box">
					<div class="c-account-data__inner">
						<div class="c-account-data__column">
							<div class="c-account-data__row">
								${templatePhoto}
							</div>
							<div class="c-account-data__row">
								<div class="c-list-buttons c-list c-list--justify">
									<button id="buttonUpdateShow" class="c-button--edit c-button c-list__item">
										Edit
									</button>
									<button id="buttonDeleteShow" class="c-button--delete c-button c-list__item">
										Delete
									</button>
									<button id="buttonLogOut" class="c-button--logOut c-button c-list__item">
										LogOut
									</button>
								</div>
							</div>
						</div>
						<div class="c-account-data__column">
							<h2 class="c-page__subtitle">
								Account
							</h2>
							<div class="c-account-data__row">
								<div class="c-account-data__item">
									<p>
										<strong class="c-account-data__title">
											Creation Time:
										</strong>
										${dataUser.creationTime}
									</p>
								</div>
								<div class="c-account-data__item">
									<p>
										<strong class="c-account-data__title">
											Last SingIn Time:
										</strong>
										${dataUser.lastSignInTime}
									</p>
								</div>
							</div>

							<div class="c-account-data__row">
								${templateName}
								${templateEmail}
							</div>

							<div class="c-account-data__row">
								<div class="c-account-data__item">
									<p>
										<strong class="c-account-data__title">
											Email verified:
										</strong>
										${dataUser.emailVerified}
									</p>
								</div>
								<div class="c-account-data__item">
									<p>
										<strong class="c-account-data__title">
											Anonymous:
										</strong>
										${dataUser.isAnonymous}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</article>
			`;

		return template;
	} else {
		message({
			title: "Error!",
			description: "Failed to get user data",
			className: "is-error"
		});

		const template = "";
		return template;
	}
}


/**
 * @function createTemplateUpdate
 * @description Create template update
 * @param {Object} data User data
 * @returns {String}
 */
function createTemplateUpdate(data) {
	const dataUser = createArrayDataUser(data);

	const name = (dataUser.name !== null) ? dataUser.name : "";
	const photo = (dataUser.photo !== null) ? dataUser.photo : "";

	const template = `
		<article id="update" class="c-page__article">
			<form id="formUpdate" class="c-form c-box" action="">
				<fieldset class="c-fieldset">
					<legend class="c-legend">
						Update Account
					</legend>

					<div class="c-form__item">
						<label class="c-label c-label--anim" for="nameUserUpdate">
							Name
						</label>
						<input id="nameUserUpdate" class="c-form__field c-form__field--anim" type="text" value="${name}">
					</div>

					<div class="c-form__item">
						<label class="c-label c-label--anim" for="photoUserUpdate">
							Photo
						</label>
						<input id="photoUserUpdate" class="c-form__field c-form__field--anim" type="url" value="${photo}">
					</div>

					<input id="emailUserUpdate" value="${dataUser.email}" type="hidden">
				</fieldset>

				<div class="c-list c-list--justify">
					<input id="buttonUpdate" class="c-button c-list__item" type="submit" value="UPDATE">
					<button id="buttonAccountShow" class="c-link c-list__item">
						Go to Account
					</button>
				</div>
			</form>
		</article>
		`;
	return template;
}


/**
 * @function createTemplateDelete
 * @description Create template delete
 * @returns {String}
 */
function createTemplateDelete() {
	const template = `
		<article id="delete" class="c-page__article">
			<form id="formDelete" class="c-form c-box" action="">
				<fieldset class="c-fieldset">
					<legend class="c-legend">
						Delete Account
					</legend>

					<div class="c-form__item">
						<label class="c-label c-label--anim" for="passwordUserDelete">
							Password
						</label>
						<input id="passwordUserDelete" class="c-form__field c-form__field--anim" type="password">
					</div>
				</fieldset>

				<div class="c-list c-list--justify">
					<input id="buttonDelete" class="c-button c-list__item" type="submit" value="DELETE">
					<button id="buttonAccountShow" class="c-link c-list__item">
						Go to Account
					</button>
				</div>
			</form>
		</article>
		`;
	return template;
}


/**
 * @function addEventsRegisterPassword
 * @description Add events for register form
 */
function addEventsRegisterPassword() {
	const buttonRegister = document.getElementById("buttonRegister");
	const buttonRegisterShow = document.getElementById("buttonRegisterShow");
	const emailUserRegister = document.getElementById("emailUserRegister");
	const passwordUserRegister = document.getElementById("passwordUserRegister");

	if (buttonRegisterShow) {
		buttonRegisterShow.addEventListener("click", function (event) {
			event.preventDefault();
			showSection("register");
			scrollTop();
		});
	}

	if (buttonRegister && emailUserRegister && passwordUserRegister) {
		buttonRegister.addEventListener("click", function (event) {
			event.preventDefault();
			const valueEmail = emailUserRegister.value;
			const valuePass = passwordUserRegister.value;

			if ((valueEmail !== null && valueEmail !== "") &&
				(valuePass !== null && valuePass !== "")) {

				firebaseAuthRegisterUserPassword(valueEmail, valuePass);
				scrollTop();
			}
		});
	}
}


/**
 * @function addEventsLogInPassword
 * @description Add events for login form with email and pass
 */
function addEventsLogInPassword() {
	const buttonLogIn = document.getElementById("buttonLogIn");
	const buttonLogInShow = document.getElementById("buttonLogInShow");
	const emailUserLogIn = document.getElementById("emailUserLogIn");
	const passwordUserLogIn = document.getElementById("passwordUserLogIn");

	if (buttonLogInShow) {
		buttonLogInShow.addEventListener("click", function (event) {
			event.preventDefault();
			showSection("logIn");
			scrollTop();
		});
	}

	if (buttonLogIn && emailUserLogIn && passwordUserLogIn) {
		buttonLogIn.addEventListener("click", function (event) {
			event.preventDefault();
			const valueEmail = emailUserLogIn.value;
			const valuePass = passwordUserLogIn.value;

			if ((valueEmail !== null && valueEmail !== "") &&
				(valuePass !== null && valuePass !== "")) {

				firebaseAuthLogInUserPassword(valueEmail, valuePass);
				scrollTop();
			}
		});
	}
}


/**
 * @function addEventsLogInGoogle
 * @description Add events for login form with google button
 */
function addEventsLogInGoogle() {
	const buttonLogIn = document.getElementById("buttonLogInGoogle");

	buttonLogIn.addEventListener("click", function (event) {
		event.preventDefault();
		firebaseAuthLogInUserGoogle();
		scrollTop();
	});
}


/**
 * @function addEventsLogInFacebook
 * @description Add events for login form with facebook button
 */
function addEventsLogInFacebook() {
	const buttonLogIn = document.getElementById("buttonLogInFacebook");

	buttonLogIn.addEventListener("click", function (event) {
		event.preventDefault();
		firebaseAuthLogInUserFacebook();
		scrollTop();
	});
}


/**
 * @function addEventsLogInTwitter
 * @description Add events for login form with twitter button
 */
function addEventsLogInTwitter() {
	const buttonLogIn = document.getElementById("buttonLogInTwitter");

	buttonLogIn.addEventListener("click", function (event) {
		event.preventDefault();
		firebaseAuthLogInUserTwitter();
		scrollTop();
	});
}


/**
 * @function addEventsLogInGithub
 * @description Add events for login form with github button
 */
function addEventsLogInGithub() {
	const buttonLogIn = document.getElementById("buttonLogInGithub");

	buttonLogIn.addEventListener("click", function (event) {
		event.preventDefault();
		firebaseAuthLogInUserGithub();
		scrollTop();
	});
}


/**
 * @function addEventsAccount
 * @description Add events for account form
 */
function addEventsAccount() {
	const buttonAccountShow = document.getElementById("buttonAccountShow");

	if (buttonAccountShow) {
		buttonAccountShow.addEventListener("click", function (event) {
			event.preventDefault();
			showSection("account");
			scrollTop();
		});
	}
}


/**
 * @function addEventsLogOut
 * @description Add events for logout form
 */
function addEventsLogOut() {
	const buttonLogOut = document.getElementById("buttonLogOut");

	if (buttonLogOut) {
		buttonLogOut.addEventListener("click", function (event) {
			event.preventDefault();
			firebaseAuthLogOutUser();
			scrollTop();
		});

		// Force logout 1h
		const maxTime = 3600000;
		setTimeout(function () {
			firebaseAuthLogOutUser();
			scrollTop();
		}, maxTime);
	}
}


/**
 * @function addEventsUpdate
 * @description Add events for update form
 */
function addEventsUpdate() {
	const buttonUpdateShow = document.getElementById("buttonUpdateShow");
	const buttonUpdate = document.getElementById("buttonUpdate");
	const nameUserUpdate = document.getElementById("nameUserUpdate");
	const photoUserUpdate = document.getElementById("photoUserUpdate");


	if (buttonUpdateShow) {
		buttonUpdateShow.addEventListener("click", function (event) {
			event.preventDefault();
			showSection("update");
			scrollTop();
		});
	}

	if (buttonUpdate && nameUserUpdate && photoUserUpdate) {
		buttonUpdate.addEventListener("click", function (event) {
			event.preventDefault();
			const valueEmail = emailUserUpdate.value;
			const valueName = nameUserUpdate.value;
			const valuePhoto = photoUserUpdate.value;
			const photoDefault = createAdorableAvatar(valueEmail);

			if ((valueName !== null && valueName !== "")) {

				const photo = (valuePhoto == null || valuePhoto === "") ? photoDefault : valuePhoto;
				firebaseAuthUpdateUser(valueName, photo);
				scrollTop();
			}
		});
	}
}


/**
 * @function addEventsDelete
 * @description Add events for delete form
 */
function addEventsDelete() {
	const buttonDeleteShow = document.getElementById("buttonDeleteShow");
	const buttonDelete = document.getElementById("buttonDelete");
	const passwordUserDelete = document.getElementById("passwordUserDelete");

	if (buttonDeleteShow) {
		buttonDeleteShow.addEventListener("click", function (event) {
			event.preventDefault();
			showSection("delete");
			scrollTop();
		});
	}

	if (buttonDelete && passwordUserDelete) {
		buttonDelete.addEventListener("click", function (event) {
			event.preventDefault();
			const valuePass = passwordUserDelete.value;

			if ((valuePass !== null && valuePass !== "")) {
				firebaseAuthDeleteUser(valuePass);
				scrollTop();
			}
		});
	}
}


/**
 * @function afterLogged
 * @description Function that execute after logged
 * @param {Object} user User data
 */
function afterLogged(user) {
	// DOM
	hideAllSections();
	insertSection("account", createTemplateAccount, user);
	insertSection("update", createTemplateUpdate, user);
	insertSection("delete", createTemplateDelete, null);
	labelAnimation();
	scrollTop();

	// EVENTS
	addEventsAccount();
	addEventsUpdate();
	addEventsDelete();
	addEventsLogOut();
}


/**
 * @function firebaseVerifyError
 * @description Verify if the firebase error it is a 'Internal error' for convert it to object
 * @param {String} text 
 */
function firebaseVerifyError(errorCode, errorMessage) {
	if (errorCode === "Internal error") {
		const stringToObject = JSON.parse(errorMessage);
		const textMessage = stringToObject.error.message;
		return textMessage;
	} else {
		return errorMessage;
	}
}


/**
 * @function firebaseAuthRegisterUserPassword
 * @description FIREBASE AUTH - REGISTER user with email and password
 * @param {String} email Email data obtained from the register form
 * @param {String} password Password data obtained from the register form
 */
function firebaseAuthRegisterUserPassword(email, password) {
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(() => {
			const user = firebase.auth().currentUser;
			const userData = user.providerData;

			console.group("Success to register!");
			console.info("Email:", email);
			console.info("Password:", password);

			userData.forEach(function (profile) {
				message({
					title: "Thanks for registering!",
					description: profile.email,
					className: "is-success"
				});
			});
			console.groupEnd();
		})
		.catch(function (error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;

			console.group("Error to register!");
			console.warn("Error code:", errorCode);
			console.warn("Error message:", errorMessage);
			console.groupEnd();

			const verifiedMessage = firebaseVerifyError(firebaseErrors[errorCode], errorMessage);
			message({
				title: "Error!",
				description: verifiedMessage,
				className: "is-error"
			});
		});
}


/**
 * @function firebaseAuthLogInUserPassword
 * @description FIREBASE AUTH - LOGIN user with email and password
 * @param {String} email Email data obtained from the login form
 * @param {String} password Password data obtained from the login form
 */
function firebaseAuthLogInUserPassword(email, password) {
	firebase.auth().signInWithEmailAndPassword(email, password)
		.then(() => {
			const user = firebase.auth().currentUser;
			const userData = user.providerData;

			console.group("Success login!");
			userData.forEach(function (profile) {
				message({
					title: "Welcome!",
					description: profile.email,
					className: "is-success"
				});
			});
			console.groupEnd();
		})
		.catch(function (error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;

			console.group("Error to login!");
			console.warn("Error code:", errorCode);
			console.warn("Error message:", errorMessage);
			console.groupEnd();

			const verifiedMessage = firebaseVerifyError(firebaseErrors[errorCode], errorMessage);
			message({
				title: "Error!",
				description: verifiedMessage,
				className: "is-error"
			});
		});
}


/**
 * @function firebaseAuthLogInUserGoogle
 * @description FIREBASE AUTH - LOGIN user with google account
 * Instructions:
 * 1. Login https://console.firebase.google.com/
 * 2. Authentication > Sign-in method > Login Providers
 * 3. Active Google with the email used in firebase
 * Instructions: Error Firebase: This domain is not authorized
 * 1. Login https://console.cloud.google.com
 * 2. Go to APIs & Services > Credentials
 * 3. Select API Key you are using in your app that connects to FireBase
 * 4. Select Application restrictions: HTTP referrers (web sites)
 * 5. Add Website restrictions: http://localhost:5500/
 */
function firebaseAuthLogInUserGoogle() {
	const provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider)
		.then((result) => {
			const token = result.credential.accessToken;
			const user = result.user;

			console.group("Google sing in!");
			console.info("Token:", token);
			console.info("User:", user);
			console.groupEnd();

			message({
				title: "Welcome!",
				description: profile.email,
				className: "is-success"
			});
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;

			console.group("Error to login!");
			console.warn("Error code:", errorCode);
			console.warn("Error message:", errorMessage);
			console.groupEnd();

			const verifiedMessage = firebaseVerifyError(firebaseErrors[errorCode], errorMessage);
			message({
				title: "Error!",
				description: verifiedMessage,
				className: "is-error"
			});
		});
}


/**
 * @function firebaseAuthLogInUserFacebook
 * @description FIREBASE AUTH - LOGIN user with facebook account
 * Instructions:
 * 1. Login https://console.firebase.google.com/
 * 2. Authentication > Sign-in method > Login Providers
 * 3. Active Facebook with the email used in firebase
 * 4. Login https://developers.facebook.com/
 * 5. Mis applicaciones > Crear aplicacion > Para todo lo demas (...integrar inicio de sesion con Facebook..)
 * Add name and email used of the App Firebase
 * 6. Inicio de sesion con Facebook > Web > URL del sitio web http://localhost:5500/
 * 7. (Menu izq) Productos Configuracion > Si 'Acceso de OAuth de navegador insertado'
 * 8. On the Console Firebase when Active Facebook: Copy link 'URI de redirección de OAuth'
 * On Developers Facebook: Paste 'URI de redireccionamiento de OAuth válidos'
 * 9. On Developers Facebook: Configuracion > Informacion basica > Copy 'Identificador de la applicacion' and 'Clave secreta de la applicacion'
 * On the Console Firebase when Active Facebook: Paste the Id and secret App
 * 10. Delete the user account if it is already registered with other social media:
 * Error message: An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.
 */
function firebaseAuthLogInUserFacebook() {
	const provider = new firebase.auth.FacebookAuthProvider();
	firebase.auth().signInWithPopup(provider)
		.then((result) => {
			const token = result.credential.accessToken;
			const user = result.user;

			console.group("Facebook sing in!");
			console.info("Token:", token);
			console.info("User:", user);
			console.groupEnd();

			message({
				title: "Welcome!",
				description: profile.email,
				className: "is-success"
			});
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;

			console.group("Error to login!");
			console.warn("Error code:", errorCode);
			console.warn("Error message:", errorMessage);
			console.groupEnd();

			const verifiedMessage = firebaseVerifyError(firebaseErrors[errorCode], errorMessage);
			message({
				title: "Error!",
				description: verifiedMessage,
				className: "is-error"
			});
		});
}


/**
 * @function firebaseAuthLogInUserTwitter
 * @description FIREBASE AUTH - LOGIN user with twitter account
 * Instructions:
 * 1. Login https://developer.twitter.com/en/apps
 * 2. When you create your first app, you have to answer some questions and wait for the review (less than 1 day)
 * 3. Go to https://developer.twitter.com/en/portal/projects-and-apps
 * Standalone Apps > Create App (name)
 * Proyects > New proyect (name, student, description, chose the app)
 * Authentication settings > Website url (Error to use localhost, use any domain as http://google.com, as long as it's a valid domain name it should work.)
 * On Firebase: Authentication > Sign-in method > 'Dominios autorizados' add http://127.0.0.1/
 */
function firebaseAuthLogInUserTwitter() {
	const provider = new firebase.auth.TwitterAuthProvider();
	firebase.auth().signInWithPopup(provider)
		.then((result) => {
			const token = result.credential.accessToken;
			const user = result.user;

			console.group("Twitter sing in!");
			console.info("Token:", token);
			console.info("User:", user);
			console.groupEnd();

			message({
				title: "Welcome!",
				description: profile.email,
				className: "is-success"
			});
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;

			console.group("Error to login!");
			console.warn("Error code:", errorCode);
			console.warn("Error message:", errorMessage);
			console.groupEnd();

			const verifiedMessage = firebaseVerifyError(firebaseErrors[errorCode], errorMessage);
			message({
				title: "Error!",
				description: verifiedMessage,
				className: "is-error"
			});
		});
}


/**
 * @function firebaseAuthLogInUserGithub
 * @description FIREBASE AUTH - LOGIN user with github account
 * Instructions:
 * 1. Login https://github.com/settings/applications/new
 * 2. On Github: Register a new OAuth application:
 * - Application name: Firebase name
 * - Homepage URL: http://localhost:5500/
 * - Authorization callback URL: (On Console Firebase copy URL)
 * 3. On Github copy ID de cliente and Client Secret and paste on Firebase
 */
function firebaseAuthLogInUserGithub() {
	const provider = new firebase.auth.GithubAuthProvider();
	firebase.auth().signInWithPopup(provider)
		.then((result) => {
			const token = result.credential.accessToken;
			const user = result.user;

			console.group("Github sing in!");
			console.info("Token:", token);
			console.info("User:", user);
			console.groupEnd();

			message({
				title: "Welcome!",
				description: profile.email,
				className: "is-success"
			});
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;

			console.group("Error to login!");
			console.warn("Error code:", errorCode);
			console.warn("Error message:", errorMessage);
			console.groupEnd();

			const verifiedMessage = firebaseVerifyError(firebaseErrors[errorCode], errorMessage);
			message({
				title: "Error!",
				description: verifiedMessage,
				className: "is-error"
			});
		});
}


/**
 * @function firebaseAuthUpdateUser
 * @description FIREBASE AUTH - Update account
 * @param {String} name Name data obtained from the update form
 * @param {String} photo Photo data obtained from the update form
 */
function firebaseAuthUpdateUser(name, photo) {
	const user = firebase.auth().currentUser;

	const dataUserUpdated = {
		displayName: name,
		photoURL: photo
	};


	user.updateProfile(dataUserUpdated)
		.then(function () {
			const user = firebase.auth().currentUser;
			const userData = user.providerData;

			console.group("Success user account updated!");
			userData.forEach(function (profile) {
				console.info("Provider-specific UID:", profile.uid);
				console.info("Email:", profile.email);

				message({
					title: "Account updated!",
					description: `Name: ${profile.displayName}<br> Photo: ${profile.photoURL}`,
					className: "is-success"
				});
			});
			console.groupEnd();

			afterLogged(user);
		})
		.catch(function (error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;

			console.group("Error user account updated!");
			console.warn("Error code:", errorCode);
			console.warn("Error message:", errorMessage);
			console.groupEnd();

			const verifiedMessage = firebaseVerifyError(firebaseErrors[errorCode], errorMessage);
			message({
				title: "Error!",
				description: verifiedMessage,
				className: "is-error"
			});
		});
}


/**
 * @function firebaseAuthDeleteUser
 * @description FIREBASE AUTH - Delete account
 * @param {String} password Password data obtained from the delete form
 */
function firebaseAuthDeleteUser(password) {
	const user = firebase.auth().currentUser;
	const userData = user.providerData;

	const credential = firebase.auth.EmailAuthProvider.credential(
		user.email,
		password
	);

	user.reauthenticateWithCredential(credential)
		.then(function () {
			console.group("Reauthenticate user account!");
			userData.forEach(function (profile) {
				message({
					title: "Reauthenticate user account!",
					description: profile.email,
					className: "is-success"
				});
			});
			console.groupEnd();

			user.delete()
				.then(function () {
					console.group("Deleted user account!");
					userData.forEach(function (profile) {
						message({
							title: "Account deleted :(",
							description: profile.email,
							className: "is-success"
						});
					});
					console.groupEnd();
				})
				.catch(function (error) {
					// Handle Errors here.
					const errorCode = error.code;
					const errorMessage = error.message;

					console.group("Error to delete user!");
					console.warn("Error code:", errorCode);
					console.warn("Error message:", errorMessage);
					console.groupEnd();

					const verifiedMessage = firebaseVerifyError(firebaseErrors[errorCode], errorMessage);
					message({
						title: "Error!",
						description: verifiedMessage,
						className: "is-error"
					});

				});
		})
		.catch(function (error) {
			const errorCode = error.code;
			const errorMessage = error.message;

			console.group("Error to user reauthenticate!");
			console.warn("Error code:", errorCode);
			console.warn("Error message:", errorMessage);
			console.groupEnd();

			const verifiedMessage = firebaseVerifyError(firebaseErrors[errorCode], errorMessage);
			message({
				title: "Error!",
				description: verifiedMessage,
				className: "is-error"
			});

		});
}


/**
 * @function firebaseAuthLogOutUser
 * @description FIREBASE AUTH - LOGOUT user with email and password
 */
function firebaseAuthLogOutUser() {
	const userEmail = firebase.auth().currentUser.email;

	firebase.auth().signOut()
		.then(() => {
			console.group("Success to logout!");
			console.info("Exiting the system:", userEmail);
			console.groupEnd();

			message({
				title: "Good bye!",
				description: userEmail,
				className: "is-success"
			});
		})
		.catch(function (error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;

			console.group("Error!");
			console.warn("Error code:", errorCode);
			console.warn("Error message:", errorMessage);
			console.groupEnd();

			const verifiedMessage = firebaseVerifyError(firebaseErrors[errorCode], errorMessage);
			message({
				title: "Error!",
				description: verifiedMessage,
				className: "is-error"
			});
		});
}


/**
 * @function firebaseAuthStateChanged
 * @description FIREBASE AUTH - Add events auth: onAuthStateChanged
 */
function firebaseAuthStateChanged() {
	firebase.auth().onAuthStateChanged(function (user) {
		showSection("register");

		if (user) {
			console.info("User is signed in!");
			afterLogged(user);
		} else {
			console.info("No user is signed in!");
			hideAllSections();
			showSection("register");
		}
	});
}



(function () {
	scrollTop();
	addEventsRegisterPassword();
	addEventsLogInPassword();
	addEventsLogInGoogle();
	addEventsLogInFacebook();
	addEventsLogInTwitter();
	addEventsLogInGithub();
	firebaseAuthStateChanged();
	labelAnimation();
})();