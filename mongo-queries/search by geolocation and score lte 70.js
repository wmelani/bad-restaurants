db.businesses.find(
    {"location.coordinates" : {
        "$nearSphere": {
            "$geometry": {
                "type": "Point", "coordinates": [-122.43086,37.801215]
            },
        "$maxDistance": 1200,
        "$uniqueDocs": 1
        }
    },
    "currentScore" : { $lte : 70 }
})