const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);









//https://mongoosejs.com/docs/populate.html



const author = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: 'Ian Fleming',
  age: 50
});

author.save(function (err) {
  if (err) return handleError(err);

  const story1 = new Story({
    title: 'Casino Royale',
    author: author._id    // assign the _id from the person
  });

  story1.save(function (err) {
    if (err) return handleError(err);
    // that's it!
  });
});


Story.findOne({ title: 'Casino Royale' }, function(error, story) {
  if (error) {
    return handleError(error);
  }
  story.author = author;
  console.log(story.author.name); // prints "Ian Fleming"
});



What If There's No Foreign Document?

Mongoose populate doesn't behave like conventional SQL joins. When there's no document, story.author will be null. This is analogous to a left join in SQL.

await Person.deleteMany({ name: 'Ian Fleming' });

const story = await Story.findOne({ title: 'Casino Royale' }).populate('author');
story.author; // `null`


If you have an array of authors in your storySchema, populate() will give you an empty array instead.

const storySchema = Schema({
  authors: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
  title: String
});

// Later

const story = await Story.findOne({ title: 'Casino Royale' }).populate('authors');
story.authors; // `[]`


Field Selection

What if we only want a few specific fields returned for the populated documents? This can be accomplished by passing the usual field name syntax as the second argument to the populate method:

Story.
  findOne({ title: /casino royale/i }).
  populate('author', 'name'). // only return the Persons name
  exec(function (err, story) {
    if (err) return handleError(err);

    console.log('The author is %s', story.author.name);
    // prints "The author is Ian Fleming"

    console.log('The authors age is %s', story.author.age);
    // prints "The authors age is null'
  });



  Populating Multiple Paths

What if we wanted to populate multiple paths at the same time?

Story.
  find(...).
  populate('fans').
  populate('author').
  exec();


  If you call populate() multiple times with the same path, only the last one will take effect.

// The 2nd `populate()` call below overwrites the first because they
// both populate 'fans'.
Story.
  find().
  populate({ path: 'fans', select: 'name' }).
  populate({ path: 'fans', select: 'email' });
// The above is equivalent to:
Story.find().populate({ path: 'fans', select: 'email' });
