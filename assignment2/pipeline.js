const agg = [
  {
    '$group': {
      '_id': '$loved-music-genre', 
      'names': {
        '$push': {
          'name': '$name'
        }
      }
    }
  }, {
    '$lookup': {
      'from': 'music-genre', 
      'localField': '_id', 
      'foreignField': '_id', 
      'as': '_id'
    }
  }, {
    '$unwind': {
      'path': '$_id'
    }
  }, {
    '$project': {
      '_id': '$_id.genre-name', 
      'names': 1
    }
  }, {
    '$sort': {
      '_id': 1
    }
  }
];
