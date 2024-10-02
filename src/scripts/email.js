function decode(element) {
    let charCodes = element.split('&');
    charCodes.pop();
    charCodes = charCodes.map(c => parseInt(c) + 10);
    return String.prototype.concat(...charCodes.map(c => String.fromCharCode(c)));
}

function setEmail(encryptedString, element) {
    const email = decode(encryptedString);
    element.innerHTML = email;
    element.setAttribute('href', 'mailto:' + email);
}
document.addEventListener('DOMContentLoaded', () => {
    setEmail('89&87&104&98&54&97&104&87&106&112&107&100&90&104&87&87&88&91&36&90&91&', document.getElementById('mail'));
});
