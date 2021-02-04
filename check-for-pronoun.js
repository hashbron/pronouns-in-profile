waitForElm(PROFILE_ELEMENTS_LIST_SELECTOR).then( // Wait for profile to load
	elm => {
		removePronounElementIfPresent(elm); // Remove a cached pronoun object from the profile
		changeText(document.querySelector(BIO_SELECTOR)); // Add new pronoun object from bio
});


