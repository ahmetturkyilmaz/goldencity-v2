const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User ID is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [1, "Title cannot be empty"],
      maxlength: [50, "Title cannot exceed 50 characters"],
      validate: {
        validator: function (v) {
          return v && v.trim().length > 0;
        },
        message: "Title cannot be empty",
      },
    },
    content: {
      type: String,
      required: false,
      trim: true,
      maxlength: [500, "Content cannot exceed 500 characters"],
      validate: {
        validator: function (v) {
          if (v === undefined || v === null || v === "") {
            return true;
          }
          return v.trim().length > 0;
        },
        message: "Content cannot contain only whitespace",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);

