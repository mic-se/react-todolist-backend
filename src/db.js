export default {
  db: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@localhost:27017/${process.env.MONGO_DB}`
};
