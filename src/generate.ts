interface FitnessData {
    deviceId: string;
    timestamp: string;
    heartRate: number;
    stepCount: number;
    sleepDuration: number;
    activityType: string;
    caloriesBurned: number;
    location: {
      latitude: number;
      longitude: number;
    };
  }
  
  const getRandomContinuousValue = (previousValue: number, maxChange: number): number => {
    const randomChange = (Math.random() - 0.5) * maxChange;
    return Math.max(0, previousValue + randomChange);
  };
  
  const getRandomActivityType = (previousType?: string): string => {
    const allActivityTypes = ["running", "walking", "cycling", "sleeping"];
    const filteredTypes = previousType ? allActivityTypes.filter(type => type !== previousType) : allActivityTypes;
    const randomIndex = Math.floor(Math.random() * filteredTypes.length);
    return filteredTypes[randomIndex];
  };
  
  const generateRandomFitnessDataForDevice = async (deviceId: string, timeGap: number): Promise<void> => {
    let timestamp = new Date();
    let previousActivityType: string | undefined;
    let previousLocation: { latitude: number, longitude: number } = { latitude: 37.7749, longitude: -122.4194 };
  
    while (true) {
      const heartRate = getRandomContinuousValue(75, 5);
      
      // Ensure step count doesn't go below the previous value
      const stepCount = Math.round(getRandomContinuousValue(previousActivityType === "sleeping" ? previousLocation.latitude * 100 : 5000, 200));
      
      const sleepDuration = getRandomContinuousValue(8, 1);
      
      // Sleeping activity should have fixed location
      const location = previousActivityType === "sleeping" ? previousLocation : {
        latitude: 37.7749 + (Math.random() - 0.5) * 0.1,
        longitude: -122.4194 + (Math.random() - 0.5) * 0.1,
      };
      
      const activityType = sleepDuration > 6 ? "sleeping" : getRandomActivityType(previousActivityType);
      
      // Calories burned depend on the activity type
      const caloriesBurned = Math.round(activityType === "sleeping" ? 50 : 300);
  
      const fitnessData: FitnessData = {
        deviceId,
        timestamp: timestamp.toISOString(),
        heartRate: Math.round(heartRate),
        stepCount: Math.max(stepCount, 0),
        sleepDuration,
        activityType,
        caloriesBurned: Math.max(caloriesBurned, 0),
        location,
      };
  
      console.log(JSON.stringify(fitnessData, null, 2));
  
      await new Promise(resolve => setTimeout(resolve, timeGap));
  
      timestamp = new Date();
      previousActivityType = activityType;
      previousLocation = location;
    }
  };
  
  // Example usage:
  const deviceId = "fitness_watch_123";
  const timeGap = 1000; // Time gap in milliseconds
  
  generateRandomFitnessDataForDevice(deviceId, timeGap);
  