const Meetup = require('../models/meetups');

exports.getSecret = function (req,res) {
  return res.json({secret:'I am Secret message'})
} 

exports.getMeetups = function(req, res) {
  Meetup.find({})
        .populate('category')
        .populate('joinedPeople')
        .exec((errors, meetups) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(meetups);
  });
}

exports.getMeetupById = function(req, res) {
  const {id} = req.params;

  Meetup.findById(id)
        .populate('meetupCreator', 'name id avatar')
        .populate('category')
        .populate({path: 'joinedPeople',
           options: {limit: 5, sort: {username: -1}}})
        .exec((errors, meetup) => {
    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(meetup);
  });
}

exports.createMeetup = function(req, res) {
  const meetupData = req.body;
  const user = req.user;

  const meetup = new Meetup(meetupData);
  meetup.user = user;
  meetup.status = 'active';

  meetup.save((err, createdMeetup) => {
    if (err) {
      return res.status(422).send({errors});
    }

    return res.json(createdMeetup)
  })
}
