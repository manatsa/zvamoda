import { Easing, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../../utils/StorageKeys";
import SummaryTable2 from "./SummaryTable2";
import ShowUserInfo from "./ShowUserInfo";
import AppCombinedRotateScreenCenter from "../../components/animatedContainers/AppCombinedRotateScreenCenter";
import TableView from "../../components/wrappers/TableView";
import Colors from "../../config/Colors";
import AppFlipXScreenCenter from "../../components/animatedContainers/AppFlipXScreenCenter";

export default function SummaryIndicators() {
  const [newPatients, setNewPatients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [vls, setVls] = useState([]);
  const [mhs, setMHs] = useState([]);
  const [tbs, setTBs] = useState([]);
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);

  const getData = async () => {
    const conts = await AsyncStorage.getItem(StorageKeys.contacts);
    conts ? setContacts(JSON.parse(conts)) : null;
    const newP = await AsyncStorage.getItem(StorageKeys.newPatientsKey);
    newP ? setNewPatients(JSON.parse(newP)) : null;
    const refs = await AsyncStorage.getItem(StorageKeys.referrals);
    refs ? setReferrals(JSON.parse(refs)) : null;
    const vl = await AsyncStorage.getItem(StorageKeys.vls);
    vl ? setVls(JSON.parse(vl)) : null;
    const mh = await AsyncStorage.getItem(StorageKeys.mhScreeningKey);
    mh ? setMHs(JSON.parse(mh)) : null;
    const tb = await AsyncStorage.getItem(StorageKeys.tbScreeningKey);
    tb ? setTBs(JSON.parse(tb)) : null;
    const u = await AsyncStorage.getItem(StorageKeys.currentUserKey);

    u ? setUser(JSON.parse(u)) : null;
  };

  useEffect(async () => {
    await getData();
  }, []);

  const headers = [
    { field: "indicator", title: "INDICATOR", size: "50%" },
    { field: "value", title: "VALUE", size: "50%" },
  ];
  const data = [
    { indicator: "New Patients", value: newPatients.length },
    { indicator: "Contacts", value: contacts.length },
    { indicator: "Referrals", value: referrals.length },
    { indicator: "VL/CD4", value: vls.length },
    { indicator: "MH Screening", value: mhs.length },
    { indicator: "TB Screening", value: tbs.length },
  ];

  return (
    <AppFlipXScreenCenter duration={1500} easing={Easing.cubic}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: show ? "space-between" : "flex-end",
          paddingHorizontal: 40,
        }}
      ></View>

      <ShowUserInfo user={user} />

      <TableView
        title="Indicator Summary"
        headers={headers}
        data={data}
        headerColor={Colors.bluish}
        paginate={false}
        alignColumns={"flex-start"}
        firstColumnColor={Colors.secondary}
        padding={0}
      />
    </AppFlipXScreenCenter>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
