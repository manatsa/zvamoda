import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../../utils/StorageKeys";
import { AppForm, AppSubmitButton } from "../../components/form";
import * as yup from "yup";
import {
  ActivityIndicator,
  DataTable,
  Divider,
  Searchbar,
} from "react-native-paper";
import AppButtonSmall from "../../components/wrappers/AppButtonSmall";
import AppText from "../../components/wrappers/AppText";
import Colors from "../../config/Colors";
import GetFromApi from "../../api/GetAxiosClient";
import TableView from "../../components/wrappers/TableView";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AppFlipYScrollViewScreen from "../../components/animatedContainers/AppFlipYScrollViewScreen";
import AppDatePicker from "../../components/wrappers/AppDatePicker";

const optionsPerPage = [3, 5, 10, 20, 50, 100];
export default function FacilityManagement({ route, navigation }) {
  const facilityId = route?.params?.facility || null;

  const [facilityData, setFacilityData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState();
  const [showForm, setShowForm] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[2]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [progress, setProgress] = useState(0);

  useEffect(async () => {
    const uString = await AsyncStorage.getItem(StorageKeys.currentUserKey);
    setUser(JSON.parse(uString));
    const token = await AsyncStorage.getItem(StorageKeys.tokenKey);
    setToken(token);
    setPage(0);
  }, [itemsPerPage]);

  const statsInitValues = {
    start: new Date(),
    end: new Date(),
  };

  const statsValidationSchema = yup.object().shape({
    start: yup
      .date()
      .typeError(
        "Invalid date. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each"
      )
      .required("Start date cannot be empty!"),
    end: yup
      .date()
      .typeError(
        "Invalid date. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each"
      )
      .required("End date cannot be empty!"),
  });

  const onChangeSearch = (query) => setSearchQuery(query);

  const onSubmit = async (values) => {
    const { start, end } = values;
    const startFinal = new Date(String(start))?.toISOString()?.slice(0, 10);
    const endFinal = new Date(String(end))?.toISOString()?.slice(0, 10);
    setShowForm(false);
    setFetching(true);

    try {
      if (facilityId && facilityId !== "") {
        const segment = `/patient/get-facility-statistics/?facilityID=${facilityId}&start=${startFinal}&end=${endFinal}`;
        const facilityData = await GetFromApi(token, segment).catch((error) => {
          Alert.alert("ERROR FECTHING DATA", error.toJSON().message);
        });
        setFacilityData(facilityData?.data);
      } else {
        const segment = `/patient/get-district-statistics/?districtId=${user?.district?.id}&start=${startFinal}&end=${endFinal}`;
        const districtData = await GetFromApi(token, segment).catch((error) => {
          Alert.alert("ERROR FECTHING DATA", error.toJSON().message);
        });
        //console.log(districtData.data);
        setDistrictData(districtData?.data);
      }
    } finally {
      setFetching(false);
    }
  };

  useEffect(async () => {
    const token = await AsyncStorage.getItem(StorageKeys.tokenKey);
    setToken(token);
  });
  return showForm ? (
    <AppFlipYScrollViewScreen>
      <AppText
        style={{ color: Colors.bluish, textDecorationLine: "underline" }}
      >
        Facility Statistics
      </AppText>
      <Divider />
      <AppForm
        initialValues={statsInitValues}
        validationSchema={statsValidationSchema}
        onSubmit={onSubmit}
      >
        {/* <AppDateComponent name={"start"} label={"Start Date"} /> */}
        <AppDatePicker name={"start"} label={"Start Date"} />
        {/* <AppDateComponent name={"end"} label={"Start Date"} /> */}
        <AppDatePicker name={"end"} label={"End Date"} />
        <AppSubmitButton title={"Get Data"} />
      </AppForm>
    </AppFlipYScrollViewScreen>
  ) : facilityId ? (
    <AppFlipYScrollViewScreen>
      <AppText
        style={{ color: Colors.bluish, textDecorationLine: "underline" }}
      >{`Facility Statistics`}</AppText>

      <View
        style={{
          width: "100%",

          alignItems: fetching ? "flex-start" : "stretch",
        }}
      >
        {fetching && (
          <ActivityIndicator
            size={"large"}
            animating={true}
            color={Colors.greenish}
          />
        )}
        <AppButtonSmall
          title={"Back"}
          onPress={() => {
            setShowForm(true);
          }}
        />
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Indicator</DataTable.Title>
          <DataTable.Title numeric>Value</DataTable.Title>
        </DataTable.Header>

        {facilityData &&
          Object?.keys(facilityData).map((key, index) => {
            return (
              <DataTable.Row key={index}>
                <DataTable.Cell>{key}</DataTable.Cell>
                <DataTable.Cell numeric>{facilityData[key]}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
      </DataTable>
    </AppFlipYScrollViewScreen>
  ) : (
    <AppFlipYScrollViewScreen>
      <View
        style={{
          // backgroundColor: Colors.bluish,
          width: "100%",
          flexDirection: "row",
          textDecorationLine: "underline",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setShowForm(true);
          }}
          style={{
            backgroundColor: Colors.light,
            paddingHorizontal: 20,
            elevation: 5,
            margin: 5,
          }}
        >
          <FontAwesome
            name="long-arrow-left"
            size={30}
            color={Colors.primary}
            style={{ paddingVertical: 10 }}
          />
        </TouchableOpacity>

        <Searchbar
          style={{
            width: fetching ? "50%" : "75%",
            marginVertical: 3,
            height: 50,
          }}
          placeholder="Search Facility"
          onChangeText={onChangeSearch}
          value={searchQuery}
          autoComplete={true}
          clearButtonMode={"always"}
          iconColor={Colors.primary}
          returnKeyLabel={"Search"}
        />

        {fetching && (
          <ActivityIndicator
            size={"large"}
            animating={true}
            color={Colors.greenish}
          />
        )}
      </View>

      <TableView
        headers={[
          { field: "facility", title: "Facility", size: "23%" },
          { field: "patients", title: "Reg", size: "12%" },
          { field: "contacts", title: "Cont", size: "16%" },
          { field: "mhScreenings", title: "MHs", size: "12%" },
          { field: "tbScreenings", title: "TBs", size: "12%" },
          { field: "referrals", title: "Ref", size: "12%" },
          { field: "vls", title: "VLs", size: "10%" },
        ]}
        title={"DISTRICT SUMMARY"}
        data={
          (searchQuery
            ? districtData.filter((d) => {
                return d.facility
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
              })
            : districtData) || []
        }
        pageOptions={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        page={page}
        setPage={setPage}
        paginate={true}
        headerColor={Colors.primary}
        firstColumnColor={Colors.bluish}
        highlightRows={true}
        highlightColumns={false}
        padding={true}
        exportable={false}
        property
        setFetching={setFetching}
        setProgress={setProgress}
      />
    </AppFlipYScrollViewScreen>
  );
}

const styles = StyleSheet.create({});
