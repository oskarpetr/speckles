"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFRenderer,
} from "@react-pdf/renderer";

export default function PDF() {
  return (
    <PDFRenderer style={{ width: "100%", height: "90vh" }}>
      <MyDocument />
    </PDFRenderer>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);
