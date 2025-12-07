const express = require("express");
const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const { isAuthenticatedUser } = require("../middlewares/user_actions/auth");

const router = express.Router();

router
  .route("/notes")
  .post(isAuthenticatedUser, createNote)
  .get(isAuthenticatedUser, getAllNotes);

router
  .route("/notes/:id")
  .get(isAuthenticatedUser, getNoteById)
  .put(isAuthenticatedUser, updateNote)
  .delete(isAuthenticatedUser, deleteNote);

module.exports = router;

