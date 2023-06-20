'use strict';

const { userId } = require('../helpers/getId');

const getAll = (users) => {
  return (req, res) => {
    res.send(users);
  };
};

const add = (users) => {
  return (req, res) => {
    const { name } = req.body;

    const user = {
      id: userId.getId(),
      name,
    };

    users.push(user);

    res.status(201).send(user);
  };
};

const getOne = (users) => {
  return (req, res) => {
    const { id } = req.params;

    const foundedUser = users.find((user) => user.id === +id);

    if (!foundedUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundedUser);
  };
};

const update = (users) => {
  return (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const foundedUser = users.find((user) => user.id === +id);

    if (!foundedUser) {
      res.sendStatus(404);

      return;
    }

    foundedUser.name = name;

    res.send(foundedUser);
  };
};

const remove = (users) => {
  return (req, res) => {
    const { id } = req.params;
    const index = users.findIndex((user) => user.id === +id);

    if (index === -1) {
      res.sendStatus(404);

      return;
    }

    users.splice(index, 1);
    userId.addFreeId(index);

    res.sendStatus(204);
  };
};

module.exports = {
  getAll,
  add,
  getOne,
  update,
  remove,
};