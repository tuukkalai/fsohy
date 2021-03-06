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
  const { target, trainingData } = training;
  console.log('target', target);
  console.log('training data', trainingData);
  const periodLength: number = trainingData.length;
  const trainingDays: number = trainingData.filter(n => n > 0).length;
  const average: number = trainingData.reduce((a,b) => (a+b)) / periodLength;
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

export const parseWebArguments = (args: Array<string>): ExerciseValues => {
  const parsedArgs = [];
  for (let i = 0; i < args[0].length; i++) {
    const el = Number(args[0][i]);
    if (isNaN(el)) throw new Error('Non-numeric argument');
    parsedArgs.push(el);
  }

  if(isNaN(Number(args[1]))) throw new Error('Non-numeric target');
  
  return {
    trainingData: parsedArgs,
    target: Number(args[1])
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