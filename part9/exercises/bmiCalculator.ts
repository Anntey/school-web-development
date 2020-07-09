const calculateBmi = (height: number, weight: number) : string => {
  const bmi: number = weight / ((height*height) / 10000);
  
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi > 25) {
    return "Overweight";
  } else {
    return 'Normal (healthy weight)';
  }
};

// const heightInput = Number(process.argv[2]);
// const weightInput = Number(process.argv[3]);

// console.log(calculateBmi(heightInput, weightInput));

export default calculateBmi;