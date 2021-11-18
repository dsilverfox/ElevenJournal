/* *************************
 *** USER SIGNUP ***
 ************************** */
function userSignUp() {
  //console.log("userSignUp Function Called");

  let userEmail = document.getElementById("emailSignup").value;
  let userPass = document.getElementById("pwdSignup").value;

  let newUserData = {
      user: {
          email: userEmail,
          password: userPass
      }
  };
  
  console.log(`newUserData ---> ${newUserData.user.email} ${newUserData.user.password}`);

  fetch(`http://localhost:3000/user/register`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(newUserData)
  })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let token = data.sessionToken;
        localStorage.setItem('SessionToken', token);
        protectedViews();
    })
    .catch(err => {
        console.error(err)
    })
};

/* *************************
 *** USER LOGIN ***
 ************************** */
function userLogin() {
  console.log("userLogin Function Called");
  let userEmail = document.getElementById('emailLogin').value;
  let userPass = document.getElementById('pwdLogin').value;

  console.log(userEmail, userPass)
  
  let userData = {
    user:{
      email: userEmail,
      password: userPass
    }
  }

  console.log(userData);

  fetch(`http://localhost:3000/user/login`, {
    method: "POST",
    headers: {"Content-Type" : "application/json"}, 
    body: JSON.stringify(userData)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    let token = data.sessionToken;
    localStorage.setItem('SessionToken', token);
    protectedViews();
    console.log(token);
  })
  .catch(err => {
    console.error(err)
  })
}

/* *************************
 *** USER LOGOUT ***
 ************************** */
function userLogout() {
  console.log("userLogout Function Called");
  localStorage.setItem('SessionToken', undefined);
  console.log(`sessionToken --> ${localStorage.sessionToken}`);
  protectedViews();
}

/* *************************
 *** PROTECTED VIEWS FUNCTION ***
 ************************** */
function protectedViews() {
  const journalPost = document.getElementById("journalEntry");
  const journalView = document.getElementById("journalView");

  let token = localStorage.getItem("SessionToken");
  console.log(token);

  if (token === "undefined") {
    journalPost.style.display = "none";
    journalView.style.display = "none";

    let loginMessage = document.getElementById("login-message");

    let message = document.createElement("h1");
    message.setAttribute("id", "message");
    message.innerText = "Please login or signup to continue";
    message.style.cssText = `
            position: absolute;
            text-align: center;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        `;

    loginMessage.appendChild(message);
  } else {
    let loginMessage = document.getElementById("login-message");
    let message = document.getElementById("message");
    loginMessage.removeChild(message);

    journalPost.style.display = "block";
    journalView.style.display = "block";
  }
}

protectedViews();