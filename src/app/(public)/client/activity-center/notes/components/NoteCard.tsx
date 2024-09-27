import { TransformedNotesMember } from '@/types/TActivityCenter';

import { useNotes } from '@/store/useNotes';

import {
  CardACDescription,
  CardACHeader,
  CardACRoot,
} from '../../components/CardAC';

interface Props {
  item: TransformedNotesMember;
}

export const NoteCard = ({ item }: Props) => {
  const { setActiveNote } = useNotes();
  return (
    <CardACRoot onClick={() => setActiveNote(item)}>
      <CardACHeader date={item.lastNoteCreatedDate}>
        <p>{item.title}</p>
      </CardACHeader>
      <CardACDescription description={item.description} />
    </CardACRoot>
  );
};
