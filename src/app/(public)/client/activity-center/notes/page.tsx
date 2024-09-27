import { NextPage } from 'next';

import ContentLayout from '@/components/layout/ContentLayout';

import { ActivityCenterLayout } from '../components/ActivityCenterLayout';
import { SearchForm } from '../notification/components/SearchForm';
import { NotesDetailCard } from './components/NotesDetailCard';
import { NotesList } from './components/NotesList';

interface Props {}

const ACNotesPage: NextPage<Props> = ({}) => {
  return (
    <ContentLayout title={'Notes'}>
      <ActivityCenterLayout
        controllers={undefined}
        seachForm={<SearchForm />}
        listComponent={<NotesList />}
        activeElement={<NotesDetailCard />}
      />
    </ContentLayout>
  );
};

export default ACNotesPage;
