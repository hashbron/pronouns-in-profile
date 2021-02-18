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
	let re = /((she|they|him|hers|her|he|them|his|theirs|ella|èl|el|Él|any|all|dude|bro)( |)(\/|\,|\&|\||)( |)){2,}/ig;	

	// Get an array of all regex matches
	var pronounArray = bioText.match(re);
	
	// If pronouns are found in the bio
	if (pronounArray != null) {

		// Get longest array element
		var longest = pronounArray.reduce(
		    function (a, b) {
		        return a.length > b.length ? a : b;
		    	}
			);

		var pronouns = longest.replace(/(\/|\,|\&|\|)(\ |)$/, "");

		// Create a text node with the pronoun text
		var textnode = document.createTextNode(adjustCapitalization(pronouns));  

		// Get div of profile elements
		var profileElementList = document.querySelector(PROFILE_ELEMENTS_LIST_SELECTOR);

		// Create new pronoun element from class list of first element in the profile
		// !! Add code here to get second element iff first element is a link (this will homogenize formatting)
		// !! The calendar element garuntees there is always at least one element and one non-link element
		var classList = profileElementList.firstChild.classList; 
		var pronounElement = document.createElement("span");
		pronounElement.className = classList;

		// Create an icon element
		var icon = profileElementList.firstChild.firstChild.cloneNode(); 
		icon.innerHTML = PRONOUN_ICON_HTML;

		// Construct complete pronoun element by adding children
		pronounElement.appendChild(icon);
		pronounElement.appendChild(textnode); 

		// Append pronoun element to profile
		profileElementList.appendChild(pronounElement);

		this.editBio(bio, pronouns, re.lastIndex);
	}
}

function adjustCapitalization(pronouns) {
	// If first character is lowercase
	if (pronouns.charAt(0) != pronouns.charAt(0).toUpperCase()) {
		return pronouns;
	}
	for (var i = 1; i < pronouns.length; i++) {
		// If another character is capital and a letter
	    if (pronouns.charAt(i) == pronouns.charAt(i).toUpperCase() && pronouns.charAt(i).match(/[a-z]/i)) {
	    	return pronouns;
	    }
	}
	return pronouns.toLowerCase();
}

function editBio(bio, pronouns, lastIndex) {

	var node = this.findChild(bio, pronouns);
	var nodeText = node.textContent;
	var index = nodeText.indexOf(pronouns);

	var precedingText = nodeText.substring(0, index);
	var followingText = nodeText.substring(index + pronouns.length);

	// Remove parenthesis or brackets
	followingText = followingText.replace(/^(\)|\])/g, "");
	precedingText = precedingText.replace(/(\(|\[])$/g, "");

	// Remove any puncutration or spacing
	let followingRe = /^(\ |)*(\/|\,|\&|\||\.|\!)*(\ |)*/g;
	let precedingRe = /(\ |)*(\/|\,|\&|\||\.|\!)*(\ |)*$/g;

	var followingArray = followingText.match(followingRe);
	var precedingArray = precedingText.match(precedingRe);

	// Check after the pronouns for following punctuation
	if (followingArray != null && followingText != "") {
		followingText = followingText.replace(followingRe, "");
	}
	// If none is found, check before the pronouns for punctuation
	else if (precedingArray != null && precedingText != "") {
		precedingText = precedingText.replace(precedingRe, "");
	}

	node.innerHTML = precedingText + followingText;

}

function findChild(node, pronouns) {
	// Base case, only child is text node
	if (node.firstChild.nodeType == Node.TEXT_NODE) {
		return node;
	}
	
	// Recursive step, search through children to find text containing pronouns
	var children = node.children;

	for (var i = 0; i < children.length; i++) { // Iterate over children
  		if (children[i].textContent.includes(pronouns)) {
  			return findChild(children[i], pronouns);
  		}
	}

	return null; // should not get here
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

