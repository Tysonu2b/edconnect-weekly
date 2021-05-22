const DataModel = require('./data_model');

class Project {
    constructor(id, name, abstract, authors, tags, createdBy) {
        this.id = id;
        this.name = name;
        this.abstract = abstract;
        this.authors= authors
        this.tags= tags;
        this.createdBy = createdBy
    }
}

class Projects extends DataModel {
    validate(obj) {
        var newArr = [id, this.name, abstract, abstract,createdBy]
        var projectError = new this.errors;
        var passValidation;
        if(!Array.isArray(authors))
        {
            projectError.push("Authors should be an array");
            passValidation = false;

        }
        else
            passValidation = true;


        if(!Array.isArray(tag))
        {
            projectError.push("Tags should be an array");
            passValidation = false;

        }

        else
            passValidation = true;

        for(let i=0; i<newArr.length; i++)
        {
            if(newArr[i]===null)
            {
                projectError.push(newArr[i] + " should not be empty");
                passValidation = false;
            }
            else
                passValidation = true;

        }

        return passValidation;

    }
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};