let loginmessage = document.getElementById('loginmessage');
let message = document.getElementById('message');
let WelcomeUser = document.getElementById('WelcomeUser');

function register(event) {
    event.preventDefault();
    let registerName = document.getElementById('registerName').value;
    let registerEmail = document.getElementById('registerEmail').value;
    let registerPassword = document.getElementById('registerPassword').value;

    if (registerName == '' && registerEmail == '' && registerPassword == '') {
        message.innerHTML = `<span class="text-red-500">All Inputs Required</span>`
    } else {
        if (localStorage.getItem(registerEmail)) {
            message.innerHTML = `<span class="text-red-500">Email already exists</span>`;
            console.log(registerEmail);
        } else {
            let registerData = {
                name: registerName,
                email: registerEmail,
                password: registerPassword
            };
            localStorage.setItem(registerEmail, JSON.stringify(registerData));
            message.innerHTML = `<span class="text-green-500">Registered Successfully</span>`;
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        }
    }
}

function login(event) {
    event.preventDefault();

    let loginEmail = document.getElementById('loginEmail').value;
    let loginPassword = document.getElementById('loginPassword').value;

    let registeredUser = localStorage.getItem(loginEmail);

    const login = {
        email: loginEmail,
        password: loginPassword
    };

    if (loginEmail == '' && loginPassword == '') {
        loginmessage.innerHTML = `<span class="text-red-500">All Inputs Required</span>`;
    } else {
        if (registeredUser) {
            let user = JSON.parse(registeredUser);
            if (login.email === user.email && login.password === user.password) {
                loginmessage.innerHTML = `<span class="text-green-500">Login Successfully</span>`;
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = "home.html"; 
            } else {
                loginmessage.innerHTML = `<span class="text-red-500">Wrong email or password</span>`;
            }
        } else {
            loginmessage.innerHTML = `<span class="text-red-500">Please sign up first</span>`;
        }
    }
}

if (WelcomeUser) {
    let loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        let user = JSON.parse(loggedInUser);
        WelcomeUser.innerHTML = 'Welcome ' + user.name;
    }

}

function logout() {
    localStorage.removeItem('loggedInUser')
    window.location.href = 'index.html'
}