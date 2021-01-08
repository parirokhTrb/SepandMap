import { createStore } from 'redux';
import { mapData } from './map/mapReducer';

const store= createStore(mapData);

export default store;