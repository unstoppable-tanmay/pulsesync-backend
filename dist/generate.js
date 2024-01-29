"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getRandomContinuousValue = (previousValue, maxChange) => {
    const randomChange = (Math.random() - 0.5) * maxChange;
    return Math.max(0, previousValue + randomChange);
};
const getRandomActivityType = (previousType) => {
    const allActivityTypes = ["running", "walking", "cycling", "sleeping"];
    const filteredTypes = previousType ? allActivityTypes.filter(type => type !== previousType) : allActivityTypes;
    const randomIndex = Math.floor(Math.random() * filteredTypes.length);
    return filteredTypes[randomIndex];
};
const generateRandomFitnessDataForDevice = (deviceId, timeGap) => __awaiter(void 0, void 0, void 0, function* () {
    let timestamp = new Date();
    let previousActivityType;
    let previousLocation = { latitude: 37.7749, longitude: -122.4194 };
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
        const fitnessData = {
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
        yield new Promise(resolve => setTimeout(resolve, timeGap));
        timestamp = new Date();
        previousActivityType = activityType;
        previousLocation = location;
    }
});
// Example usage:
const deviceId = "fitness_watch_123";
const timeGap = 1000; // Time gap in milliseconds
generateRandomFitnessDataForDevice(deviceId, timeGap);
