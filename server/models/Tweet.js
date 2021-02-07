const tweetSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

// mongoose.model tells mongoose we want to create a
// new collection called tweets -- if it already exists, it
// won't overwrite existing collection
mongoose.model("tweets", tweetSchema);
