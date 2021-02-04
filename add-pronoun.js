document.addEventListener("DOMContentLoaded", function(event) { // Wait for page load
	waitForElm(BIO_SELECTOR).then(elm => changeText(elm)); // Wait for bio to load
});