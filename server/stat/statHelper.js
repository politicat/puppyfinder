import Stat from './statModel';

let api = {
  save: (topThree) => {
    for (var key in topThree) {
      let puppy = topThree[key].breed;
      Stat.update({puppy: puppy}, {$inc: {count: 1}}, {upsert: true}, (err, raw) => {
        if (err) return console.error(err);
        console.log('raw response: ', raw);
      });
    }
  }
};

export default api;
