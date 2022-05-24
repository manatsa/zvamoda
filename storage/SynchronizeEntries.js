import StorageKeys from "../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SynchronizeContacts from "./SynchronizeContacts";
import SynchronizeVLCD4s from "./SynchronizeVLCD4s";
import SynchronizeReferrals from "./SynchronizeReferrals";
import SynchronizeClients from "./SynchronizeClients";
import SynchronizeMHScreening from "./SynchronizeMHScreening";
import SynchronizeTBScreening from "./SynchronizeTBScreening";

const SynchronizeEntries = async (setSyncText) => {
  const token = await AsyncStorage.getItem(StorageKeys.tokenKey);
  setSyncText("Contact sync in progress");
  const contactCode = await SynchronizeContacts(token);
  setSyncText("VL/CD4 sync in progress");
  const vlsCode = await SynchronizeVLCD4s(token);
  setSyncText("Referrals sync in progress");
  const refCode = await SynchronizeReferrals(token);
  setSyncText("MH Screening sync in progress");
  const mhCode = await SynchronizeMHScreening(token);
  setSyncText("TB Screening sync in progress");
  const tbCode = await SynchronizeTBScreening(token);
  setSyncText("New clients sync in progress");
  const clientCode = await SynchronizeClients(token);

  if (
    contactCode <= 201 &&
    vlsCode <= 201 &&
    refCode <= 201 &&
    clientCode <= 201 &&
    mhCode <= 201 &&
    tbCode <= 201
  ) {
    return 200;
  } else if (
    contactCode > 201 ||
    vlsCode > 201 ||
    refCode > 201 ||
    clientCode > 201 ||
    mhCode > 201 ||
    tbCode > 201
  ) {
    return -1;
  }
};

export default SynchronizeEntries;
