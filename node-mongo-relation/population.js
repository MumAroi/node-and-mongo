const mongoose = require('mongoose');


const options = {
  user: 'root',
  pass: 'example',
  authSource: 'admin',
  // roles: [ "root" ],
  // dbName : "vidly"
};

mongoose.connect('mongodb://localhost:27017/playground', options)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    // check shema ObjectId 
    type: mongoose.Schema.Types.ObjectId,
    // relation form Author
    ref: 'Author'
  }
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    // like join from mysql
    .populate('author', 'name -_id')
    .select('name author');
  console.log(courses);
}

// createAuthor('Mosh', 'My bio', 'My Website');

// createCourse('Node Course', 'authorId')
// createCourse('Node Course', '5b3742154084c11e9c984453')

listCourses();