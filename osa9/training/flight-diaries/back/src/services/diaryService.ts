import diaryData from '../../data/diaryentries';
import { 
  DiaryEntry,
  NewDiaryEntry,
  NonSensitiveDiaryEntry
} from '../types';

const diaries: Array<DiaryEntry> = diaryData;

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const getNonSensitiveDiaryEntries = (): Array<NonSensitiveDiaryEntry> => {
  return diaries.map(({id, date, weather, visibility}) => (
      {id, date, weather, visibility}
    )
  );
};

const addEntry = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  getNonSensitiveDiaryEntries,
  addEntry
};