/* TODO: Implement navbar with login/logout button */
if (document.cookie.includes('logged')){
    let ele = document.getElementById('login');
    ele.innerHTML = 'Log Out';
    ele.setAttribute('href', '/logout');
} else {
    let ele = document.getElementById('login');
    ele.innerHTML = 'Log In';
    ele.setAttribute('href', '/login');
}