import React, { Component } from "react";
import { connect } from "react-redux";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import Polygon from "ol/geom/Polygon";
import Feature from "ol/Feature";
import MultiPoint from "ol/geom/MultiPoint";
import { Draw, Snap } from "ol/interaction";
import { ModalComp, AddMapInfo, Warning } from "../../shared";

class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      closedModal: false,
      showWarningModal: false,
      polygonCoordinate: null,
    };
    this.source = new VectorSource();
    this.map = "";
    this.polygonExtent = [];
    this.vector = '';
  }

  componentDidMount() {
    this.vector = new VectorLayer({
      source: this.source,
      style: new Style({
        fill: new Fill({
          color: "rgba(0, 0, 0, 0.3)",
        }),
        stroke: new Stroke({
          color: "pink",
          width: 1,
        }),
        geometry: (feature) => {
          var coordinates = feature.getGeometry().getCoordinates();
          this.setState({
            polygonCoordinate: coordinates,
          });
          return new Polygon(coordinates);
        },
      }),
    });

    this.map = new Map({
      layers: [new TileLayer({ source: new OSM() }), this.vector],
      target: "map",
      view: new View({
        center: [5720252.816532238, 4257792.819396444],
        zoom: 13,
      })
    });

    this.addInteractions();
  }

  componentDidUpdate(prevProps) {
    const { mapData } = this.props;
    const { closedModal } = this.state;
    if (prevProps.mapData !== mapData) {
      let layersToRemove = [];
      this.map.getLayers().forEach(function (layer) {
        if (layer.get('name') != undefined && layer.get('name') === 'mapLayers') {
          layersToRemove.push(layer);
        }
      });
      let len = layersToRemove.length;
      for (let i = 0; i < len; i++) {
        this.map.removeLayer(layersToRemove[i]);
      }
      mapData.map((data) => {
        let style = [
          new Style({
            stroke: new Stroke({
              color: "blue",
              width: 1,
            }),
            fill: new Fill({
              color: data.isActive ? data.color : data.deActiveColor,
            }),
          }),
          new Style({
            image: new CircleStyle({
              radius: 5,
              fill: new Fill({
                color: "orange",
              }),
            }),
            geometry: (feature) => {
              let extent = feature.getGeometry().getExtent();
              this.polygonExtent.push(extent);
              var coordinates = feature.getGeometry().getCoordinates()[0];
              return new MultiPoint(coordinates);
            },
          }),
        ];

        var vectorSource = new VectorSource();
        var points = data.cordinate;
        var feature = new Feature({
          type: 'click',
          geometry: new Polygon(points),
        });

        vectorSource.addFeature(feature);

        var vectorLayer = new VectorLayer({
          source: vectorSource,
          style: style,
        });
        vectorLayer.set('name' , 'mapLayers');
        this.map.addLayer(vectorLayer);
      });
    }
    if (closedModal) {
      this.vector.getSource().clear()
    }
  }

  handleModal = (closed) => {
    this.setState({
      showModal: !this.state.showModal,
      closedModal: closed
    });
  };

  handleWarningModal = () => {
    this.setState({
      showWarningModal: !this.state.showWarningModal,
    });
  };

  addInteractions = () => {
    let draw, snap;
    draw = new Draw({
      source: this.source,
      type: "Polygon",
    });
    snap = new Snap({ source: this.source });
    this.map.addInteraction(draw);
    this.map.addInteraction(snap);

    this.map.on('click', (e) => {
      this.map.forEachFeatureAtPixel(e.pixel, (feature) => {
        if (feature.get('type') === 'click') {
          for (let i in this.polygonExtent) {
            if (feature.getGeometry().intersectsExtent(this.polygonExtent[i])) {
              this.handleWarningModal();
              this.map.removeInteraction(draw);
              this.map.addInteraction(draw);
            }
          }
        }
      })
    });

    draw.on("drawend", () => {
      this.handleModal();
    });
  };

  render() {
    const { polygonCoordinate } = this.state;
    return (
      <React.Fragment>
        <ModalComp
          showModal={this.state.showModal}
          handleClose={this.handleModal}
          title="اطلاعات محدوده"
          component={
            polygonCoordinate && (
              <AddMapInfo polygonCoordinate={polygonCoordinate} handleModal={this.handleModal} />
            )
          }
        />

        <ModalComp
          showModal={this.state.showWarningModal}
          handleClose={this.handleWarningModal}
          title="اخطار"
          component={<Warning />}
        />

        <div id="map" style={{ width: "100%", height: "60vh" }}></div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mapData: state.mapData,
  };
};

export default connect(mapStateToProps, null)(MapBox);

