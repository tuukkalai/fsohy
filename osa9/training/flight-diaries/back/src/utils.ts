/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NewDiaryEntry, Weather, Visibility } from './types';

const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  return {
    date: parseDate(object.date),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility),
    comment: parseComment(object.comment),
  };
};

const parseComment = (comment: any): string => {
  if(!comment || !isString(comment)){
    throw new Error('Incorrect or missing comment');
  }
  return comment;
};

const parseDate = (date: any): string => {
  if(!date || !isString(date) || !isDate(date)){
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseWeather = (weather: any): Weather => {
  if(!weather || !isWeather(weather)){
    throw new Error('Incorrect or missing weather');
  }
  return weather;
};

const parseVisibility = (visibility: any): Visibility => {
  if(!visibility || !isVisibility(visibility)){
    throw new Error('Incorrect or missing visibility');
  }
  return visibility;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isWeather = (weather: any): weather is Weather => {
  return Object.values(Weather).includes(weather);
};

const isVisibility = (visibility: any): visibility is Visibility => {
  return Object.values(Visibility).includes(visibility);
};


export default toNewDiaryEntry;