import { SET_MAP_DATA, SET_NEW_REGION, EDIT_REGION, DELETE_REGION, DEACTIVE_REGION } from './mapTypes';

const setMapData = (value) => ({
    type: SET_MAP_DATA,
    payload: value,
})

const setNewRegion = (value) => ({
    type: SET_NEW_REGION,
    payload: value,
})

const editRegion = (value) => ({
    type: EDIT_REGION,
    payload: value,
})

const deleteRegion = (id) => ({
    type: DELETE_REGION,
    payload: id
})

const deActiveRegion = (value) => ({
    type: DEACTIVE_REGION,
    payload: value
})

export { setMapData, setNewRegion, editRegion, deleteRegion, deActiveRegion }