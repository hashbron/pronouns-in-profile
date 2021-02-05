# pronouns-in-profile
### A Chrome extension to take a user's pronoun's from their bio and them to their profile on Twitter.

The goal of this extension is pretty simple - it's something Twitter could easily implement (and they should!). I think having a dedicated pronoun field helps to normalize inclusivity (and saves you some characters in your bio).

The extension works by scanning the text of every Twitter bio you visit and using an annoyingly long regular expression to find any pronouns. If they are found the extension removes them from the bio and creates a new HTML element in the profile next to the location, link, and birthday fields. 

The icon used for the pronoun field (a smiley face) is consistent with Twitter style and design because is the same icon used for emojis when composing a tweet.

Here are a few examples of the extension in action:

![ewarren](https://github.com/hashbron/pronouns-in-profile/blob/main/screenshots/Screen%20Shot%202021-02-04%20at%2011.58.38%20PM.png)
![juliancastro](https://github.com/hashbron/pronouns-in-profile/blob/main/screenshots/Screen%20Shot%202021-02-04%20at%2011.59.20%20PM.png)
![aoc](https://github.com/hashbron/pronouns-in-profile/blob/main/screenshots/Screen%20Shot%202021-02-04%20at%2011.59.34%20PM.png)
