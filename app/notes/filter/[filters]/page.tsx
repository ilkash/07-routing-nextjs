import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
type Props = {
  params: Promise<{ filter: string }>;
};
export default async function Notes({ params }: Props) {
  const { filter } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, search: "", tag: filter }],
    queryFn: () => fetchNotes(1, "", filter),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient filter={filter} />
    </HydrationBoundary>
  );
}

// export default async function NoteDetails({ params }: Props) {
//   const queryClient = new QueryClient();
//   const { id } = await params;
//   await queryClient.prefetchQuery({
//     queryKey: ["note", id],
//     queryFn: () => fetchNoteById(id),
//   });
//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <NoteDetailsClient id={id} />
//     </HydrationBoundary>
//   );
// }
