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
        this.graduationYear = graduationYear;
    }

    getFullName() {

       var fullName = this.firstname +" "+ this.lastname;
       return fullName;

    }
}

class Users extends DataModel {
    authenticate(email, password) {
        for(let i=0; i<this.data.length; i++)
        {
            if(this.data[i].email===email && this.data[i].password===password)
            {
                return true;
            }
            else
                return false;
        }
    }

    getByEmail(email) {
        for(let i=0; i<this.data.length; i++)
        {
            if(this.data[i].email===email)
            {
                return this.data[i];
            }
            else
                return null;
        }

    }

    getByMatricNumber(matricNumber) {
        for(let i=0; i<this.data.length; i++)
        {
            if(this.data[i].matricNumber===matricNumber)
            {
                return this.data[i];
            }
            else
                return null;
        }

    }

    validate(obj) {
        var valid = new this.errors;
        var isValid = false;
        const userValue = Object.values(obj);
        for(val in userValue)
        {
            if(val===null)
            {
                isValid = false;
                let err = val + " field should not be empty";
                valid.push(err);
                return err;

            }
            else
                isValid = true;

        }

        for(let i=0; i<this.data.length; i++)
        {
            if(obj.email===this.data[i].email)
            {
                isValid = true;
                let err = "A user with specified email address already exists";
                return err;
            }
            else 
                isValid = true
        }

       
        if(obj.password.length<7)
            {
                isValid = false;
                let err = "Password should have at least 7 characters";
                return err;
            }
        
        return isValid
       


        // if(obj.lastname===null)
        // {
        //     var err = "Last name field should not be empty";
        //     this.errors.push(err);
        //     return err;
        // }

        // else if(obj.firstname===null)
        // {
        //     var err = "First name should not be empty";
        //     this.errors.push(err);
        //     return err;
        // }

        // else if(obj.matricNumber===null)
        // {
        //     var err = "Matric number should not be empty";
        //     this.errors.push(err);
        //     return err;
        // }

        // else if(obj.email===null)
        // {
        //     var err = "Email should not be empty";
        //     this.errors.push(err);
        //     return err;
        // }

        // else if(obj.program===null)
        // {
        //     var err = "Program should not be empty";
        //     this.errors.push(err);
        //     return err;
        // }

        // else(obj.graduationYear===null)
        // {
        //     var err = "Graduation year should not be empty";
        //     this.errors.push(err);
        //     return err;
        // }
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};