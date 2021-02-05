interface bmiJson {
  weight: number;
  height: number;
  bmi: string;
}

const calculateBmi = (height: number, weight: number): bmiJson => {
  let desc: string = '';
  const bmi: number = weight / ( (height/100) ** 2 );
  switch(true){
    case (bmi < 15):
      desc = 'Very severely underweight';
      break;
    case (bmi >= 15 && bmi < 16):
      desc = 'Severely underweight';
      break;
    case (bmi >= 16 && bmi < 18.5):
      desc = 'Underweight';
      break;
    case (bmi >= 18.5 && bmi < 25):
      desc = 'Normal (healthy weight)';
      break;
    case (bmi >= 25 && bmi < 30):
      desc = 'Overweight';
      break;
    case (bmi >= 30 && bmi < 35):
      desc = 'Obese Class I (Moderately obese)';
      break;
    case (bmi >= 35 && bmi < 40):
      desc = 'Obese Class II (Severely obese)';
      break;
    case (bmi >= 40):
      desc = 'Obese Class III (Very severely obese)';
      break;
    default:
      desc = 'Malformatted parameters.'
      break;
  }
  return {
    weight,
    height,
    bmi: desc
  }
}

/*
interface argValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): argValues => {
  let height: number = 0;
  let weight: number = 0;
  
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    console.log('CLI stuff!');
    if (args.length < 4) throw 'CLI: Not enough args';
    if (args.length > 5) throw 'CLI: Too many args';
    if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) throw 'Numbers as arguments, please.';
    height = Number(args[2]);
    weight = Number(args[3]);
  } else if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    console.log('WEB stuff!');
    height = Number(args[0]);
    weight = Number(args[1]);
  } else {
    throw 'wtf';
  }
  return {
    height,
    weight
  }
}

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error:', e);
}
*/
export default calculateBmi;