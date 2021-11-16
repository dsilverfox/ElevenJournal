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
        tokenChecker();
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

  fetch(`http://localhost:3000`, {
    method: "POST",
    headers: {"Content-Type" : "application/json"}, 
    body: JSON.stringify(userData)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    let token = data.sessionToken;
    localStorage.setItem('SessionToken', token);
    tokenChecker();
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
  tokenChecker();
}

/* *************************
 *** TOKEN CHECKER FUNCTION ***
 ************************** */
function tokenChecker() {
  console.log("tokenChecker Function Called");
  let display = document.getElementById('journals');
  let header = document.createElement('h5');
  let accessToken = localStorage.getItem('SessionToken');
  let alertText = "Log in or Sign up to get started!";
  // let logintxt = document.getElementsByClassName(".login")
  // let userEmail = document.getElementById("emailLogin").value;

  for (let i = 0; i < display.childNodes.length; i++) {
    display.removeChild(display.firstChild);
    // console.log(userEmail)
    // logintxt.appendChild(userEmail);
  }

  if (accessToken === 'undefined') {
    display.appendChild(header);
    header.textContent = alertText;
    header.setAttribute('id', 'defaultLogin');
    // logintxt.removeChild(userEmail);
  } else {
    null
  }
}
tokenChecker();
