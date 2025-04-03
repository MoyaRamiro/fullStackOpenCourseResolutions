const mongoose = require("mongoose");



const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    message: props => `Person validation failed: name: Path 'name' ('${props.name}') is shorter than the minimum allowed length(3)`
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number! The correct format is XX-XXXXXXX or XXX-XXXXXXXX`
    },
    id: Number,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
