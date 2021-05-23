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
        this.errors = [];
        var otherValidation;
        var isAuthorPropArray;           //This will be true if the datatype of author is an array or false if not
        var isTagPropArray;

        if(!Array.isArray(obj.authors))
        {
            this.errors.push("Authors should be an array");
            isAuthorPropArray = false;

        }
        else
            isAuthorPropArray = true;


        if(!Array.isArray(obj.tag))
        {
            this.errors.push("Tags should be an array");
            isTagPropArray = false;

        }

        else
            isTagPropArray = true;


        for(const objKey in obj)
        {
            if(obj[objKey] === null || obj[objKey] === "" || obj[objKey] === "undefined")
            {
                this.errors.push(obj[objKey] + " should not be empty");
                otherValidation = false;
            }
            else
                otherValidation = true;
        }

        return isTagPropArray && isAuthorPropArray && otherValidation;

    }
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};