"use strict";

class DataCollection {
  constructor(model) {
    this.model = model;
  }

  get(id) {
    if (id) {
      return this.model.findOne({ where: { id } });
    } else {
      return this.model.findAll({});
    }
  }

  getDesc(desc) {
    return this.model.findOne({ where: { Discription: desc } });
  }
  getUserData(username) {
    return this.model.findAll({ where: { username: username } });
  }
  create(record) {
    return this.model.create(record);
  }

  update(id, data, email) {
    if (id) {
      return this.model
        .findOne({ where: { id } })
        .then((record) => record.update(data));
    } else if (email) {
      return this.model
        .findOne({ where: { Email: email } })
        .then((record) => record.update(data));
    }
  }

  delete(id) {
    return this.model.destroy({ where: { id } });
  }
}

module.exports = DataCollection;
