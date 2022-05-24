import React from "react";
import StorageKeys from "../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const PersistCache = async (itemsList, user) => {
  const patients = itemsList?.patients;
  const districts = itemsList?.districts;
  const provinces = itemsList?.provinces;
  const facilities = itemsList?.facilities;
  const servicesOffered = itemsList?.serviceOffereds;
  const assessments = itemsList?.assessments;
  const positions = itemsList?.positions;
  const locations = itemsList?.locations;
  const hivServicesReq = itemsList?.hivStiServicesReq;
  const srhServicesReq = itemsList?.srhReq;
  const tbServicesReq = itemsList?.tbReq;
  const psychoServicesReq = itemsList?.psychReq;
  const labServicesReq = itemsList?.laboratoryReq;
  const legalServicesReq = itemsList?.legalReq;
  const oiServicesReq = itemsList?.oiArtReq;
  const userFull = itemsList?.currentUser;
  const reasons = itemsList?.reasonForNotReachingOLevels;
  const education = itemsList?.educations;
  const educationLevel = itemsList?.educationLevels;
  const relationship = itemsList?.relationships;
  const supportGroups = itemsList?.supportGroups;
  const referer = itemsList?.referers;
  const tbSymptoms = itemsList?.tbSymptoms;

  await AsyncStorage.setItem(
    StorageKeys.patientListKey,
    JSON.stringify(patients)
  );

  await AsyncStorage.setItem(
    StorageKeys.hivStiServicesReqKey,
    JSON.stringify(hivServicesReq)
  );

  await AsyncStorage.setItem(
    StorageKeys.srhReqKey,
    JSON.stringify(srhServicesReq)
  );

  await AsyncStorage.setItem(
    StorageKeys.tbReqKey,
    JSON.stringify(tbServicesReq)
  );

  await AsyncStorage.setItem(
    StorageKeys.psychReqKey,
    JSON.stringify(psychoServicesReq)
  );

  await AsyncStorage.setItem(
    StorageKeys.laboratoryReqKey,
    JSON.stringify(labServicesReq)
  );

  await AsyncStorage.setItem(
    StorageKeys.legalReqKey,
    JSON.stringify(legalServicesReq)
  );

  await AsyncStorage.setItem(
    StorageKeys.oiArtReqKey,
    JSON.stringify(oiServicesReq)
  );

  await AsyncStorage.setItem(
    StorageKeys.facilitiesKey,
    JSON.stringify(facilities)
  );

  await AsyncStorage.setItem(
    StorageKeys.districtListKey,
    JSON.stringify(districts)
  );

  await AsyncStorage.setItem(
    StorageKeys.provinceListKey,
    JSON.stringify(provinces) || ""
  );

  await AsyncStorage.setItem(
    StorageKeys.servicesOfferedKey,
    JSON.stringify(servicesOffered) || ""
  );

  await AsyncStorage.setItem(
    StorageKeys.assessmentsKey,
    JSON.stringify(assessments) || ""
  );

  await AsyncStorage.setItem(
    StorageKeys.locationsKey,
    JSON.stringify(locations) || ""
  );

  await AsyncStorage.setItem(
    StorageKeys.positionsKey,
    JSON.stringify(positions) || ""
  );

  await AsyncStorage.setItem(
    StorageKeys.currentUserKey,
    JSON.stringify(userFull) || ""
  );

  await AsyncStorage.setItem(
    StorageKeys.reasonForNotReachingOLevelKey,
    JSON.stringify(reasons) || ""
  );

  await AsyncStorage.setItem(
    StorageKeys.educationKey,
    JSON.stringify(education) || ""
  );

  await AsyncStorage.setItem(
    StorageKeys.educationLevelKey,
    JSON.stringify(educationLevel) || ""
  );

  await AsyncStorage.setItem(
    StorageKeys.relationshipKey,
    JSON.stringify(relationship) || ""
  );

  await AsyncStorage.setItem(
    StorageKeys.supportGroupKey,
    JSON.stringify(supportGroups) || ""
  );

  await AsyncStorage.setItem(
    StorageKeys.refererKey,
    JSON.stringify(referer) || ""
  );

  await AsyncStorage.setItem(
    StorageKeys.tbSymptomsKey,
    JSON.stringify(tbSymptoms) || ""
  );

  await AsyncStorage.setItem(StorageKeys.userKey, JSON.stringify(user));
};

export default PersistCache;
