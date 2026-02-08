import Papa from 'papaparse'
import type { Resource, CsvRawRow } from '../types/types'

export const parseCsvFile = (file: File): Promise<Resource[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<CsvRawRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        try {
          const mappedData: Resource[] = result.data.map((item) => ({
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
