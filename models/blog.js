const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 2,
    required: [ true, 'A title is required' ]
  },
  author: {
    type: String,
    minLength: 3,
    required: [ true, 'An author is required' ]
  },
  url: {
    type: String,
    required: [ true, 'A Domain is required' ],
    work: [mongoose.SchemaTypes.Url, 'A Domain is required' ],
    profile: [mongoose.SchemaTypes.Url, 'A Domain is required'] ,
    // validate: {
    //   validator: value => blogSchema.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true }),
    //   message: 'Must be a Valid URL'
  //   }
  // },
  },
  votes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)