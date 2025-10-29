import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "../../services/noteService";
import Loader from "../Loader/Loader";
interface NoteListProps {
  notes?: Note[];
  loading: boolean;
}
const NoteList: React.FC<NoteListProps> = ({ notes, loading }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.log(error)
    }
  });

  const handleDelete = (noteId: string) => {
    mutation.mutate(noteId)
  }
  return (
    <>
      {loading && <Loader/>}
      {notes && (
        <ul className={css.list}>
          {notes.map((note) => (
            <li key={note.id} className={css.listItem}>
              <h2 className={css.title}>{note.title}</h2>
              <p className={css.content}>{note.content}</p>
              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                <button disabled={mutation.isPending} onClick={() => {handleDelete(note.id)}} className={css.button}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default NoteList;

//possible front-end rerender of NoteList to avoid refreshing from back-end

// const mutation = useMutation({
//   mutationFn: deleteNote,
//   onMutate: async (noteId) => {
//     await queryClient.cancelQueries({ queryKey: ["notes"] });
//     const previousNotes = queryClient.getQueryData<Note[]>(["notes"]);
//     queryClient.setQueryData<Note[]>(["notes"], old => old?.filter(n => n.id !== noteId));
//     return { previousNotes };
//   },
//   onError: (_err, _noteId, context) => {
//     if (context?.previousNotes) {
//       queryClient.setQueryData(["notes"], context.previousNotes);
//     }
//   },
//   onSettled: () => {
//     queryClient.invalidateQueries({ queryKey: ["notes"] });
//   },
// });