import * as Yup from "yup";


export const NoteSchema = Yup.object().shape({
  title: Yup.string().required("Please give your note a title"),
  content: Yup.string().required("Please give some details"),
  tag: Yup.string().required("Please, choose one of the tags"),
  completed: Yup.boolean()
});