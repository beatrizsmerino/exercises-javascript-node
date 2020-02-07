/**
 * @file
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





export function create(text) {
    const template = `
		<div class="clipboard">
			<input class="clipboard__field" type="text" value="${text}" readonly style="width:${((text.length + 1.4) * 8)}px"/>
			<button class="clipboard__button button">
				<i class="icon icon-copy">
					<svg class="icon__svg">
						<use class="icon__use" xlink:href="#iconCopy"/>
					</svg>
				</i>
			</button>
		</div>
		`;

    return template;
}


function copy(field) {
    const copyText = field;

    /* Select the text field */
    console.log(typeof copyText);
    console.log(copyText.value.lenght)
    copyText.focus();
    copyText.select();

    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Copied the text:\n" + copyText.value);
}



export function addEventClick() {
    const buttonsDom = document.getElementsByClassName("clipboard__button");
    // console.log(buttonsDom);

    Array.from(buttonsDom).map(button => {
        // console.log(button);

        button.addEventListener("click", function () {
            // console.log(button.parentElement);
            let fieldDom = button.parentElement.querySelector(".clipboard__field");
            // console.log(fieldDom, typeof fieldDom);
            // console.log(fieldDom.value);
            copy(fieldDom);
        });
    });
}