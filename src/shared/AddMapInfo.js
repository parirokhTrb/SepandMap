import React, { useState } from 'react';
import { connect } from "react-redux";
import { setNewRegion, editRegion } from "../redux";
import { setMapDataInfo, updateMapData } from '../api/apis';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '70%',
        },
    },
    button: {
        margin: theme.spacing(2),
        width: '70%',
    },
    palette: {
        width: '70%',
        textAlign: 'right',
        margin: 'auto'
    }
}));

const AddMapInfoComp = (props) => {
    const classes = useStyles();
    const { polygonCoordinate, rowData, isEdit, setNewRegion, editRegion } = props;
    const [mapInfo, setMapInfo] = useState({
        name: '',
        desc: '',
        price: '',
        color: '',
        time: '',
        deActiveColor: "rgba(0,0,0,0.5)",
        isActive: true,
        coordinate: ''
    });

    const handleChange = (e) => {
        setMapInfo({
            ...mapInfo,
            [e.target.name]: e.target.value
        })
    }

    const submitMapInfo = () => {
        if (!isEdit) {
            setMapDataInfo(
                {
                    name: mapInfo.name,
                    desc: mapInfo.desc,
                    color: mapInfo.color,
                    deActiveColor: mapInfo.deActiveColor,
                    price: mapInfo.price,
                    time: "1399.5.5",
                    isActive: mapInfo.isActive,
                    cordinate: polygonCoordinate
                }
            ).then(res => {
                props.handleModal(true);
                setNewRegion(res.data);
            }).catch(err => {
                console.log(err);
            });

        } else {
            updateMapData(rowData.id, {
                ...rowData,
                name: mapInfo.name.length ? mapInfo.name : rowData.name,
                desc: mapInfo.desc.length ? mapInfo.desc : rowData.desc,
                color: mapInfo.color.length ? mapInfo.color : rowData.color,
                price: mapInfo.price.length ? mapInfo.price : rowData.price,
            })
                .then((res) => {
                    let data = res.data;
                    props.handleModal(true);
                    editRegion({
                        id: data.id,
                        name: data.name,
                        desc: data.desc,
                        color: data.color,
                        price: data.price
                    })
                }).catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    name="name"
                    label="نام محدوده"
                    type="text"
                    fullWidth
                    variant="filled"
                    onChange={handleChange}
                    defaultValue={isEdit ? rowData.name : ''}
                />
                <TextField
                    required
                    margin="dense"
                    name="desc"
                    label="توضیحات محدوده"
                    multiline
                    rows={4}
                    fullWidth
                    variant="filled"
                    onChange={handleChange}
                    defaultValue={isEdit ? rowData.desc : ''}
                />
                <TextField
                    required
                    margin="dense"
                    name="price"
                    label="هزینه ارسال(تومان)"
                    type="number"
                    fullWidth
                    variant="filled"
                    onChange={handleChange}
                    defaultValue={isEdit ? rowData.price : ''}
                />

                <div className={classes.palette}>
                    <h3>رنگ محدوده:</h3>
                    <label className="container">
                        <input type="radio" value="rgba(0,0,255,0.3)" onChange={handleChange} name="color" />
                        <span className="checkmark" style={{ backgroundColor: "blue" }}></span>
                    </label>
                    <label className="container">
                        <input type="radio" value="rgba(0,0,0,0.3)" onChange={handleChange} name="color" />
                        <span className="checkmark" style={{ backgroundColor: "black" }}></span>
                    </label>
                    <label className="container">
                        <input type="radio" value="rgba(255,0,0,0.3)" onChange={handleChange} name="color" />
                        <span className="checkmark" style={{ backgroundColor: "pink" }}></span>
                    </label>
                    <label className="container">
                        <input type="radio" value="rgba(0,255,0,0.3)" onChange={handleChange} name="color" />
                        <span className="checkmark" style={{ backgroundColor: "green" }}></span>
                    </label>
                    <label className="container">
                        <input type="radio" value="rgba(255,0,0,0.3)" onChange={handleChange} name="color" />
                        <span className="checkmark" style={{ backgroundColor: "red" }}></span>
                    </label>
                    <label className="container">
                        <input type="radio" value="rgba(255,0,0,0.3)" onChange={handleChange} name="color" />
                        <span className="checkmark" style={{ backgroundColor: "orange" }}></span>
                    </label>
                    <label className="container">
                        <input type="radio" value="rgba(255,0,0,0.3)" onChange={handleChange} name="color" />
                        <span className="checkmark" style={{ backgroundColor: "darkblue" }}></span>
                    </label>
                    <label className="container">
                        <input type="radio" value="rgba(255,0,0,0.3)" onChange={handleChange} name="color" />
                        <span className="checkmark" style={{ backgroundColor: "blue" }}></span>
                    </label>
                    <label className="container">
                        <input type="radio" value="rgba(255,0,0,0.3)" onChange={handleChange} name="color" />
                        <span className="checkmark" style={{ backgroundColor: "pink" }}></span>
                    </label>
                    <label className="container">
                        <input type="radio" value="rgba(255,0,0,0.3)" onChange={handleChange} name="color" />
                        <span className="checkmark" style={{ backgroundColor: "brown" }}></span>
                    </label>
                    <label className="container">
                        <input type="radio" value="rgba(255,255,0,0.3)" onChange={handleChange} name="color" />
                        <span className="checkmark" style={{ backgroundColor: "yellow" }}></span>
                    </label>
                    <label className="container">
                        <input type="radio" value="rgba(255,0,0,0.3)" onChange={handleChange} name="color" />
                        <span className="checkmark" style={{ backgroundColor: "blue" }}></span>
                    </label>
                </div>
                <Button onClick={submitMapInfo} className={classes.button} variant="contained" color="primary">
                    ذخیره
                </Button>
            </form>
        </>
    );
};

const mapStateToProps = (state) => {
    console.log(state.mapData, "LLL");
    return {
        mapData: state.mapData,
    };
};


const mapDispatchToProps = (dispatch) => ({
    setNewRegion: (data) => dispatch(setNewRegion(data)),
    editRegion: (data) => dispatch(editRegion(data)),
});

const AddMapInfo = connect(mapStateToProps, mapDispatchToProps)(AddMapInfoComp);


export { AddMapInfo };