/**
 * @file modal.js
 * @module modal
 * @description Modal window
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires tool
 */
import * as tool from './tools.js';




/**
 * @function module:modal~createTemplateModal
 * @description Create template to modal window
 * @param {Object} data Data modal
 * @returns {String}
 * @see Used in: {@link module:modal~getSetModal}
 */
function createTemplateModal(idModal, data) {
	const template = `
		<div id="${idModal}" class="modal__wrapper">
			<div class="modal">
				<div class="modal__container">
					<div class="modal__inner">
						<button class="modal__button-close button-close button button--icon"
								aria-label="Cerrar ventana">
							<i class="button-close__icon fas fa-times"></i>
						</button>

						<div class="modal__content">
							${data}
						</div>
					</div>
				</div>
			</div>
		</div>
	`;
	return template;
}


/**
 * @function module:modal~setScrollModal
 * @description Added css classes to set scroll modal
 * @see Used in: {@link module:modal~insertModal}
 */
function setScrollModal() {
	const modalContainer = document.getElementsByClassName("modal__container");
	const modalInner = document.getElementsByClassName("modal__inner");
	const modalContent = document.getElementsByClassName("modal__content");

	[...modalContainer].map((item) => item.classList.add("scroll"));
	[...modalInner].map((item) => item.classList.add("scroll__inner"));
	[...modalContent].map((item) => item.classList.add("scroll__content"));
}



/**
 * @function module:modal~insertModal
 * @description Insert modal
 * @param {String} idContent
 * @param {String} idModal
 * @param {Object} data
 * @see Used inside: {@link module:modal~createTemplateModal}
 * @see Used in: {@link module:modal.getSetModal}
 */
async function insertModal(idContent, data) {
	const content = document.getElementById(idContent);
	let template = createTemplateModal(`${idContent}Modal`, data);
	let templateNode = tool.stringToNode(template);
	await content.appendChild(templateNode);
	await setScrollModal();
}



/**
 * @function module:modal~removeModal
 * @description Remove modal
 * @see Used in: {@link module:modal~setEventsModal}
 */
function removeModal() {
	const modalButton = document.getElementsByClassName("modal__button-close");

	[...modalButton].map((button) => {
		button.addEventListener('click', function () {
			const modal = tool.getClosest(this, ".modal__wrapper");
			modal.parentNode.removeChild(modal);
		});
	});
}



/**
 * @function module:modal~openModal
 * @description Open modal
 * @param {Element} button
 * @see {@link module:modal~}
 */
function openModal(idContent, data) {
	insertModal(idContent, data);
}



/**
 * @function module:modal~closeModal
 * @description Close modal
 * @see Used inside: {@link module:modal~removeModal}
 * @see Used in: {@link module:modal~setEventsModal}
 */
function closeModal() {
	removeModal();
}



/**
 * @function module:modal~setEventsModal
 * @description Set events modal: open/close
 * @param {Element} buttonOpen
 * @see Used inside: {@link module:modal~openModal}, {@link module:modal~closeModal}
 * @see Used in: {@link module:modal.getSetModal}
 */
function setEventsModal(idContent, data) {
	openModal(idContent, data);
	closeModal();
}



/**
 * @function module:modal.getSetModal
 * @description Create, insert and added events modal
 * @param {String} idContent
 * @param {String} idModal
 * @param {Element} buttonOpenModal
 * @param {Object} data
 * @see Used inside:
 * {@link module:modal~insertModal}, {@link module:modal~setEventsModal}
 */
export function getSetModal(idContent, data) {
	setEventsModal(idContent, data);
}