async function getPrograms()
{
let listOfProgram = document.getElementById("program") //A click event will be attached to this variable.
//API Call to Load programs list from the remote server
listOfProgram.innerHTML = '<option selected>Choose Program</option>';
await fetch('/api/programs', {
headers: {
    'Content-Type':'application/json'
},
method: 'GET'
}).then(response => {
    return response.json()
}).then(data => {
    data.forEach(program => {
        let populateProgram = document.createElement("option");
        populateProgram.textContent = program;
        populateProgram.value = program;
        listOfProgram.add(populateProgram)
    })
})
}
//load graduation year from /api/graduationYears
async function getGraduationYear()
{
    let graduationEl = document.getElementById("graduationYear")
    graduationEl.innerHTML = "<option selected>Select Graduation Year</option>"
    await fetch("/api/graduationYears")
    .then(response => response.json())
    .then(data => {
        for(let i=0; i<data.length; i++)
        {
            let newGraduationOption = document.createElement("option")
            newGraduationOption.textContent = data[i];
            newGraduationOption.value = data[i];
            graduationEl.add(newGraduationOption)
        }
    })
}

//Post User Entered in for to /api/register/
async function signupUser()
{
    let formElementSelector = document.getElementById("signupForm")
    formElementSelector.addEventListener("submit", (event) => {
    event.preventDefault();
    
    let formObj = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    program: document.getElementsByName("program")[0].value,
    matricNumber: document.getElementById("matricNumber").value,
    graduationYear: document.getElementsByName("graduationYear")[0].value
    };

    fetch('/api/register', {
        headers: {'Content-Type': 'application/json'}, 
        method: 'POST', 
        body: JSON.stringify(formObj)
    }).then(response => {
        return response.json();
    })
    .then(responseData => {
        if(responseData.status === 'ok')
        {
            console.log(responseData)
            let userId = responseData.data.id;
            setCookie(userId, 5);
            window.location.href = 'index.html';
        }
        else
            console.log(responseData)
            let err = responseData.errors;
            let errorDiv = document.getElementById('error-alert');
            errorDiv.classList.add('.alert.alert-danger');
            for(let i = 0; i < err.length; i++) {
                let errP = document.createElement('p');     
                errP.innerText = err[i];          
                errorDiv.appendChild(errP);
            } 
    }).catch(error =>{
        console.log('error:', error)
    })
})
}

//set cookie
function setCookie(cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = "";
    document.cookie = "uid=" + cvalue + ";" + expires + ";path=/";
    console.log("document.cookie",document.cookie); // To view the cookie using developer tool in the browser
}

//Get Username using the uid from the cookie and updating 
//the index page with logout and 'Hi {firstname}'
async function updateNavbar()
{
    let uid = "";
    document.cookie
    .split(";")
    .forEach(userId =>{
        if(userId.startsWith("uid="))
        {
            uid = userId.split("=")[1];
        }
    })

    if(uid !== ""){
        let url = "api/users/"+uid
        await fetch(url, {
            headers : {
                'Content-Type':'application/json'
            },
            method: 'GET'
        }).then(response =>{
            return response.json()
        }).then(data => {
            let firstNameEl = document.getElementById("userFirstName")
            let logOutEl = document.getElementById("logout")
            logOutEl.innerHTML = "Logout"
            firstNameEl.innerHTML = "Hi " + data.firstname;
            firstNameEl.href = '#';
            logoutEl.addEventListener('click', e =>{
                e.preventDefault()
                document.cookie = "" //clear the cookie
                window.location.href = 'index.html';
            })
        })
    }

}
//update navbar on windows load
//window.onload = updateNavbar();

async function loginUser(){
    let loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        let logObj = {
            "email":  document.getElementById('email').value,
            "password": document.getElementById('password').value,
        }

        fetch('/api/login', 
        {
            header: {'Content-Type': '/application/json'},
            method: 'POST',
            body: JSON.stringify(logObj)
        }).then(response => {
            if(response.ok)
            {
                return respone.json()
            }
            let loginErrorsEl = document.getElementById('login-error');             
            var newErrorEl = document.createElement('p');
            newErrorEl.textContent = "Email or Password incorrect";
            loginErrorsEl.appendChild(newErrorEl)
        
        }).then(responseData =>{
            let uid = responseData.data.id;
            setCookie(uid, 7);
            window.location.href = 'index.html';
        })
 })
}

async function submitProject(){
    let projectFormEl = document.getElementById("createProjectForm")
    projectFormEl.addEventListener("click", event =>{
        event.preventDefault();

        let projectInput = {
            "name": document.getElementById("projectName"),
            "abstract": document.getElementById("abstract"),
            "authors": document.getElementById("author").value.split(","),
            "tags": document.getElementById("tags").value.split(",")
        }

        fetch("/api/project", {
            header: {
                'Content-Type':'application/json'
            },
            method: 'POST',
            body: JSON.stringify(projectInput)
        }).then(response =>{
            return response.json()
        }).then(responseData => {
            console.log(responseData)
            if(responseData.status === "ok")
            {
                window.location.href = "index.html";
            }
            let submitErrorEl = document.getElementById("error-alert");
            let responseDataError = responseData.errors;
            for(let i=0; i<responseDataError.length; i++){
                let errorDiv = document.createElement('div');
                errorDiv.classList = "alert alert-danger";
                errorDiv.textContent = responseDataError[i];
                submitErrorEl.appendChild(errorDiv)
            }
        })
    })
}

function redirectToLogin() {
    let uid = '';
    document.cookie
    .split(';')
    .filter(row => {
        if(row.startsWith('uid=')){
         uid = row.split('=')[1];
        }})
        console.log(uid)
    
    if(uid == ''){
        window.location.href = 'login.html';
    }else{
        submitProject();
    }
}



if (window.location.href.includes('register.html')) {
    getPrograms();
    getGraduationYear();
    signupUser()
}

if (window.location.href.includes('login.html')) {
    loginUser()
}

if (window.location.href.includes('createproject.html')) {
    redirectToLogin()
}