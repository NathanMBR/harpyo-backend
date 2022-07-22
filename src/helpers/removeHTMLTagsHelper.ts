const regexToRemoveHTMLTags = /(<([^>]+)>)/ig;

export const removeHTMLTagsHelper = (html: string) => html.replace(regexToRemoveHTMLTags, "");