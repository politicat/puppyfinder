import url from 'url';

import Puppy from '../puppy/puppyModel';

import {calculateTotalWeight, setWeight, sortArray} from '../config/helpers.js';

var api = {
  // TODO query를 req.body로 보내기
  /* SEARCH and RETURN three matching puppies */
  getResultPuppies: function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    var puppy = new Puppy();

    puppy.isUserAllergic.allergic = query.allergic;
    puppy.isUserAbsent.absent = query.absent;
    puppy.isUserActive.active = query.active;
    puppy.isUserSingle.single = query.single;
    puppy.isPuppyFriendly.friendly = query.friendly;
    puppy.isPuppyInside.inside = query.inside;
    puppy.initialCost.cost = "" + query.initialCost;
    puppy.maintenance.cost = "" + query.maintenance;
    puppy.total_weight = setWeight(puppy);

    console.log("/search >>>>>>>>>>>>>>>>>>>>>>>>> Receieved req: ", query);
    console.log("user data's total weight: ", puppy.total_weight);

    var array;

    Puppy.find()
    .exec(function(err, puppies) {
        if (err) res.send('cannot retrieve data from DB');
        else {
          array = puppies;
          var sorted = sortArray(puppy.total_weight, array);
          var matched = sorted.slice(0, 3);

          // Increase num_selected for each matching puppy
          for (var i = 0 ; i < 3; i++) {
            var matchedPuppy = matched[i];
            matchedPuppy.num_selected++;
            matchedPuppy.save();
          }

          res.send(matched);
        }
    });
  }
};

export default api;
