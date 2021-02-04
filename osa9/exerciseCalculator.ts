interface Result { 
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (training: Array<number>, target: number): Result => {
  const periodLength: number = training.length;
  const trainingDays: number = training.filter(n => n > 0).length;
  const average: number = training.reduce((a,b) => (a+b)) / periodLength;
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
  }
}

console.log(calculateExercises([5, 0, 2, 1.5, 2, 2, 1], 3));