import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AppForm, AppFormField } from "../../components/form";
import AppButtonSmall from "../../components/wrappers/AppButtonSmall";
import AppSubmitButtonSmall from "../../components/form/AppSubmitButtonSmall";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../../utils/StorageKeys";
import AppFormPicker from "../../components/form/AppFormPicker";
import YesNo from "../../models/YesNo";

export default function NewClientContactDetailsStep({
  initValues,
  validationSchema,
  onNextStep,
  onBack,
}) {
  const [supportGroups, setSupportGroups] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [user, setUser] = useState(null);
  const [ownMobile, setOwnMobile] = useState("0");
  const [ownSecondaryMobile, setOwnSecondaryMobile] = useState("0");

  let filteredSupportGroups = [];
  let filteredFacilities = [];

  const [formattedSupportGroups, setFormattedSupportGroups] = useState(
    filteredSupportGroups
  );
  const [formattedFacilities, setFormattedFacilities] =
    useState(filteredFacilities);
  const [formattedRelations, setFormattedRelations] = useState([]);

  const getData = async () => {
    try {
      const facs = await AsyncStorage.getItem(StorageKeys.facilitiesKey);
      let fs = JSON.parse(facs);

      const supports = await AsyncStorage.getItem(StorageKeys.supportGroupKey);
      let ds = JSON.parse(supports);

      const rel = await AsyncStorage.getItem(StorageKeys.relationshipKey);
      let rs = JSON.parse(rel);

      const use = await AsyncStorage.getItem(StorageKeys.currentUserKey);
      let u = JSON.parse(use);
      setUser(u);

      setFormattedFacilities(
        fs.map((e) => {
          const fac = { label: e.name, value: e.id };
          //console.log("Facility >>> ", fac, "\n");
          return fac;
        })
      );

      setFormattedSupportGroups(
        ds.map((e) => {
          return { label: e.name, value: e.id };
        })
      );

      setFormattedRelations(
        rs.map((r) => {
          return { label: r.name, value: r.id };
        })
      );

      if (!u?.level) {
        initValues["primaryClinic"] = u?.facilityId;
        //console.log("Primary Clinic : ", initValues["primaryClinic"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AppForm
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onNextStep}
    >
      <AppFormField
        name="address"
        label={"Client's Address"}
        placeholder={"address"}
      />

      {user?.userLevel === "DISTRICT" && (
        <AppFormPicker
          icon={"none"}
          items={formattedFacilities}
          label={"Primary Clinic"}
          name="primaryClinic"
        />
      )}

      <AppFormPicker
        icon={"none"}
        items={formattedSupportGroups}
        label={"Support Group"}
        name="supportGroup"
      />

      <AppFormField
        name="mobileNumber"
        label={"Client's Mobile Number"}
        placeholder={"mobile number"}
      />

      <AppFormPicker
        icon={"none"}
        items={YesNo}
        label={"Own Mobile Phone"}
        name="mobileOwner"
        callback={setOwnMobile}
      />

      {ownMobile === "1" && (
        <>
          <AppFormField
            name="ownerName"
            label={"Mobile Owner's name"}
            placeholder={"mobile owner's name"}
          />

          <AppFormPicker
            icon={"none"}
            items={formattedRelations}
            label={"Relation to Owner"}
            name="mobileOwnerRelation"
          />
        </>
      )}

      <AppFormField
        name="secondaryMobileNumber"
        label={"Secondary Mobile Number"}
        placeholder={"secondary mobile number"}
      />

      <AppFormPicker
        icon={"none"}
        items={YesNo}
        label={"Own Secondary Mobile Number"}
        name="ownSecondaryMobile"
        callback={setOwnSecondaryMobile}
      />

      {ownSecondaryMobile === "1" && (
        <>
          <AppFormField
            name="secondaryMobileOwnerName"
            label={"Secondary Mobile Owner's name"}
            placeholder={"secondary mobile owner's name"}
          />

          <AppFormPicker
            icon={"none"}
            items={formattedRelations}
            label={"Relation to Secondary Mobile Owner"}
            name="secondaryMobileownerRelation"
          />
        </>
      )}

      <View style={styles.buttonContainer}>
        <AppButtonSmall title={"Back"} onPress={onBack} />
        <AppSubmitButtonSmall title={"Next"} />
      </View>
    </AppForm>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingVertical: 40,
  },
});
