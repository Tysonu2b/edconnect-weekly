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

       let fullname = this.firstname +' '+ this.lastname;
       return fullname;

    }
}

class Users extends DataModel {
    authenticate(email, password) {
        var authUser = false;
        var checkUserDetails = this.data.forEach((val) => {
        
        if(val.email === email && val.password === password)
        {
            authUser = true;
        } 
    });

        return authUser
}

    getByEmail(email) {
        for(let i=0; i<this.data.length; i++)
        {
            if(this.data[i].email === email)
            {
                return this.data[i];
            }
               
        }
        return null;
    }

    getByMatricNumber(matricNumber) {
        for(let i = 0; i<this.data.length; i++)
        {
            if(this.data[i].matricNumber === matricNumber)
            {
                return this.data[i];
                break;
            }
            else
                return null;
        }

    }

    validate(obj) {
        this.errors = [];
        let check = true;
    
        for(let objKey in obj)
    {
        if(obj[objKey] === null || obj[objKey] === "")
            {
                this.errors.push(`${objKey} should not be empty.`);
                check = false;
            }

    }

        var doesEmailExist = this.data.forEach((objVal) => 
        {

            if(objVal.email === obj.email)
                {
                    this.errors.push("A user with specified email address already exists");
                    check = false;
                }
            
    
        });
       
        var duplicateMatricNumber = this.data.forEach((objVal) => 
        {

            if(objVal.matricNumber === obj.matricNumber)
                {
                    this.errors.push("A user with specified matric number already exists");
                    check = false;
                }
            
    
        });
       
        var isCorrectPasswordLength = obj.password.length >= 7;
        if(isCorrectPasswordLength === false)
            {
                this.errors.push("Password should have at least 7 characters");
                check = false;
            }
            
         return check;
                    
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};