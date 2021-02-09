interface ExerciseResult { 
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// 9.3
interface ExerciseValues {
  trainingData: Array<number>;
  target: number;
}

const calculateExercises = (training: ExerciseValues): ExerciseResult => {
  const { target } = training;
  const periodLength: number = training.trainingData.length-1;
  const trainingDays: number = training.trainingData.filter(n => n > 0).length-1;
  const average: number = training.trainingData.reduce((a,b) => (a+b)) / periodLength;
  const success: boolean = target <= average;
  const rating: number = 3 - ( target - Math.floor(average) );
  const ratingDescription: string = rating >= 3 ? 'Awesome!' : rating >= 2 ? 'Not too bad!' : 'Maybe next week is better';
  return {  
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

// 9.2
// console.log(calculateExercises([5, 0, 2, 1.5, 2, 2, 1], 3));

export const parseInternetArguments = (args: Array<number>): ExerciseValues => {
  const parsedArgs = [];
  for (let i = 1; i < args.length; i++) {
    const arr = Number(args[i]);
    if (isNaN(arr)) throw new Error('Non-numeric argument');
    parsedArgs.push(arr);
  }
  
  return {
    trainingData: parsedArgs,
    target: Number(args[parsedArgs.length-1])
  };
};

/*
const parseArgs = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 10) throw new Error('Too many arguments. One week of training data is maximum.');

  const numOfValues: number = args.length;
  const arr: Array<number> = [];
  for(let i = 2; i < numOfValues-1; i++){
    if(!isNaN(Number(args[i]))){
      arr.push(Number(args[i]));
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  return {
    trainingData: arr,
    target: Number(args[numOfValues-1])
  };
};

try {
  const { trainingData, target } = parseArgs(process.argv);
  console.log(calculateExercises(trainingData, target));
} catch (e) {
  console.log('Error, something bad happened, message: ', e);
}
*/

export default calculateExercises;