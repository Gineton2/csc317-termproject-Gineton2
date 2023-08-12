/* TODO: Implement full navbar */
if (document.cookie.includes('logged')){
    let ele = document.getElementById('log-in');
    ele.innerHTML = 'Log Out';
    ele.setAttribute('href', '/log-out');
} else {
    let ele = document.getElementById('log-in');
    ele.innerHTML = 'Log In';
    ele.setAttribute('href', '/log-in');
}