import Puppy from '../puppy/puppyModel';

var api = {
  getAdminPage: function(req, res) {
    res.sendFile('admin.html', {root: './server/admin'});
  },

  getDbManagePage: function(req, res) {
    res.sendFile('dbmanage.html', {root: './server/admin'});
  },

  getUploadPage: function(req, res) {
    res.sendFile('upload.html', {root: './server/admin'});
  },

  getUpdatePage: function(req, res) {
    res.sendFile('update.html', {root: './server/admin'});
  },

  getRemovePage: function(req, res) {
    res.sendFile('remove.html', {root: './server/admin'});
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

    puppy.save(function(err, puppy) {
      if (err)  res.send("error saving new puppy");
      else {
        res.send(puppy);
      }
    });
  }
};

export default api;
