import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import css from './CreateTodoForm.module.css'
import * as Yup from "yup";
import type { TodoFormValues } from "../../types/todo";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { createTodo } from "../../redux/todos/operations";


const initialState = {
  title: "",
  content: "",
  tag: "Todo",
  completed: false,
  
};

const NoteSchema = Yup.object().shape({
  title: Yup.string().required("Please give your note a title"),
  content: Yup.string().required("Please give some details"),
  tag: Yup.string().required("Please, choose one of the tags"),
  completed: Yup.boolean()
});


const CreateTodoFrom = ({onClose}: {onClose: () => void}) => {
    const dispatch = useDispatch<AppDispatch>()
    const handleSubmit = async (
  values: TodoFormValues,
  actions: FormikHelpers<TodoFormValues>
) => {
  const newTodo = {...values,
    completed: false
  };
  const res = await dispatch(createTodo(newTodo))
  if(createTodo.fulfilled.match(res)){
    actions.resetForm();
    onClose()
   }
};
  return (
    <Formik
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

        <div className={css.actions}>
          <button type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default CreateTodoFrom;
