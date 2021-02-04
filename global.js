var BIO_SELECTOR = "div.r-15d164r:nth-child(3)"
var PROFILE_ELEMENTS_LIST_SELECTOR = ".r-1vglu5a";
var PRONOUN_ICON_HTML = `<g>
						<path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"></path>
						<path d="M12 17.115c-1.892 0-3.633-.95-4.656-2.544-.224-.348-.123-.81.226-1.035.348-.226.812-.124 1.036.226.747 1.162 2.016 1.855 3.395 1.855s2.648-.693 3.396-1.854c.224-.35.688-.45 1.036-.225.35.224.45.688.226 1.036-1.025 1.594-2.766 2.545-4.658 2.545z"></path>
						<circle cx="14.738" cy="9.458" r="1.478"></circle>
						<circle cx="9.262" cy="9.458" r="1.478"></circle>
						</g>`;
								
/*
 * Creates pronoun div and appends to element
 * Changes text in bio to remove pronouns
 */
function changeText(bio) {
  
  	// Search bio text for pronouns using regex
	var bioText = bio.textContent;
	let re = /\(*(He|She|They|he|she|they) *(\/|\||\,) *(Him|Él|èl|Her|Them|They|him|her|ella|Ella|them|they)( *(\/|\||\,) *(His|Hers|Theirs|his|hers|theirs|Él|èl|))*\)*\.*\,*/;
	var pronounArray = re.exec(bioText);
	
	// If pronouns are found in the bio
	if (pronounArray != null) {

		// Extract pronouns and trim 
		pronouns = pronounArray[0];
		var trim = pronouns.replace(/\||\,|\.|\(|\)/g, "");
		// Create a text node with the pronoun text
		var textnode = document.createTextNode(trim);  

		// Create new pronoun element from class list of first element in the profile
		var classList = document.querySelector(PROFILE_ELEMENTS_LIST_SELECTOR).firstChild.classList;
		var pronounElement = document.createElement("span");
		pronounElement.className = classList;

		// Create an icon element
		var icon = document.querySelector(PROFILE_ELEMENTS_LIST_SELECTOR).firstChild.firstChild.cloneNode(); 

		icon.innerHTML = PRONOUN_ICON_HTML;

		// Construct complete pronoun element by adding children
		pronounElement.appendChild(icon);
		pronounElement.appendChild(textnode); 

		// Get profile element flex div and append pronoun element to it
		var profileElementList = document.querySelector(PROFILE_ELEMENTS_LIST_SELECTOR);
		profileElementList.appendChild(pronounElement);
	}
}

/*
 * Checks for a pronoun element as the final element in the profile
 * If it is a pronoun element removes it from the page
 */
function removePronounElementIfPresent(profileElementList) {

	var numElems = profileElementList.childNodes.length;
	var lastElem = document.querySelector(PROFILE_ELEMENTS_LIST_SELECTOR).childNodes[numElems - 1].cloneNode(true);

	if (lastElem.firstChild.innerHTML == PRONOUN_ICON_HTML) {
		profileElementList.removeChild(profileElementList.childNodes[numElems-1]);
	}
}

/*
 * Function to wait for a given element to load on the page
 * Taken from https://stackoverflow.com/a/61511955
 */
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

