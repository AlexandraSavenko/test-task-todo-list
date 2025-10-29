import type { EditTodoFormValues, TodoFormValues } from "../../types/todo";
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import css from "./EditTodoForm.module.css";
import type { Todo } from "../../types/todo";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { editTodo } from "../../redux/todos/operations";

const NoteSchema = Yup.object().shape({
  title: Yup.string().required("Please give your note a title"),
  content: Yup.string().required("Please give some details"),
  tag: Yup.string().required("Please, choose one of the tags"),
  completed: Yup.boolean(),
});

interface EditTodoFormProps {
  onClose: () => void;
  todoToEdit: Todo;
}
const EditTodoForm = ({ onClose, todoToEdit }: EditTodoFormProps) => {
 const dispatch = useDispatch<AppDispatch>()
  const initialState = todoToEdit ? {... todoToEdit} :{
    title: "",
    content: "",
    tag: "Todo",
    completed: false,
  };
  
  const handleSubmit = async (values: EditTodoFormValues, actions:FormikHelpers<TodoFormValues>) => {
    const res = await dispatch(editTodo(values));
    if(editTodo.fulfilled.match(res)){
        actions.resetForm();
        onClose()
       }
  };
  return <Formik
    initialValues={initialState}
    onSubmit={handleSubmit}
    validationSchema={NoteSchema}
  >
    <Form className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <Field id="title" type="text" name="title" className={css.input} />
        <ErrorMessage component="span" name="title" className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <Field
          as="textarea"
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
        />
        <ErrorMessage component="span" name="content" className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <Field as="select" id="tag" name="tag" className={css.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </Field>
        <ErrorMessage component="span" name="tag" className={css.error} />
      </div>
      <div className={css.checkBoxGroup}>
        <label htmlFor="completed">Completed:</label>
        <Field className={css.checkBox} type="checkbox" name="completed" />
      </div>
      <div className={css.actions}>
        <button type="button" className={css.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Update note
        </button>
      </div>
    </Form>
  </Formik>;
};

export default EditTodoForm;
