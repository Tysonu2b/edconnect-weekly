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
                break;
            }
                
        }
        return null


    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
               
                for (let key in obj) {
                    let userDataFromDataArray = this.data.find(userData => userData.id == id);
                    if (userDataFromDataArray.length == 0) {
                        return false;
                    } else {
                        userDataFromDataArray[key] = obj[key];
                    }
                }
                return true;
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