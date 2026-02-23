import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Resource, ResourceInputs } from '../../types/types'

interface ResourceState {
  resources: Resource[]
}

const initialState: ResourceState = {
  resources: [],
}

const resourceSlice = createSlice({
  name: 'resource',
  initialState,
  reducers: {
    setResources(state, action: PayloadAction<Resource[]>) {
      state.resources = action.payload
    },
    addResources(state, action: PayloadAction<Resource[]>) {
      state.resources.push(...action.payload)
    },
    addResource(state, action: PayloadAction<ResourceInputs>) {
      const newItem: Resource = {
        organizationName: action.payload.organization_name,
        staffId: action.payload.staff_id,
        fullName: action.payload.full_name,
      }

      state.resources.push(newItem)
    },
    removeResource(state, action: PayloadAction<string>) {
      state.resources = state.resources.filter(
        (item) => item.staffId !== action.payload,
      )
    },
  },
})

export const { setResources, addResources, addResource, removeResource } =
  resourceSlice.actions

export default resourceSlice.reducer
