console.log("GPT script launched")

chrome.runtime.onMessage.addListener(
    function(emailContent, sender, sendResponse) {
        const textArea = document.querySelector('textarea');
        textArea.value = "Respond to the most recent email in a professional tone: \n" + emailContent;
        const button = textArea.nextElementSibling;
        button.click();

        const callback = function(mutationList, observer) {
            for (const mutation of mutationList) {
                if (mutation.attributeName === 'disabled') {
                    if (button.disabled === false) {
                        const responses = document.querySelector('#__next > div.overflow-hidden.w-full.h-full.relative > div > main > div.flex-1.overflow-hidden > div > div > div').childNodes;
                        const lastResponse = responses[responses.length - 2];
                        const lastResponseText = lastResponse.innerText;
                        sendResponse(lastResponseText);
                    }
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(button, {attributes: true});
        return true;
    }
)
 