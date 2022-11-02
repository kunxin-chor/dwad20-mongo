db.listingsAndReviews.find({
    'beds': 2,
    'bedrooms': 2,
    'address.country':"Brazil"
},{
    'name':1,
    'beds':1,
    'bedrooms':1,
    'address.country':1
})

// find all listings with 3 to 6 bedrooms
db.listingsAndReviews.find({
    'bedrooms': {
        '$gte': 3,
        '$lte': 6
    }
},{
    'bedrooms': 1,
    'name': 1
})

// find all listings in Brazil that has between 3 to 6 bedrooms:
db.listingsAndReviews.find({
    'address.country': "Brazil",
    "bedrooms":{
        "$gte": 3,
        "$lte": 6
    }
},{
    'name': 1,
    'address.country': 1,
    'bedrooms': 1
});

// find by more than one country
db.listingsAndReviews.find({
    "$or":[
        {
            "address.country":"Brazil"
        },
        {
            "address.country":"Canada"
        }
    ]
},{
    "name": 1,
    "address.country": 1
})

// find listing in Brazil and Canada, and also
// more than 3 bedrooms
db.listingsAndReviews.find({
    "$or":[
        {
            "address.country":"Brazil"
        },
        {
            "address.country":"Canada"
        }
    ],
    'bedrooms':{
        '$gt': 3
    }
},{
    "name": 1,
    "address.country": 1,
    "bedrooms": 1
})

// find all listings that have oven
db.listingsAndReviews.find({
    "amenities":"Oven"
},{
    'name': 1,
    'amenities': 1
})

// find all listings that have ONE or MOREof the following
db.listingsAndReviews.find({
    'amenities':{
        "$in":["Oven", "Microwave", "Stove"]
    }
},{
    'name': 1,
    'amenities':1
})

// find all listings that ALL of the following inside
// their amentities array
db.listingsAndReviews.find({
    'amenities':{
        "$all":["Oven", "Microwave", "Stove"]
    }
},{
    "name": 1,
    "amenities": 1
})
// find all the listings and reviews before 2019
db.listingsAndReviews.find({
    'first_review': {
        "$gt":ISODate("2018-12-31")
    }
},{
    'name': 1,
    'first_review': 1
})

// find all listings where the name includes the 
// word "spacious"
db.listingsAndReviews.find({
    "name": {
        "$regex":"spacious", "$options":"i"
    }
},{
    "name": 1
})

db.listingsAndReviews.find({
    'reviews':{
        '$elemMatch': {
            'reviewer_name':"Davi"
        }
    }
},{
    'name': 1,
    'reviews.$': 1
})

// find details of the movie with the ID
// 573a1391f29313caabcd796e
use sample_mflix;
db.movies.find({
    _id:ObjectId("573a1391f29313caabcd796e")
})