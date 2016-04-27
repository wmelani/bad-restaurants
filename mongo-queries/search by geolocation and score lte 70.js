db.businesses.find(
    {"location.coordinates" : {
        "$nearSphere": {
            "$geometry": {
                "type": "Point", "coordinates": [-122.43086,37.801215]
            },
        "$maxDistance": 1200, /* 124.274238 miles */
        "$uniqueDocs": 1
        }
    },
    "currentScore" : { $lte : 70 }
})