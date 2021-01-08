import axios from 'axios';

function getMapData() {
    return Promise.resolve(
        axios.get("http://localhost:8000/map", null)
    )
}

function setMapDataInfo(data) {
    return Promise.resolve(
        axios.post("http://localhost:8000/map", data)
    )
}

function updateMapData(id, data) {
    return Promise.resolve(
        axios.put("http://localhost:8000/map/" + id, data)
    )
}

function deleteMapData(id) {
    return Promise.resolve(
        axios.delete("http://localhost:8000/map/" + id)
    )
}

function setActive(id, data) {
    return Promise.resolve(
        axios.put("http://localhost:8000/map/" + id, data)
    )
}

export { getMapData, setMapDataInfo, updateMapData, deleteMapData, setActive }