// to create a database
// as if we `use` the database
// as if it exists
use animal_shelter;

// there is special commands for
// creating a collecition
// we just add a new document
// the collection (and the database will exist)
db.animals.insertOne({
    "name": "Fluffy",
    "age": 3,
    "breed": "Golden Retriever",
    "type": "dog"
})

// insert many at one go
db.animals.insertMany([
    {
        'name': 'Dazzy',
        'age': 5,
        'breed': 'Greyhound',
        'type': 'Dog'
    },
    {
        'name': 'Timmy',
        'age': 1,
        'breed': 'Border Collie',
        'type': 'Dog'
    }
])

// update an existing document in the database
// 1) specify the fields that I want to change
// the first parameter will be the critera of the documents to be updated
// all documents that matched the critera will be updated
db.animals.updateOne({
    "_id": ObjectId("63620701abaeae6e6b5c800a")
}, {
    "$set": {
        "name": "Thunder"
    }
})

// 2) change all the fields
db.animals.updateOne({
    "_id": ObjectId("63620701abaeae6e6b5c800a")
}, {
    "$set": {
        "name": "Thunder",
        "breed": "German Shepherd",
        "age": 1.5,
        "type": "dog"
    }
})

// to delete a document from a collection
db.animals.deleteOne({
    "_id": ObjectId("63620656abaeae6e6b5c8008")
})

// add an item to an array in a document
// use $push to add to an array in the document

// add a new object to the checkups key in the document
db.animals.updateOne({
    "_id": ObjectId("63620701abaeae6e6b5c8009")
}, {
    "$push": {
        "checkups": {
            "_id": ObjectId(),  // --> create an ObjectId automatically
            "name": "Dr. Tan",
            "diagnosis": "Diabetes",
            "treatment": "Medication"
        }
    }
})

db.animals.updateOne({
    "_id": ObjectId("63620701abaeae6e6b5c800a")
}, {
    "$push": {
        "checkups": {
            "_id": ObjectId(),
            "name": "Dr. Chua",
            "diagnosis": "Flu",
            "treatment": "Pills"
        }
    }
})

// to remove from an array in a document, we use $pull
db.animals.updateOne({
    "_id": ObjectId("63620701abaeae6e6b5c800a")
}, {
    "$pull": {
        "checkups": {
            "_id": ObjectId("63620a6cabaeae6e6b5c800c")
        }
    }
})

// change one field in an object that is inside an array of objects
// will only work for the first match
db.animals.updateOne({
    "_id": ObjectId("63620701abaeae6e6b5c8009"),
    "checkups": {
        "$elemMatch": {
            "_id": ObjectId("636209dbabaeae6e6b5c800b")
        }
    }
}, {
    "$set": {
        "checkups.$.name": "Dr. Su"
    }
})

// Add two checkups to Dazzy the Greyhound
db.animals.updateOne({
    "_id": ObjectId('63620701abaeae6e6b5c8009')
}, {
    "$push": {
        "checkups": {
            "_id": ObjectId(),
            "name": "Dr. Chua",
            "diagnosis": "Urinary tract infection",
            "treatment": "Medicine"
        }
    }
})

db.animals.updateOne({
    "_id": ObjectId('63620701abaeae6e6b5c8009')
}, {
    "$push": {
        "checkups": {
            "_id": ObjectId(),
            "name": "Dr. Chua",
            "diagnosis": "Fever",
            "treatment": "Medicine"
        }
    }
})

// add a diagnosis to Thunder the german shepherd
db.animals.updateOne({
    "_id": ObjectId('63620701abaeae6e6b5c800a')
}, {
    "$push": {
        "checkups": {
            "_id": ObjectId(),
            "name": "Dr. Chua",
            "diagnosis": "Fever",
            "treatment": "Medicine"
        }
    }
})

// change all the diagnosis by Dr. Chua for Dazzy the Greyhoiund to "redacted"
// making use of the Mongo array filters
// so the name between [ ] is an identifier
// and in the arrayFilters portion, we set the critera
db.animals.updateOne({
    "_id": ObjectId("63620701abaeae6e6b5c8009")
}, {
    "$set": {
        'checkups.$[eachCheckup].diagnosis': 'redacted'
    }
}, {
    "arrayFilters": [
        {
            'eachCheckup.name': "Dr. Chua"
        }
    ]
})

// change all the diagonisis by Dr. Chua to redacted regardless of which
// document it is in:
db.animals.updateMany({
  
}, {
    "$set": {
        'checkups.$[eachCheckup].diagnosis': 'redacted'
    }
}, {
    "arrayFilters": [
        {
            'eachCheckup.name': "Dr. Chua"
        }
    ]
})