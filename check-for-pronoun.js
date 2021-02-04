var title = document.getElementsByTagName("title")[0];

// Check that the page title has a "@" to confirm it is a user profile page
// This distinguishes from pages like "twitter.com/home" and "twitter.com/notifcations"
if (title.textContent.includes("@")){ 

	waitForElm(PROFILE_ELEMENTS_LIST_SELECTOR).then( // Wait for profile to load
		elm => {
			removePronounElementIfPresent(elm); // Remove a cached pronoun object from the profile
			changeText(document.querySelector(BIO_SELECTOR)); // Add new pronoun object from bio
	});
}




