const mainSection = document.querySelector(".mainSection");
const logInSection = document.querySelector(".logInSection");
// logIn
const logIn = document.querySelector(".logIn");
// greeting
const greeting = document.querySelector(".greeting");
const greetingTime = greeting.querySelector(".greetingTime");
const greetingUsername = greeting.querySelector(".greetingUsername");
// signIn
const signIn = document.querySelector(".signIn");
const newAccountBtn = document.querySelector(".newAccountBtn");
const SignInForm = document.querySelector(".SignInForm");
const InputUsername = SignInForm.querySelector("input:first-child");
const InputPw = SignInForm.querySelector("input:last-child");

let userArray = [];
const USERDATA = "userData";

//
//
//  2-7. log Out
//
function reload() {
    location.href = location.href;
}
//
//
//  2-6. make log out button
//
function makeLogOutBtn() {
    const logOut = document.createElement("button");
    logOut.innerText = "log out";
    logOut.classList.add("logOut");
    logOut.setAttribute("type", "button");
    greeting.appendChild(logOut);
    logOut.addEventListener("click", reload);
}

//
//
// 2-5. change greeting
//
function checkGreetingTime() {
    const hour = parseInt(clockHour.innerText);
    let greetingWord;

    if (hour >= 6 && hour < 10) {
        greetingWord = "Good Morning";
    } else if (hour >= 10 && hour < 17) {
        greetingWord = "Good Afternoon";
    } else if (hour >= 17 && hour < 22) {
        greetingWord = "Good Evening";
    } else if (hour >= 3 && hour < 6) {
        greetingWord = "Oh my God...";
    } else {
        greetingWord = "Wow, Deep Midnight!";
    }
    greetingTime.innerText = `${greetingWord}`;
}

//
//
// 2-4. show greeting content
//
// argument, <div class="savedUserLogInForm">...</div>
function showGreeting(savedUserLogInForm) {
    userArray.forEach((element) => {
        (function () {
            if (element.id === parseInt(savedUserLogInForm.id)) {
                greetingUsername.innerText = `${element.username}`; // get username
                getSavedUserName(element.username);
            } else if (element.id !== parseInt(savedUserLogInForm.id)) {
                const otherLogInForm = document.getElementById(`${element.id}`);
                otherLogInForm.classList.add("hidden"); // other user login sections are hidden
            }
        })();
    });

    checkGreetingTime(); // 2-5. by checking time, greeting will be different

    signIn.classList.add("hidden"); // signing in form is also hidden
    savedUserLogInForm.classList.add("hidden"); // hide login form
    greeting.classList.remove("hidden"); // show only greeting
    mainSection.classList.remove("hidden"); // show main section

    makeLogOutBtn();
}

//
//
// 2-3. check password is correct
//
function checkUserPw(event) {
    event.preventDefault();
    const inputPw = event.target.firstElementChild.value; // input value (password)
    userArray.forEach((element) => {
        // search for login userdata in  userArray
        (function () {
            if (element.id === parseInt(event.target.parentElement.id) && inputPw === element.password) {
                showGreeting(event.target.parentElement); // 2-4. correct password, greet user, <div class="savedUserLogInForm">...</div>
            } else if (element.id === parseInt(event.target.parentElement.id) && inputPw !== element.password) {
                alert("wrong password"); // wrong password -> alert
            }
        })();
    });
}

//
//
// 2-2. click lockOpenButton -> show password for login
//
function ShowPwEnter(event) {
    const PwEnter = event.target.parentElement.nextElementSibling; // PwEnter = <form class="hidden"></form>
    PwEnter.classList.toggle("hidden"); // remove class="hidden, <form class=""></form>
    PwEnter.addEventListener("submit", checkUserPw); // 2-3. if you submit password -> checkUserPw will check password
}

//
//
// 2-1. make section for login
//
function makeUserLogIn(userObj) {
    // make new user login form
    const logIncontainer = document.createElement("div"); // new <div></div>
    logIncontainer.classList.add("savedUserLogInForm"); // add class, <div class="savedUserLogInForm">
    logIncontainer.id = userObj.id; // add id, <div id=`${userObj.id}` class="savedUserLogInForm">
    logIncontainer.innerHTML = logIn.innerHTML; // copy login section for each user

    // insert username
    const localUsername = logIncontainer.querySelector(".localUsername"); // <h3 class="localUsername"></h3>
    localUsername.innerText = `${userObj.username}`; // insert username, <h3 class="localUsername">username</h3>

    logInSection.appendChild(logIncontainer);

    // lock open button for logIn
    const lockOpenBtn = logIncontainer.querySelector(".lockOpenBtn");
    lockOpenBtn.addEventListener("click", ShowPwEnter); // 2-2. clicking button -> show password input form
}

//
//  1-5. cancel SignIn Button
//
//
function cancelSignIn(event) {
    InputUsername.value = "";
    InputPw.value = "";
    newAccountBtn.classList.remove("hidden");
    SignInForm.classList.add("hidden");
    event.target.remove();
}
//
//
//  1-4. make cancel button
//
function makeCancelBtn() {
    const cancel = document.createElement("button");
    cancel.classList.add("cancelBtn");
    cancel.setAttribute("type", "button");
    SignInForm.appendChild(cancel);
    cancel.addEventListener("click", cancelSignIn);
}

//
//
//  1-3. show new account button
//
function showNewAccountBtn() {
    SignInForm.classList.add("hidden");
    newAccountBtn.classList.remove("hidden");
}

//
//
// 1-2. save at localStorage
//
function saveUserData() {
    localStorage.setItem(USERDATA, JSON.stringify(userArray));
}

//
//
// 1-1. Sign in
// if you sign in, then your data will store in userArray and localStorage.
//
function handleSignIn(event) {
    event.preventDefault();

    const userObj = {
        username: InputUsername.value,
        password: InputPw.value,
        id: Date.now(),
        // you can add more data...
    };
    InputUsername.value = "";
    InputPw.value = "";

    userArray.push(userObj); // add at userArray

    saveUserData(); // 1-2. store at localStorage
    makeUserLogIn(userObj); // 2-1.make section for login
    showNewAccountBtn(); // 1-3. show new account button for the other sign in
}

//
//
// 0. click new Account button and sign in
//
function showSignForm() {
    newAccountBtn.classList.add("hidden");
    SignInForm.classList.remove("hidden");

    makeCancelBtn();
}

newAccountBtn.addEventListener("click", showSignForm); // click new account button, and can see signIn Form
SignInForm.addEventListener("submit", handleSignIn);

//
//
// 3. if cite reloaded, show saved user logInForm
//
if (localStorage.getItem(USERDATA) !== null) {
    const localUserData = JSON.parse(localStorage.getItem(USERDATA));
    userArray = localUserData;

    userArray.forEach((element) => {
        makeUserLogIn(element);
    });
}
