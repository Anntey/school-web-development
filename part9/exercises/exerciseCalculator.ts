interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (excHours : number[], targetHours: number) : Result => {
  const lenPeriod: number = excHours.length;

  if (lenPeriod < 2) throw new Error('not enough arguments');

  const trainDays: number = excHours.filter(h => h > 0).length;

  let avgHours: number;
  try {
    avgHours = excHours.reduce((acc, val) => acc + val, 0) / lenPeriod;
  } catch (error) {
     throw new Error('something went wrong');
  }

  const wasSuccessful: boolean = avgHours >= targetHours ? true : false;
  const rating: number = Math.ceil(avgHours / 12 * 3);

  let ratingDesc: string;
  if (rating === 1) {
    ratingDesc = 'not too bad but could be better';
  } else if (rating === 2) {
    ratingDesc = 'very good';
  } else {
    ratingDesc = 'excellent, could not be better';
  }
  
  return {
      periodLength: lenPeriod,
      trainingDays: trainDays,
      success: wasSuccessful,
      rating: rating,
      ratingDescription: ratingDesc,
      target: targetHours,
      average: avgHours
  };
};

// const targetInput: number = process.argv[2];
// const hoursInput: number[] = process.argv.slice(3, process.argv.length).map(arg => Number(arg));
// console.log(calculateExercises(hoursInput, targetInput));

export default calculateExercises;