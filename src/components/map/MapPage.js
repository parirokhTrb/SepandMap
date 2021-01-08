import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setMapData } from "../../redux";
import Box from "@material-ui/core/Box";
import PolygonList from "./PolygonsList";
import { getMapData } from "../../api/apis";
import MapBox from "./MapBox";

const MapPageComp = (props) => {
  const { setMapData } = props;

  useEffect(() => {
    getMapData()
      .then((res) => {
        let data = res.data;
        console.log(data)
        setMapData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setMapData]);

  return (
    <div>
      <Box>
        <MapBox />
      </Box>
      <Box>
        <PolygonList />
      </Box>
    </div>
  );
};


const mapDispatchToProps = (dispatch) => ({
  setMapData: (data) => dispatch(setMapData(data)),
});

const MapPage = connect(null, mapDispatchToProps)(MapPageComp);

export { MapPage };
