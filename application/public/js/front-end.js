function setFlashMessageFadeOut() {
    let flashMessageElement = document.getElementById("flash-message");
    if (flashMessageElement) {
        setTimeout(() => {
            let curentOpacity = 1.0;
            let timer = setInterval(() => {
                if (curentOpacity < 0.05) {
                    clearInterval(timer);
                    flashMessageElement.remove();
                }
                curentOpacity -= 0.05;
                flashMessageElement.style.opacity = curentOpacity;
            }, 50);
        }, 2500);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setFlashMessageFadeOut);
} else {
    setFlashMessageFadeOut();
}


