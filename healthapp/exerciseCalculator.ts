interface AnalysisValues {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calcultateExercises = (Days: number[] , target: number): AnalysisValues => {
    let sum = 0;
    let trainingDays = 0;
    let ratingDescription: string;
    let rating: number;
    const periodLength = Days.length;
    
    for (let i = 0; i < Days.length; i++) {
        sum += Days[i];
        if (Days[i] !== 0) {
            trainingDays += 1;
        }
    }

    if (Days.length === 0 || target === 0) {
        throw new Error("The number of days or your target can't be 0.");
    }
    const average = sum/Days.length;

    let success: boolean;

    switch(true) {
        case (average > target):
            success = true;
            ratingDescription = 'Exceeded your expectation good job and next time, Aim Higher!';
            rating = 3;
            break;
        
        case (average === target) :
            success = true;
            ratingDescription = 'Met your Goals, congratulations!';
            rating = 2.9;
            break;

        case (average < target && (average + 0.3) >= target) :
            success = false;
            ratingDescription = "Not quite there, but Close keep working.";
            rating = 2;
            break;
        
        case (average < target && (average + 0.3) < target) :
            success = false;
            ratingDescription = 'Not good.';
            rating = 1;
            break;
        default:
            throw new Error('something went wrong.');
        
    }

    return (
         {
            periodLength: periodLength,
            trainingDays: trainingDays,
            success: success,
            rating: rating,
            ratingDescription: ratingDescription,
            target: target,
            average: average  
        }
    ); 
};

if (process.argv[1] === import.meta.filename) {
interface CalculatorValues {
  value1: number[];
  value2: number;
}

const parseArgumentss = (args: string[]): CalculatorValues => {
  if (args.length !== 4) {
    throw new Error('Exactly 2 arguments are required');
  }

  let value1: unknown;

  try {
    value1 = JSON.parse(args[2]);
  } catch {
    throw new Error('First argument must be a valid array');
  }

  const value2 = Number(args[3]);

  if (
    !Array.isArray(value1) ||
    !value1.every((value) => typeof value === 'number')
  ) {
    throw new Error('First argument must be an array of numbers');
  }

  if (Number.isNaN(value2)) {
    throw new Error('Second argument must be a number');
  }

  return {
    value1,
    value2
  };
};


try {
    const {value1 , value2} = parseArgumentss(process.argv);
    console.log(calcultateExercises(value1 , value2));
} catch (error) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
};