const Art = require('../models/Art');
const ArtJoin = require('../models/ArtJoin');

var availableArtIds = [];
var requiredArtIds = [];

module.exports = {
  getArt: function getArt(id, cb) {
    Art.findById(id)
    .then(function(art) {
      if (art) {
        cb(art.dataValues);
      } else {
        cb(null);
      }
    })
    .catch(function(e) {
      console.error(e);
    });
  },

  insertArt: function insertArt(art) {
    for (var key in art) {
      if (art[key].length > 255) {
        art[key] = art[key].slice(0, 253);
      }
    }
    art.related.forEach(function(id) {
      ArtJoin.create({id1: art.id, id2: id});
    });
    art.related = art.related.join(',');
    Art.create(art)
    .catch(function(e) {
      console.error(e);
    });
  },

  getRelatedArts: function getRelatedArts(id, cb) {
    ArtJoin.findAll({where: {id1: id}})
    .then(function(artjoins) {
      artjoins = artjoins.map(function(artjoin) { return artjoin.dataValues.id2; });
      Art.findAll({where: {id: artjoins}})
      .then(function(arts) {
        arts = arts.map(function(art) { return art.dataValues; });
        cb(arts);
      });
    })
    .catch(function(e) {
      console.error(e);
    });
  },

  initArts: function initArts(cb) {
    if (availableArtIds.length === 0) {
      availableArtIds = [];
      requiredArtIds = [];

      Art.findAll({attributes: ['id']})
      .then(function(arts) {
        console.log(`Retrieved ${arts.length} arts from database!`);
        arts.forEach(function(art) {
          availableArtIds.push(art.dataValues.id);
        });
        if (cb) {
          cb(availableArtIds, requiredArtIds);
        }
        console.log('initArts COMPLETE');
      })
      .catch(function(e) {
        console.error(e);
      });
    } else {
      if (cb) {
        cb(availableArtIds, requiredArtIds);
      }
    }
  },

  getRandomArt: function getRandomArt(cb) {
    if (availableArtIds.length !== 0) {
      const id = availableArtIds[Math.floor(Math.random() * availableArtIds.length)];
      console.log('id =' + id);
      this.getArt(id, cb);
    } else {
      console.log('You must call initArts before calling getRandomArt');
    }
  }
};