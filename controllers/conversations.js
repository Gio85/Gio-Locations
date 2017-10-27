const Conversation = require('../models/conversation');

function conversationsIndex(req, res) {
  Conversation
    .find({
      $or: [{ from: req.currentUser }, { to: req.currentUser }]
    })
    .populate('to from messages.from')// in order to show the username inside the trips Index page
    .exec()
    .then(conversations => res.json(conversations))
    .catch(err => res.status(500).json(err));
}

function conversationsShow(req, res) {
  Conversation
    .findById(req.params.id)
    .populate('to from')
    .exec()
    .then((conversation) => {
      if(!conversation) return res.notFound();

      res.json(conversation);
    })
    .catch(err => res.status(500).json(err));
}

function messagesCreate(req, res) {
  req.body.from = req.currentUser.id;

  // send the other users id as req.body.to
  // the content of the message will be req.body.text
  // req.body = { text: 'hello', to: '82937sdhjd38932472389jsdf', from: '87294hfskdf3897498w3' }

  Conversation
    .findOne({ $or: [{ from: req.body.to }, { to: req.body.to }]})
    .then((conversation) => {
      // if no conversation is found
      if(!conversation) {
        // create a new one using req.body
        return Conversation
          .create(req.body);
      } else {
        // else just return the existing conversation
        return conversation;
      }
    })
    .then(conversation => {
      conversation.messages.push(req.body);
      return conversation.save();
    })
    .then(conversation => {
      res.status(201).json(conversation);
    })
    .catch(err => res.status(500).json(err));
}

function conversationsDelete(req, res) {
  Conversation
    .findById(req.params.id)
    .exec()
    .then((conversation) => {
      if(!conversation) return res.notFound();

      return conversation.remove();
    })
    .then(() => res.status(204).end())
    .catch(err => res.status(204).json(err));
}


module.exports = {
  messagesCreate,
  conversationsIndex,
  conversationsShow,
  conversationsDelete
};



// =======================================
