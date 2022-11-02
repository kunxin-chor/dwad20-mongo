# Showing Databases
Demonstrate commands related to databases in Mongo

## Show all databases
```
show databases
```
To set a database as active:
```
use sample_airbnb
```

To show collections in a database:
```
show collections
```

# Find documents by critera
```
db.listingsAndReviews.find().pretty().limit(5);
```

* `db` : the current active database
* `listingsAndReviews`: the collection
* `.pretty()`: format it nicely
* `.limit(5)`: only the first five records 

## Projection
We only want to see certain key/value pairs. 

So for instance, to see only the `beds` and `name`:

```
db.listingsAndReviews.find({},{
    'name':1,
    'beds':1
});
```

Example 2: to see only the `name` and `price`
```
db.listingsAndReviews.find({},{
    'name': 1,
    'price':1
})
```

If we set the value to 0, it means don't show. Set to 1 means show.

## Find documents by a crtiera
We want only to see documents where the number of beds is 2
```
db.listingsAndReviews.find({
    'beds': 2
}, {
    'name': 1,
    'beds': 1
})
```

## Multiple critera
Find by number of beds and bedrooms. By default, if we have multiple key/value pairs for the critera,
then it is an AND
```
db.listingsAndReviews.find({
    'beds': 2,
    'bedrooms': 2
},{
    'name':1,
    'beds':1,
    'bedrooms':1
})
```

## Search by keys of nested object
```
db.listingsAndReviews.find({
    'address.country':"Brazil"
},{
    'name':1,
    'address.country':1
})
```

### Find all documents with 2 beds, 2 bedrooms and in Brazil
```
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
```

## Filter by inequality
$gt for greater than
$lt for lesser than

$gte for greater than or equal
$lte for lesser than or equal

```
db.listingsAndReviews.find({
    'bedrooms': {
        '$gte': 3,
        '$lte': 6
    }
},{
    'bedrooms': 1,
    'name': 1
})
```

Find all listings in Brazil that has between 3 to 6 bedrooms
```
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
```

## Find by items in an array
```
db.listingsAndReviews.find({
    "amenities":"Oven"
},{
    'name': 1,
    'amenities': 1
})

```

Even though `amenities` is an array, we could just supply the string to look for

### Find all listings with one or more of the stated items
```
db.listingsAndReviews.find({
    'amenities':{
        "$in":["Oven", "Microwave", "Stove"]
    }
},{
    'name': 1,
    'amenities':1
})

```

### Find all listings with ALL of the stated items
```
db.listingsAndReviews.find({
    'amenities':{
        "$all":["Oven", "Microwave", "Stove"]
    }
},{
    "name": 1,
    "amenities": 1
})
```

## Find by date
```
db.listingsAndReviews.find({
    'first_review': {
        "$gt":ISODate("2018-12-31")
    }
},{
    'name': 1,
    'first_review': 1
})
```

## Find by string patterns
We be able to find all listings that has the word 'spacious' in its name:
```
db.listingsAndReviews.find({
    "name": {
        "$regex":"spacious", "$options":"i"
    }
},{
    "name": 1
})
```

## Find by keys in a nested array of objects
```
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
```

## Find by ObjectID
```
use sample_mflix;
db.movies.find({
    _id:ObjectId("573a1391f29313caabcd796e")
})
```