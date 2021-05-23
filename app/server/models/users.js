const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.matricNumber = matricNumber;
        this.program = program;
        this.graduationYear = graduationYear
    }

    getFullName() {

       return this.firstname + " " + this.lastname;

    }
}

class Users extends DataModel {
    authenticate(email, password) {

        var authUser = this.data.forEach((val) => val.email === email && val.password === password);
        
        return authUser;
    }

    getByEmail(email) {
        for(let i=0; i<this.data.length; i++)
        {
            if(this.data[i].email === email)
            {
                return this.data[i];
            }
            else
                return null;
        }

    }

    getByMatricNumber(matricNumber) {
        for(let i = 0; i<this.data.length; i++)
        {
            if(this.data[i].matricNumber === matricNumber)
            {
                return this.data[i];
            }
            else
                return null;
        }

    }

    validate(obj) {
        this.errors = [];
        var check = Object.keys(obj).forEach((objKey) =>{
            if(obj[objKey] === null|| obj[objKey] === "")
            {
                this.errors.push(`${objKey} should not be empty.`);
                return false
            }
            else
                return true
        });

        var doesEmailExist = this.data.forEach((objVal) => objVal.email === obj.email);   //doesEmailExist returns a true if the email 
        if(doesEmailExist === true)
            {
                this.errors.push("A user with specified email address already exists");
            }

        var isCorrectPasswordLength = obj.password.length >= 7;

        if(isCorrectPasswordLength === true)
            {
                this.errors.push("Password should have at least 7 characters");
            }
            
         return (check && doesEmailExist && isCorrectPasswordLength)? true: false
                    
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};