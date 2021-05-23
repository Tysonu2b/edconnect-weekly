class DataModel {
    constructor() {
        this.data = [];
        this.errors = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {

        for(let i=0; i<this.data.length; i++)
        {
            if(this.data[i].id === id)
            {
                return this.data[i];
            }
            else
                return null
        }


    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
        let userExist;
        for(let i=0; i<this.data.length; i++)
        {
            if(this.data[i].id == id)
            {
                
                this.data[i].firstname = obj.firstname;
                this.data[i].lastname = obj.lastname;
                this.data[i].email = obj.email;
                this.data[i].password = obj.password;
                this.data[i].matricNumber = obj.matricNumber;
                this.data[i].program = obj.program;
                this.data[i].graduationYear = obj.graduationYear;
                userExist = true
                
            }
            else
                userExist = false;

        }
        return userExist;
    }

    delete(id) {
        let userDeleted = false
        for(let i=0; i<this.data.length; i++)
        {
            if(this.data[i].id === id)
            {
                let ind = this.data.indexOf(this.data[i]);
                this.data.splice(ind, 1);
                userDeleted = true
            }
            else
                userDeleted = false;
        }

        return userDeleted;
    }

    // this method will be overriden in the sub classes
    validate(obj) {
        
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;