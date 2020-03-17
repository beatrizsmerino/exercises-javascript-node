
const idContact = document.getElementById("idContact");
const nameContact = document.getElementById("nameContact");
const phoneContact = document.getElementById("phoneContact");
const emailContact = document.getElementById("emailContact");
const buttonSave = document.getElementById("buttonSave");



function emptyForm() {
	idContact.value = "";
	nameContact.value = "";
	phoneContact.value = "";
	emailContact.value = "";
};



function saveContact() {
	const avatarURl = `http://api.adorable.io/avatars/80/${emailContact.value}.png`;

	const dataContact = {
		"phone": phoneContact.value,
		"email": emailContact.value,
		"avatar": avatarURl
	}

	if (idContact.value !== "") {
		if (localStorage.key(idContact.value)) {
			localStorage.removeItem(localStorage.key(idContact.value));
			localStorage.setItem(nameContact.value, JSON.stringify(dataContact));
		}
	} else {
		localStorage.setItem(nameContact.value, JSON.stringify(dataContact));
	}

	emptyForm();
	setContacts();
}



function editContact($this) {
	let itemIndex = $this.getAttribute("data-index");
	let nameContactValue = localStorage.key(parseInt(itemIndex));

	let dataContact = localStorage.getItem(localStorage.key(parseInt(itemIndex)));
	dataContact = JSON.parse(dataContact);

	idContact.value = itemIndex;
	nameContact.value = nameContactValue;
	phoneContact.value = dataContact.phone;
	emailContact.value = dataContact.email;
	dataContact.avatar = `http://api.adorable.io/avatars/80/${dataContact.email}.png`;

	setContacts();
}



function removeContact($this) {
	let itemIndex = $this.getAttribute("data-index");
	let nameContact = localStorage.key(parseInt(itemIndex));
	localStorage.removeItem(nameContact);
	setContacts();
}



function removeAllContacts() {
	localStorage.clear();
	init();
}



function getContacts() {
	let items = "";
	for (var index = 0; index < localStorage.length; index++) {
		let nameContactValue = localStorage.key(index);

		let dataContact = localStorage.getItem(nameContactValue);
		dataContact = JSON.parse(dataContact);

		let itemTemplate = `
				<li class="list-group-item d-flex align-items-start justify-content-between">
					<div class="d-flex">
						<div class="pr-4">
							<img src="${dataContact.avatar}" alt="${nameContactValue}">
						</div>
						<div>
							<p class="m-0">${nameContactValue}</p>
							<p class="m-0">${dataContact.phone}</p>
							<p class="m-0">${dataContact.email}</p>
						</div>
					</div>
					<div class="btn-group">
						<button type="button" class="button-edit btn btn-success" data-index="${index}">
							<i class="fa fa-pen"></i> Editar
						</button>
						<button type="button" class="button-remove btn btn-danger" data-index="${index}">
							<i class="fa fa-trash"></i> Eliminar
						</button>
					</div>
				</li>`;
		items += itemTemplate;
	}

	return items;
}



function setContacts() {
	const listContactDOM = document.getElementById("listContact");

	listContactDOM.innerHTML = "";

	const list = getContacts();

	const template = `
		<div class="mb-2 d-flex justify-content-between bg-transparent text-info">
			<h2 class="font-weight-light">
				Lista contactos
			</h2>
			<button type="button" id="buttonRemoveAll" class="btn btn-danger">
				<i class="fa fa-trash"></i> Eliminar Todos
			</button>
		</div>
		<div id ="listContact"><ul class="list-group pt-3">${list}</ul></div>`;

	const nodeTemplate = document.createRange().createContextualFragment(template);
	listContactDOM.appendChild(nodeTemplate);

	const buttonsEdit = document.getElementsByClassName("button-edit");
	Array.from(buttonsEdit).map(buttonEdit => {
		buttonEdit.addEventListener("click", function () {
			editContact(this);
		});
	});

	const buttonsRemove = document.getElementsByClassName("button-remove");
	Array.from(buttonsRemove).map(buttonRemove => {
		buttonRemove.addEventListener("click", function () {
			removeContact(this);
		});
	});

	const buttonRemoveAll = document.getElementById("buttonRemoveAll");
	buttonRemoveAll.addEventListener("click", function () {
		removeAllContacts();
	});
}



function init() {
	const listContactDOM = document.getElementById("listContact");

	buttonSave.addEventListener("click", function () {
		saveContact();
	});

	if (localStorage.length !== 0) {
		setContacts();
	} else {
		listContactDOM.innerHTML = "";
	}
}



init();