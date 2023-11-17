import { notes, toObjectId } from "../models/Note.js";

export const renderNoteForm = (req, res) => res.render("notes/new-note");

export const createNewNote = async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Please Write a Title." });
  }
  if (!description) {
    errors.push({ text: "Please Write a Description" });
  }
  if (errors.length > 0)
    return res.render("notes/new-note", {
      errors,
      title,
      description,
    });

  const newNote = { title, description};
  newNote.user = req.user.id ;
  try {
    await notes.insertOne(newNote);
    req.flash("success_msg", "Note Added Successfully");
    res.redirect("/notes");
} catch (error) {
    console.error("Error al crear la nota:", error);
    // Manejar el error adecuadamente...
}
};

export const renderNotes = async (req, res) => {
  try {
    const notesArray = await notes.find({ user: req.user.id }).sort({ date: "desc" }).toArray();
    res.render("notes/all-notes", { notes: notesArray });
  } catch (error) {
    console.error("Error retrieving notes:", error);
    res.status(500).send("Error retrieving notes");
  }
  
};

export const renderEditForm = async (req, res) => {
  const note = await notes.findOne({ _id: toObjectId(req.params.id) });
  if (note.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/notes");
  }
  res.render("notes/edit-note", { note });
};

export const updateNote = async (req, res) => {
  const { title, description } = req.body;
  await notes.updateOne({ _id: toObjectId(req.params.id) }, { $set: { title, description } });
  req.flash("success_msg", "Note Updated Successfully");
  res.redirect("/notes");
};

export const deleteNote = async (req, res) => {
  await notes.deleteOne({ _id: toObjectId(req.params.id) });
  req.flash("success_msg", "Note Deleted Successfully");
  res.redirect("/notes");
};
