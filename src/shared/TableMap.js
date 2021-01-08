import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';
import { deActiveRegion } from "../redux";
import MaterialTable from 'material-table';
import { ModalComp, AddMapInfo, Delete } from '../shared';
import Switch from '@material-ui/core/Switch';
import { setActive, getMapData } from '../api/apis';

const TableMapComp = (props) => {
  const { deActiveRegion } = props;
  const mapData = useSelector(state => state.mapData);
  const [state, setState] = useState({
    columns: [
      { title: 'نام محدوده', field: 'name' },
      { title: 'توضیحات محدوده', field: 'desc' },
      {
        title: 'رنگ محدوده', field: 'color',
        render: rowData => (
          <span className="tableColor" style={{ backgroundColor: rowData.color }}></span>
        )
      },
      { title: 'هزینه ارسال', field: 'price' },
      { title: 'زمان رسال', field: 'time' }
    ]
  });

  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState();
  const [closedModal, setClosedModal] = useState(false);

  const handleModal = (rowData, closed) => {
    setRowData(rowData);
    setShowModal(!showModal);
    setClosedModal(closed);
  }

  const [showDelModal, setShowDelModal] = useState(false);
  const [rowId, setRowId] = useState();
  const [closedDelModal, setClosedDelModal] = useState(false);

  const handleDelModal = (id, closed) => {
    setRowId(id);
    setShowDelModal(!showDelModal);
    setClosedDelModal(closed)
  }

  const handleActive = (id, isActive, rowData) => {
    setActive(id, {
      ...rowData,
      isActive: !isActive,
    })
      .then((res) => {
        deActiveRegion(res.data)
      })
  }


  return (
    <>
      <ModalComp
        title="ویرایش محدوده"
        showModal={showModal}
        handleClose={handleModal}
        component={<AddMapInfo rowData={rowData} isEdit={true} handleModal={handleModal} />}
      />
      <ModalComp
        title="حذف محدوده"
        showModal={showDelModal}
        handleClose={handleDelModal}
        component={<Delete rowId={rowId} handleDelModal={handleDelModal} />}
      />
      <MaterialTable
        title=" "
        columns={state.columns}
        data={mapData}
        actions={[
          rowData => ({
            icon: () => <div>
              <Switch checked={rowData.isActive} inputProps={{ 'aria-label': 'primary checkbox' }} />
            </div>,
            tooltip: 'فعال/غیر فعال',
            onClick: (event, rowData) => handleActive(rowData.id, rowData.isActive, rowData)
          }),
          {
            icon: 'edit',
            tooltip: 'ویرایش محدوده',
            onClick: (event, rowData) => handleModal(rowData)
          },
          rowData => ({
            icon: 'delete',
            tooltip: 'حذف محدوده',
            onClick: (event, rowData) => handleDelModal(rowData.id),
            disabled: rowData.birthYear < 2000
          })
        ]}
        options={{
          actionsColumnIndex: -1
        }}
        localization={{
          header: {
            actions: 'وضعیت'
          },
          toolbar: {
            searchPlaceholder: 'جستجو...'
          }
        }}
      />
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  deActiveRegion: (data) => dispatch(deActiveRegion(data)),
});

const TableMap = connect(null, mapDispatchToProps)(TableMapComp);


export { TableMap };