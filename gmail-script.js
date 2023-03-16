// Triggers when you click on an email from the inbox
window.onload = function () {
    window.onhashchange = () => {
        if (window.location.hash.startsWith('#inbox/')) {
            const spans = document.querySelectorAll('span');

            for (const span of spans) {
                if (span.innerText === 'Reply') {
                    // do something with the element
                    span.addEventListener('click', function() {
                        const email = document.querySelector('.adn.ads');
                        (async function(){
                            const gptResponse = await chrome.runtime.sendMessage(email.textContent);
                            const gmailTexbox = document.querySelector('[role=textbox]')
                            gmailTexbox.innerText = gptResponse;
                        })();
                    });
                }
            }
        }
    };
}


 