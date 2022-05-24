import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import StepIndicator from "react-native-step-indicator";
import Colors from "../config/Colors";

/**
 * Formik form wizard engine. This component contains the logic to switch the component views, setting the initial values for each view,
 * its validation schema, as well as managing state for each view.
 * @param {object} steps - an object where key is anything numbers, strings, etc and the value is the Component reference eg {0: ExampleComponent}.
 * @param {Array} initialValues - an array of objects where the objects are corresponding to the steps
 * @param {Array} validationSchema - a yup object array containing corrsponding validation objects for each step
 * @param {Array} stepLabels - an array of strings with description for each step( this will appear under steps indicator on each step)
 * @param {function} onSubmit - a function which collects all the values when user hits submit
 * @param {object} mergedValues - the object collecting all the data as user goes through the steps. It has to be a state variable.
 * @param {function} setMergedValues - a function that sets the state variable mergedValues.
 * @returns current view depending on the step the user is on.
 * @author Manatsa Chinyeruse <manatsachinyeruse@gmail.com>
 */
export default function FormikStepper({
  steps,
  initialValues,
  validationSchema,
  stepLabels,
  onSubmit,
  mergedValues,
  setMergedValues,
}) {
  const [currentStep, setCurrentStep] = useState(0);

  let currentInitValues = initialValues[currentStep];
  const currentValidationSchema = validationSchema[currentStep];

  const isFirstStep = () => {
    return currentStep === 0;
  };

  const submit = currentStep >= initialValues.length - 1 ? true : false;

  // if (!submit) {
  //   const keys = Object.keys(currentInitValues);
  //   keys.forEach((key) => {
  //     const initVal = currentInitValues[key];
  //     const currentVal = mergedValues[key];
  //     currentInitValues[key] = currentVal ? currentVal : initVal;
  //   });
  // }

  const onNextStep = (value) => {
    let mVals = { ...mergedValues, ...value };
    setMergedValues(mVals);
    if (submit) {
      onSubmit(mVals, setCurrentStep);
      setCurrentStep(0);
    } else {
      let nextStep = currentStep + 1;
      setCurrentStep(nextStep);
    }
  };

  const numberOfSteps = Object.keys(steps).length;

  const onBack = () => {
    if (!isFirstStep()) {
      let previousStep = currentStep - 1;
      setCurrentStep(previousStep);
    }
  };

  const currentStepComponent = steps[currentStep];

  const customStyles = {
    // stepIndicatorSize: 25,
    // currentStepIndicatorSize: 30,
    // separatorStrokeWidth: 3,
    // currentStepStrokeWidth: 5,
    // stepStrokeCurrentColor: Colors.primary,
    // stepStrokeWidth: 3,
    // stepStrokeFinishedColor: Colors.bluish,
    stepStrokeUnFinishedColor: "#aaaaaa",
    //separatorFinishedColor: Colors.bluish,
    separatorUnFinishedColor: "#aaaaaa",
    //stepIndicatorFinishedColor: "#fe7013",
    stepIndicatorUnFinishedColor: Colors.medium,
    // stepIndicatorCurrentColor: "#ffffff",
    // stepIndicatorLabelFontSize: 13,
    // currentStepIndicatorLabelFontSize: 13,
    // stepIndicatorLabelCurrentColor: "#fe7013",
    // stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: Colors.light,
    //labelColor: Colors.primary,
    labelSize: 13,
    //currentStepLabelColor: "#fe7013",
  };

  return (
    <>
      <View style={styles.stepperContainer}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentStep}
          stepCount={numberOfSteps}
          labels={stepLabels}
        />
      </View>
      <ScrollView style={styles.container}>
        {React.createElement(
          currentStepComponent,
          {
            initValues: currentInitValues,
            validationSchema: currentValidationSchema,
            onNextStep: onNextStep,
            onBack: onBack,
          },
          null
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 15,
  },
  stepperContainer: {
    width: "100%",
    borderBottomColor: Colors.primary,
    borderBottomWidth: 8,
    borderRadius: 30,
  },
});
