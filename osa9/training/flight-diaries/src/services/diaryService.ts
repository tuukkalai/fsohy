import diaryData from '../../data/diaryentries';
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

const diaries: Array<DiaryEntry> = diaryData;

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const getNonSensitiveDiaryEntries = (): Array<NonSensitiveDiaryEntry> => {
  return diaries.map(({id, date, weather, visibility}) => ({id, date, weather, visibility}));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addEntry = () => {
  return [];
};

export default {
  getEntries,
  getNonSensitiveDiaryEntries,
  addEntry
};