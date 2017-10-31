const Conversation = require('../models/conversation');

function conversationsIndex(req, res, next) {
  Conversation
    .find({
      $or: [{ from: req.currentUser }, { to: req.currentUser }]
    })
    .populate('to from messages.from')// in order to show the username inside the trips Index page
    .exec()
    .then(conversations => res.json(conversations))
    .catch(next);
}

function conversationsCreate(req, res, next) {
  Conversation.findOne({ $or: [
    { from: req.body.createdBy, to: req.currentUser },// check this
    { to: req.body.createdBy, from: req.currentUser }// check this
  ]})
    .then(conversation => {
      if(!conversation) return Conversation.create({ from: req.currentUser, to: req.body.createdBy });//check this
      else return conversation;
    })
    .then(conversation => res.json(conversation))
    .catch(next);
}

function conversationsShow(req, res, next) {
  Conversation
    .findById(req.params.id)
    .populate('to from messages.from')
    .exec()
    .then((conversation) => {
      if(!conversation) return res.notFound();

      res.json(conversation);
    })
    .catch(next);
}

function messagesCreate(req, res, next) {
  req.body.from = req.currentUser.id;

  Conversation
    .findById(req.params.id)
    .then(conversation => {
      conversation.messages.push(req.body);
      return conversation.save();
    })
    .then(() => {
      return Conversation
        .findById(req.params.id)
        .populate('to from messages.from');
    })
    .then(conversation => res.json(conversation))
    .catch(next);
}

function conversationsDelete(req, res, next) {
  Conversation
    .findById(req.params.id)
    .exec()
    .then((conversation) => {
      if(!conversation) return res.notFound();

      return conversation.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}


module.exports = {
  messagesCreate,
  conversationsCreate,
  conversationsIndex,
  conversationsShow,
  conversationsDelete
};



// =======================================
