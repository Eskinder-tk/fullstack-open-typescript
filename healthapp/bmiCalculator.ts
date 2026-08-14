
export const calcultateBmi = (mass: number, height: number) => {
    const result = (mass/(Math.pow(height, 2)));

    if(isNaN(Number(mass)) || isNaN(Number(height))) {
        throw new Error('Your weight and height must be numbers!');
    }

    if(height === 0 || mass === 0) {
        throw new Error("Your height nor your weight can't be 0!");
    }

    switch (true) {
        case (result < 18.5):
            return 'You are Underweight';
            break;
        case (18.5 <= result && result <= 24.9):
            return 'You are Healthy weight';
            break;
        case (25.0 <= result && result <= 29.9):
            return 'You are Overweight';
            break;
        case (result >= 30):
            return 'You are Obese';
            break;
        default:
            throw new Error('Something went wrong.');
    }
};


if (process.argv[1] === import.meta.filename) {
  // do not run this code if module is imported
    interface bmiValues {
    valueOne: number;
    valueTwo: number;
    }

    const parseArguments = (args: string[]): bmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
        valueOne: Number(args[2]),
        valueTwo: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
    };

    try {
        const { valueOne, valueTwo } = parseArguments(process.argv);
        console.log(calcultateBmi(valueOne , valueTwo));
    } catch (error) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }

}
