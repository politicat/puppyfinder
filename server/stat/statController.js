import Stat from './statModel.js';

let api = {
  getStats: function(req, res) {
    Stat.find().sort({count: -1})
    .exec(function(err, results) {
        if (err) res.send('cannot retrieve data from DB');
        else {
          res.send(results);
        }
    });
  }
};

export default api;

