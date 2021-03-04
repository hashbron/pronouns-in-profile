# pronouns-in-profile
### A Chrome extension to take a user's pronoun's from their bio and them to their profile on Twitter.
#### Available on the ![Chrome Web Store](https://chrome.google.com/webstore/detail/pronouns-in-profile/glamhpccofagaiogibiannnbomhjdojp/)! 
#### Available as a ![Firefox Add On](https://addons.mozilla.org/en-US/firefox/addon/pronouns-in-profile/)!

The goal of this extension is pretty simple - it's something Twitter could easily implement (and they should!). I think having a dedicated pronoun field helps to normalize inclusivity (and saves you some characters in your bio).

#### How it works
The extension works by scanning the text of every Twitter bio you visit and using a regular expression to find any pronouns. If pronouns are found the extension removes them from the bio and creates a new HTML element in the profile next to the location, link, and birthday fields. 

The regex used can be found in ![this file](https://github.com/hashbron/pronouns-in-profile/blob/39116bfa5dba31d2032574f76a3372b2e9b3d1c4/global.js#L18) along with the code for creating a new profile element and editing a user's profile. The infrastrucutre to execute this code when new pages are loaded is housed ![here](https://github.com/hashbron/pronouns-in-profile/blob/main/background.js) and ![here](https://github.com/hashbron/pronouns-in-profile/blob/main/add-pronoun.js).

#### Design

The icon used and text used for the new pronoun field (a smiley face) are consistent with Twitter style. The icon is the same icon used for emojis when composing a tweet and the text formatting and CSS are copies of other profile elements.

Here are a few examples of the extension in action:

![ewarren](https://github.com/hashbron/pronouns-in-profile/blob/main/screenshots/ewarren.png)
![juliancastro](https://github.com/hashbron/pronouns-in-profile/blob/main/screenshots/Screen%20Shot%202021-02-04%20at%2011.59.20%20PM.png)
![aoc](https://github.com/hashbron/pronouns-in-profile/blob/main/screenshots/aoc.png)
![ayanna](https://github.com/hashbron/pronouns-in-profile/blob/main/screenshots/ayanna.png)
