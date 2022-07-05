import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Accordion from "react-native-collapsible/Accordion";
import TableView from "./wrappers/TableView";
import Colors from "../config/Colors";
import ListSeparator from "./ListSeparator";
import StorageKeys from "../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

const pageOptions = [3, 5, 10, 20, 50];
export default AppDistrictAccordion = ({ items, district }) => {
  const [activeSections, setActiveSections] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [multipleSelect, setMultiple] = useState(false);
  const [data, setData] = useState(items);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(pageOptions[2]);
  const [facilites, setFacilities] = useState([]);
  const mkeys = Object.keys(items);

  useEffect(async () => {
    const uFacility = await AsyncStorage.getItem(StorageKeys.facilitiesKey);
    setFacilities(JSON.parse(uFacility));
  }, []);

  const CONTENT = mkeys.map((k) => {
    return {
      title: k,
      content:
        k === "patients" ? (
          <TableView
            itemsPerPage={itemsPerPage}
            page={page}
            setPage={setPage}
            paginate={true}
            fontSize={10}
            title={"New Patients Table"}
            setItemsPerPage={setItemsPerPage}
            highlightRows={true}
            highlightColumns={false}
            pageOptions={pageOptions}
            padding={false}
            data={data[k]}
            property={"patients"}
            headers={[
              {
                field: "lastName",
                title: "Last Name",
                size: 100,
                padding: 10,
              },
              {
                field: "firstName",
                title: "First Name",
                size: 100,
                padding: 10,
              },
              { field: "dateCreated", title: "Entered Date", size: 80 },
              {
                field: "eac",
                title: "EacDone",
                size: 40,
              },
              { field: "gender", title: "Gender", size: 60 },
              {
                field: "dateOfBirth",
                title: "DOB",
                size: 80,
              },
              {
                field: "oINumber",
                title: "OI Art Number",
                size: 100,
              },
              {
                field: "dateJoined",
                title: "Next App Date",
                size: 100,
                padding: 10,
              },
            ]}
          />
        ) : k === "contacts" ? (
          <TableView
            itemsPerPage={itemsPerPage}
            page={page}
            setPage={setPage}
            paginate={true}
            fontSize={10}
            title={"Contacts Table"}
            setItemsPerPage={setItemsPerPage}
            highlightRows={true}
            highlightColumns={false}
            pageOptions={pageOptions}
            padding={false}
            data={data[k]}
            headers={[
              {
                field: "contactDate",
                title: "Contact Date",
                size: 80,
                padding: 10,
              },
              {
                field: "pname",
                title: "Patient Name",
                size: 150,
                padding: 10,
              },
              { field: "dateCreated", title: "Entered Date", size: 80 },
              {
                field: "eac",
                title: "EacDone",
                size: 40,
              },
              { field: "contactMadeBy", title: "Contacted By", size: 150 },
              {
                field: "careLevelAfterAssessment",
                title: "CareLevel",
                size: 150,
              },
              {
                field: "lastClinicAppointmentDate",
                title: "Last App Date",
                size: 150,
              },
              {
                field: "nextClinicAppointmentDate",
                title: "Next App Date",
                size: 150,
                padding: 10,
              },
            ]}
          />
        ) : k === "referrals" ? (
          <TableView
            itemsPerPage={itemsPerPage}
            page={page}
            setPage={setPage}
            paginate={true}
            title={"Referrals Table"}
            setItemsPerPage={setItemsPerPage}
            highlightRows={true}
            fontSize={10}
            highlightColumns={false}
            pageOptions={pageOptions}
            padding={false}
            data={data[k]}
            headers={[
              {
                field: "referralDate",
                title: "ReferralDate ",
                size: 100,
                padding: 10,
              },
              {
                field: "pname",
                title: "Patient Name",
                size: 150,
                padding: 10,
              },
              { field: "dateCreated", title: "Entered", size: 100 },
              { field: "organisation", title: "Organization", size: 100 },
              {
                field: "expectedVisitDate",
                title: "VisitDate",
                size: 150,
              },
              { field: "dateAttended", title: "DateAttended", size: 100 },
              {
                field: "attendingOfficer",
                title: "Att Officer",
                size: 150,
              },
              {
                field: "designation",
                title: "Designation",
                size: 100,
              },
            ]}
          />
        ) : k === "mentalHealthScreenings" ? (
          <TableView
            itemsPerPage={itemsPerPage}
            page={page}
            setPage={setPage}
            paginate={true}
            fontSize={10}
            title={"MH Screening Table"}
            setItemsPerPage={setItemsPerPage}
            highlightRows={true}
            highlightColumns={false}
            pageOptions={pageOptions}
            padding={false}
            data={data[k]}
            headers={[
              {
                field: "dateScreened",
                title: "Screened",
                size: 100,
                padding: 10,
              },
              {
                field: "pname",
                title: "Patient Name",
                size: 150,
                padding: 10,
              },
              { field: "dateCreated", title: "Entered", size: 100 },
              {
                field: "identifiedRisks",
                title: "Risks",
                size: 300,
              },

              { field: "supports", title: "Support", size: 300, padding: 10 },
            ]}
          />
        ) : k === "tbIpts" ? (
          <TableView
            itemsPerPage={itemsPerPage}
            page={page}
            setPage={setPage}
            paginate={true}
            title={"TB/TPT Table"}
            setItemsPerPage={setItemsPerPage}
            highlightRows={true}
            fontSize={10}
            highlightColumns={false}
            pageOptions={pageOptions}
            padding={false}
            data={data[k]}
            headers={[
              { field: "dateScreened", title: "Screened", size: 80 },
              {
                field: "pname",
                title: "Patient Name",
                size: 150,
                padding: 10,
              },
              { field: "dateCreated", title: "Entered", size: 80 },
              {
                field: "identifiedWithTb",
                title: "Risk",
                size: 40,
              },
              { field: "symptoms", title: " TB Symptoms", size: 300 },
              {
                field: "referredForInvestigation",
                title: "Investigation",
                size: 40,
              },
              { field: "eligibleForIpt", title: "TPT Eligible", size: 40 },
              { field: "onTBTreatment", title: "onTreatment", size: 40 },
              {
                field: "dateStartedTreatment",
                title: "Strated Treatment",
                size: 80,
              },
              { field: "onIpt", title: "On TPT", size: 40 },
              { field: "dateStartedIpt", title: "Started TPT", size: 80 },
              { field: "startedOnIpt", title: "Started On TPT", size: 40 },
              { field: "dateStartedOnIpt", title: "Started On TPT", size: 80 },
            ]}
          />
        ) : k === "investigationTests" ? (
          <TableView
            itemsPerPage={itemsPerPage}
            page={page}
            setPage={setPage}
            paginate={true}
            fontSize={10}
            title={"VL/CD4 Table"}
            setItemsPerPage={setItemsPerPage}
            highlightRows={true}
            highlightColumns={false}
            pageOptions={pageOptions}
            padding={false}
            data={data[k]}
            headers={[
              { field: "dateTaken", title: "Date Taken", size: 100 },
              {
                field: "pname",
                title: "Patient Name",
                size: 150,
                padding: 10,
              },
              { field: "dateCreated", title: "Entered Date", size: 100 },
              {
                field: "nextTestDate",
                title: "Next Test Date",
                size: 100,
              },
              { field: "result", title: "Result", size: 80 },
              { field: "tnd", title: "TND", size: 40 },
              { field: "source", title: "Source", size: 100 },
              { field: "testType", title: "Test Type", size: 100 },
            ]}
          />
        ) : null,
    };
  });

  // const toggleExpanded = () => {
  //   console.log(data);
  //   setCollapsed(!collapsed);
  // };

  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>
          {section.title === "investigationTests"
            ? "VL/CD4 Count"
            : section.title === "tbIpts"
            ? "TB/TPT Screening"
            : section.title === "mentalHealthScreenings"
            ? "Mental Health Screening"
            : section.title}
        </Text>
        <ListSeparator
          color={isActive ? Colors.light : Colors.dodger}
          size={isActive ? 0.5 : 1.5}
        />
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text animation={isActive ? "bounceIn" : undefined}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Line Items For :: ${facility}`}</Text>
      <ScrollView contentContainerStyle={{}} horizontal={true}>
        <View style={{ flex: 1 }}>
          <Accordion
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={renderHeader}
            renderContent={renderContent}
            duration={400}
            onChange={setSections}
            renderAsFlatList={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  header: {
    backgroundColor: "#cccccc",
    padding: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 5,
    textTransform: "uppercase",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
  },
  active: {
    backgroundColor: "#ccc",
  },
  inactive: {
    backgroundColor: "#eee",
  },
  selectors: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  selector: {
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
});
