url ="";

chrome.tabs.onUpdated.addListener(function
  (tabId, changeInfo, tab) {

    // Only update the page if the url has changed
    if (changeInfo.url && url != changeInfo.url) {

    	url = changeInfo.url; // Reset saves url to updated url

    	// Only procede if current url matches the regex for a twitter profile "https://twitter.com/username"
    	var urlRegex = /^http(s|):\/\/twitter.com\/(\w+)(\/|)$/g;
    	if (urlRegex.test(url)) {

			chrome.tabs.executeScript(null, {file:"global.js"});
			chrome.tabs.executeScript(null, {file:"check-for-pronoun.js"});
		}
    }

});