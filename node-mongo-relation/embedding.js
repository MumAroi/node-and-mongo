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

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
//   author: authorSchema
  author: {
      type: authorSchema,
      required: true
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
    const course = await Course.update({ _id: courseId}, {
        // $set: {
        //     'author.name' : 'PARAMEST'
        // }
        $unset: {
            'author' : 'PARAMEST'
        }
    })
    // const course = await Course.findById(courseId)
    // course.author.name = 'Paramest Waewsuwan'
    // course.save()
}

// createCourse('Node Course', new Author({ name: 'Mosh' }));
updateAuthor('5b3746f81b6efe35800bf4a1')
