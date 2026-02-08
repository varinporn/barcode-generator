export interface Resource{
  organizationName: string
  staffId: string
  fullName: string
}

export type ResourceInputs = {
  organization_name: string
  staff_id: string
  full_name: string
}

export interface CsvRawRow {
  'Organization Name'?: string
  'Staff ID'?: string
  'Full Name'?: string
}

