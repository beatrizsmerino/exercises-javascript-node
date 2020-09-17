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
 * @function labelAnimation
 * @description Add animation to label of the focus field
 * @param {Element} field
 */
function labelAnimation(field) {
	const formFields = document.getElementsByClassName("c-form__field");
	const inputValue = field.value;

	// Reset all empty fields on focus/blur
	[...formFields].map((item) => {
		const fieldValue = item.value;
		if (fieldValue === "") {
			item.parentNode.classList.remove("is-focus");
		}
	});

	// This empty field on focus/blur
	if (inputValue === "") {
		field.parentNode.classList.remove("is-focus");
	}

	// The field on focus/blur
	field.parentNode.classList.add("is-focus");
}


/**
 * @function addEventsLabelAnimation
 * @description Added events to label animated
 */
function addEventsLabelAnimation() {
	const formFields = document.getElementsByClassName("c-form__field");
	[...formFields].map((field) => {
		labelAnimation(field);

		field.addEventListener("focus", function (event) {
			labelAnimation(event.target);
		});

		field.addEventListener("blur", function (event) {
			labelAnimation(event.target);
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
				<div class="account-data__item">
					<p>
						<strong class="account-data__title">
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
				<div class="account-data__item">
					<p>
						<strong class="account-data__title">
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
				<div class="account-data__item">
					<img class="account-data__photo" src="${dataUser.photo}" alt="${dataUser.name}">
				</div>
				`;
		} else {
			templatePhoto = "";
		}


		const template = `
			<article id="account" class="c-page__article is-active">
				<div class="account-data">
					<div class="account-data__inner">
						<div class="account-data__column">
							<div class="account-data__row">
								${templatePhoto}
							</div>
							<div class="account-data__row">
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
						<div class="account-data__column">
							<h2 class="c-title">
								Account
							</h2>
							<div class="account-data__row">
								<div class="account-data__item">
									<p>
										<strong class="account-data__title">
											Creation Time:
										</strong>
										${dataUser.creationTime}
									</p>
								</div>
								<div class="account-data__item">
									<p>
										<strong class="account-data__title">
											Last SingIn Time:
										</strong>
										${dataUser.lastSignInTime}
									</p>
								</div>
							</div>

							<div class="account-data__row">
								${templateName}
								${templateEmail}
							</div>

							<div class="account-data__row">
								<div class="account-data__item">
									<p>
										<strong class="account-data__title">
											Email verified:
										</strong>
										${dataUser.emailVerified}
									</p>
								</div>
								<div class="account-data__item">
									<p>
										<strong class="account-data__title">
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
			<form id="formUpdate" class="c-form" action="">
				<fieldset class="c-fieldset">
					<legend class="c-legend">
						Update Account
					</legend>

					<div class="c-form__item">
						<label class="c-label" for="nameUserUpdate">
							Name
						</label>
						<input id="nameUserUpdate" class="c-form__field" type="text" value="${name}">
					</div>

					<div class="c-form__item">
						<label class="c-label" for="photoUserUpdate">
							Photo
						</label>
						<input id="photoUserUpdate" class="c-form__field" type="url" value="${photo}">
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
			<form id="formDelete" class="c-form" action="">
				<fieldset class="c-fieldset">
					<legend class="c-legend">
						Delete Account
					</legend>

					<div class="c-form__item">
						<label class="c-label" for="passwordUserDelete">
							Password
						</label>
						<input id="passwordUserDelete" class="c-form__field" type="password">
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
 * @function addEventsRegister
 * @description Add events for Register form
 */
function addEventsRegister() {
	const buttonRegister = document.getElementById("buttonRegister");
	const buttonRegisterShow = document.getElementById("buttonRegisterShow");
	const emailUserRegister = document.getElementById("emailUserRegister");
	const passwordUserRegister = document.getElementById("passwordUserRegister");

	if (buttonRegisterShow) {
		buttonRegisterShow.addEventListener("click", function (event) {
			event.preventDefault();
			showSection("register");
		});
	}

	if (buttonRegister && emailUserRegister && passwordUserRegister) {
		buttonRegister.addEventListener("click", function (event) {
			event.preventDefault();
			const valueEmail = emailUserRegister.value;
			const valuePass = passwordUserRegister.value;

			if ((valueEmail !== null && valueEmail !== "") &&
				(valuePass !== null && valuePass !== "")) {

				firebaseAuthRegisterUser(valueEmail, valuePass);
			}
		});
	}

}


/**
 * @function addEventsLogIn
 * @description Add events for Login form
 */
function addEventsLogIn() {
	const buttonLogIn = document.getElementById("buttonLogIn");
	const buttonLogInShow = document.getElementById("buttonLogInShow");
	const emailUserLogIn = document.getElementById("emailUserLogIn");
	const passwordUserLogIn = document.getElementById("passwordUserLogIn");

	if (buttonLogInShow) {
		buttonLogInShow.addEventListener("click", function (event) {
			event.preventDefault();
			showSection("logIn");
		});
	}

	if (buttonLogIn && emailUserLogIn && passwordUserLogIn) {
		buttonLogIn.addEventListener("click", function (event) {
			event.preventDefault();
			const valueEmail = emailUserLogIn.value;
			const valuePass = passwordUserLogIn.value;

			if ((valueEmail !== null && valueEmail !== "") &&
				(valuePass !== null && valuePass !== "")) {

				firebaseAuthLogInUser(valueEmail, valuePass);
			}
		});
	}
}


/**
 * @function addEventsAccount
 * @description Add events for Account form
 */
function addEventsAccount() {
	const buttonAccountShow = document.getElementById("buttonAccountShow");

	if (buttonAccountShow) {
		buttonAccountShow.addEventListener("click", function (event) {
			event.preventDefault();
			showSection("account");
		});
	}
}


/**
 * @function addEventsLogOut
 * @description Add events for Logout form
 */
function addEventsLogOut() {
	const buttonLogOut = document.getElementById("buttonLogOut");

	if (buttonLogOut) {
		buttonLogOut.addEventListener("click", function (event) {
			event.preventDefault();
			firebaseAuthLogOutUser();
		});
	}
}


/**
 * @function addEventsUpdate
 * @description Add events for Update form
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
			}
		});
	}
}


/**
 * @function addEventsDelete
 * @description Add events for Delete form
 */
function addEventsDelete() {
	const buttonDeleteShow = document.getElementById("buttonDeleteShow");
	const buttonDelete = document.getElementById("buttonDelete");
	const passwordUserDelete = document.getElementById("passwordUserDelete");

	if (buttonDeleteShow) {
		buttonDeleteShow.addEventListener("click", function (event) {
			event.preventDefault();
			showSection("delete");
		});
	}

	if (buttonDelete && passwordUserDelete) {
		buttonDelete.addEventListener("click", function (event) {
			event.preventDefault();
			const valuePass = passwordUserDelete.value;

			if ((valuePass !== null && valuePass !== "")) {
				firebaseAuthDeleteUser(valuePass);
			}
		});
	}
}


/**
 * @function afterLogged
 * @param {Object} user User data
 * @description Function that execute after logged
 * @param {Object} user User data
 */
function afterLogged(user) {
	// DOM
	hideAllSections();
	insertSection("account", createTemplateAccount, user);
	insertSection("update", createTemplateUpdate, user);
	insertSection("delete", createTemplateDelete, null);
	addEventsLabelAnimation();

	// EVENTS
	addEventsAccount();
	addEventsUpdate();
	addEventsDelete();
	addEventsLogOut();
}


/**
 * @function firebaseAuthRegisterUser
 * @description FIREBASE AUTH - REGISTER user with email and password
 * @param {String} email Email data obtained from the register form
 * @param {String} password Password data obtained from the register form
 */
async function firebaseAuthRegisterUser(email, password) {
	let userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((res) => {
			const user = firebase.auth().currentUser;
			const userData = user.providerData;

			console.group("Register!");
			console.info("Email: " + email, "Password: " + password);

			userData.forEach(function (profile) {
				message({
					title: "Thanks for register!",
					description: `${profile.email}`,
					className: "is-success"
				});
			});
			console.groupEnd();
		})
		.catch(function (error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			console.warn("Error code:", errorCode);
			console.warn("Error message:", errorMessage);

			if (typeof errorMessage === "string") {
				message({
					title: "Error for register!",
					description: `${errorMessage}`,
					className: "is-error"
				});
			}

		});
}


/**
 * @function firebaseAuthLogInUser
 * @description FIREBASE AUTH - LOGIN user with email and password
 * @param {String} email Email data obtained from the login form
 * @param {String} password Password data obtained from the login form
 */
async function firebaseAuthLogInUser(email, password) {
	let userCredential = await firebase.auth().signInWithEmailAndPassword(email, password)
		.then((res) => {
			const user = firebase.auth().currentUser;
			const userData = user.providerData;

			console.group("LogIn!");
			userData.forEach(function (profile) {
				message({
					title: "Welcome!",
					description: `${profile.email}`,
					className: "is-success"
				});
			});
			console.groupEnd();
		})
		.catch(function (error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;

			console.group("Error!");
			console.warn("Error code:", errorCode);
			console.warn("Error message:", errorMessage);
			console.groupEnd();

			if (typeof errorMessage === "string") {
				message({
					title: "Error for register!",
					description: `${errorMessage}`,
					className: "is-error"
				});
			}
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

			console.group("Updated!");
			userData.forEach(function (profile) {
				message({
					title: "Account updated!",
					description: `Provider-specific UID: profile.uid<br> Name: ${profile.displayName}<br> Email: ${profile.email}<br> Photo: ${profile.photoURL}`,
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
			console.warn("Error code:", errorCode);
			console.warn("Error message:", errorMessage);

			if (typeof errorMessage === "string") {
				message({
					title: "Error for register!",
					description: `${errorMessage}`,
					className: "is-error"
				});
			}
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
			console.group("Reauthenticate!");
			userData.forEach(function (profile) {
				message({
					title: "Reauthenticate user account!",
					description: `${profile.email}`,
					className: "is-success"
				});
			});
			console.groupEnd();

			user.delete()
				.then(function () {
					console.group("Deleted!");
					userData.forEach(function (profile) {
						message({
							title: "Account deleted :(",
							description: `${profile.email}`,
							className: "is-success"
						});
					});
					console.groupEnd();
				})
				.catch(function (error) {
					// Handle Errors here.
					const errorCode = error.code;
					const errorMessage = error.message;

					console.group("Fail delete user!");
					console.warn("Error code:", errorCode);
					console.warn("Error message:", errorMessage);
					console.groupEnd();

					if (typeof errorMessage === "string") {
						message({
							title: "Error for register!",
							description: `${errorMessage}`,
							className: "is-error"
						});
					}
				});
		})
		.catch(function (error) {
			const errorCode = error.code;
			const errorMessage = error.message;

			console.group("Fail reauthenticate!");
			console.warn("Error code:", errorCode);
			console.warn("Error message:", errorMessage);
			console.groupEnd();

			if (typeof errorMessage === "string") {
				message({
					title: "Error for register!",
					description: `${errorMessage}`,
					className: "is-error"
				});
			}
		});
}


/**
 * @function firebaseAuthLogOutUser
 * @description FIREBASE AUTH - LOGOUT user with email and password
 * @param {String} email Email data obtained from the logout form
 * @param {String} password Password data obtained from the logout form
 */
async function firebaseAuthLogOutUser() {
	const userEmail = firebase.auth().currentUser.email;
	console.info("Saliendo del sistema:", userEmail);

	let userCredential = await firebase.auth().signOut()
		.then((res) => {
			message({
				title: "Good bye!",
				description: `${userEmail}`,
				className: "is-success"
			});
		})
		.catch(function (error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;

			console.group("Logged out error!");
			console.warn("Error code:", errorCode);
			console.warn("Error message:", errorMessage);
			console.groupEnd();

			if (typeof errorMessage === "string") {
				message({
					title: "Error for register!",
					description: `${errorMessage}`,
					className: "is-error"
				});
			}
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
	addEventsLabelAnimation();
	addEventsRegister();
	addEventsLogIn();
	firebaseAuthStateChanged();
})();