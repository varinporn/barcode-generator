import {
  Document,
  Page,
  View,
  StyleSheet,
  Image,
  Text,
} from "@react-pdf/renderer"
import type { CsvData } from "../types/types"
import { getBarcodeUrl } from "../utils/BarcodeUtils"

const styles = StyleSheet.create({
  page: {
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
  },
  container: {
    width: "50%",
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#cccccc",
    borderStyle: "dashed", 
    margin: -0.25, 
  },
  barcodeImage: {
    width: 200,
    height: 50,
  },
  label: {
    fontSize: 6,
    marginTop: 2,
    textAlign: "center",
    maxWidth: "100%",
    overflow: "hidden",
  },
})

interface Props {
  data: CsvData[]
}

const PDFDocument = ({ data }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {data.map((row, index) => {
        const barcodeValue = `${row["organizationName"]} ${row["staffId"]} ${row["fullName"]}`

        const barcodeSrc = getBarcodeUrl(barcodeValue)

        return (
          <View key={index} style={styles.container}>
            <Image src={barcodeSrc} style={styles.barcodeImage} />
            <Text style={styles.label}>{barcodeValue}</Text>
          </View>
        )
      })}
    </Page>
  </Document>
)

export default PDFDocument
