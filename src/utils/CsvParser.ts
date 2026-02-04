import Papa from 'papaparse'
import type { CsvData, CsvRawRow } from '../types/types'

export const parseCsvFile = (file: File): Promise<CsvData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<CsvRawRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        try {
          const mappedData: CsvData[] = result.data.map((item, index) => ({
            no: Number(item.No ?? index + 1),
            organizationName: item['Organization Name'] ?? '',
            staffId: item['Staff ID'] ?? '',
            fullName: item['Full Name'] ?? '',
          }))

          resolve(mappedData)
        } catch (error) {
          reject(error)
        }
      },
      error: (error) => reject(error),
    })
  })
}
