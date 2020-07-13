const findOneAndUpdate = (Model, queryObject, updateObject) => Model.findOneAndUpdate(queryObject, updateObject);

const addOne = (Model, initObj) => {
  const createObject = new Model(initObj);
  return createObject.save();
};

const add = async (Model, initList) => {
  for (let i = 0; i < initList.length; i += 1) {
    const createObject = new Model(initList[i]);
    createObject.save();
  }
};

const findOne = (Model, queryObject) => Model.findOne(queryObject);

const findOneWithLean = (Model, queryObject) => Model.findOne(queryObject).lean(true);

const find = (Model, queryObject) => Model.find(queryObject);

const findWithSkipLimitLean = (Model, queryObject, skipNumber, limitNumber) => Model.find(queryObject).sort({ name: 1 }).skip(skipNumber).limit(limitNumber).lean(true);

const findWithLean = (Model, queryObject) => Model.find(queryObject).lean(true);

const findWithProjectLean = (Model, queryObject, projectQuery) => Model.find(queryObject, projectQuery).lean(true);

const findAndUpdate = (Model, queryObject, updateObject) => Model.updateMany(queryObject, updateObject);

const count = (Model, queryObject) => Model.count(queryObject);

const remove = (Model, queryObject) => Model.deleteMany(queryObject);

const aggregate = (Model, queryObject) => Model.aggregate(queryObject);

module.exports = {
  findOneAndUpdate,
  addOne,
  add,
  findOne,
  findOneWithLean,
  find,
  findWithSkipLimitLean,
  findWithProjectLean,
  findWithLean,
  count,
  remove,
  findAndUpdate,
  aggregate,
};
