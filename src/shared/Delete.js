import React from 'react';
import { connect } from "react-redux";
import { deleteRegion } from "../redux";
import Button from '@material-ui/core/Button';
import { deleteMapData } from '../api/apis';

const DeleteComp = (props) => {
    const { rowId, handleDelModal, deleteRegion } = props;
    const deleteRow = (id) => {
        deleteMapData(id)
            .then(() => {
                deleteRegion(id)
                handleDelModal(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div>
            <p>آیا از حذف این محدوده اطمینان دارید؟</p>
            <Button variant="contained" color="primary" style={{ margin: '5px' }} onClick={() => handleDelModal(true)}>خیر</Button>
            <Button onClick={() => deleteRow(rowId)} variant="outlined" color="primary" style={{ margin: '5px' }}>بله</Button>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    deleteRegion: (id) => dispatch(deleteRegion(id)),
});

const Delete = connect(null, mapDispatchToProps)(DeleteComp);

export { Delete };