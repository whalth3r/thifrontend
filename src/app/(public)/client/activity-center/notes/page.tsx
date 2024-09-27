import { NextPage } from 'next';

import ContentLayout from '@/components/layout/ContentLayout';

import { ActivityCenterLayout } from '../components/ActivityCenterLayout';
import { NotesDetailCard } from './components/NotesDetailCard';
import { NotesList } from './components/NotesList';
import { NotesSearch } from './components/NotesSearch';

interface Props {}

const ACNotesPage: NextPage<Props> = ({}) => {
  return (
    <ContentLayout title={'Notes'}>
      <ActivityCenterLayout
        controllers={undefined}
        seachForm={<NotesSearch />}
        listComponent={<NotesList />}
        activeElement={<NotesDetailCard />}
        activeElementClass='pl-0'
      />
    </ContentLayout>
  );
};

export default ACNotesPage;
