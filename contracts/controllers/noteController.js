const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");
const Note = require("../models/Note");

exports.createNote = asyncErrorHandler(async (req, res, next) => {
  const { title, content } = req.body;

  const note = await Note.create({
    user: req.user._id,
    title: title,
    content: content,
  });

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: note,
  });
});


exports.getAllNotes = asyncErrorHandler(async (req, res, next) => {

  const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: notes.length,
    notes: notes,
  });
});

exports.getNoteById = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const note = await Note.findOne({ _id: id, user: req.user._id });

  if (!note) {
    return next(new ErrorHandler(`Note with ID ${id} not found`, 404));
  }

  res.status(200).json({
    success: true,
    note: note,
  });
});

exports.updateNote = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  let note = await Note.findOne({ _id: id, user: req.user._id });

  if (!note) {
    return next(new ErrorHandler(`Note not found`, 404));
  }

  const updateData = {};
  if (title !== undefined) {
    updateData.title = title;
  }
  if (content !== undefined) {
    updateData.content = content;
  }

  note = await Note.findByIdAndUpdate(id, updateData, {
    new: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    note: note,
  });
});

exports.deleteNote = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const note = await Note.findOne({ _id: id, user: req.user._id });

  if (!note) {
    return next(new ErrorHandler(`Note with ID ${id} not found`, 404));
  }

  await Note.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
  });
});
