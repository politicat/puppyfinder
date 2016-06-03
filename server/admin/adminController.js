import Puppy from '../puppy/puppyModel';

var api = {
  getAdminPage: function(req, res) {
    res.sendFile('admin.html', {root: './server/admin'});
  },

  getDbManagePage: function(req, res) {
    res.sendFile('dbmanage.html', {root: './server/admin'});
  },

  getStatPage: function(req, res) {
    res.sendFile('stat.html', {root: './server/admin'});
  },

  insertPuppy: function(req, res) {
    var puppy = new Puppy();

    // Create a new db document
    puppy.breed = req.body.breed;
    puppy.description = req.body.description;
    puppy.image = req.body.image;
    puppy.isUserAllergic.allergic = req.body.isUserAllergic.allergic;
    puppy.isUserAbsent.absent = req.body.isUserAbsent.absent;
    puppy.isUserActive.active = req.body.isUserActive.active;
    puppy.isUserSingle.single = req.body.isUserSingle.single;
    puppy.isPuppyFriendly.friendly = req.body.isPuppyFriendly.friendly;
    puppy.isPuppyInside.inside = req.body.isPuppyInside.inside;
    puppy.initialCost.cost = req.body.initialCost.cost;
    puppy.maintenance.cost = req.body.maintenance.cost;

    Puppy.findOne({breed: puppy.breed}, function(err, pup) {
      if (err) res.send("error finding duplicated puppy whiie saving new puppy");
      if (pup === null) {
        puppy.save(function(err, puppy) {
          if (err)  res.send("error saving new puppy");
          else {
            res.send(puppy);
          }
        });
      } else {
        res.send("error: db has already the same breed");
      }
    });

  }
};

export default api;
