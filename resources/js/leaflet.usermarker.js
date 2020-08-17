/**
 * Leaflet.UserMarker v1.0
 * 
 * Author: Jonatan Heyman <http://heyman.info>
 */

var _width = 20; /*34 -> 20*/
var _height = 10; /*17 -> 10*/

(function(window) {
    var icon = L.divIcon({
        className: "leaflet-usermarker",
        iconSize: [_width, _width],
        iconAnchor: [_height, _height],
        popupAnchor: [0, -20],
        labelAnchor: [11, -3],
        html: ''
    });
    var iconPulsing = L.divIcon({
        className: "leaflet-usermarker",
        iconSize: [_width, _width],
        iconAnchor: [_height, _height],
        popupAnchor: [0, -20],
        labelAnchor: [11, -3],
        html: '<i class="pulse"></i>'
    });

    var iconAlter = L.divIcon({
        className: "leaflet-usermarker-alter",
        iconSize: [_width, _width],
        iconAnchor: [_height, _height],
        popupAnchor: [0, -20],
        labelAnchor: [11, -3],
        html: ''
    });
    var iconPulsingAlter = L.divIcon({
        className: "leaflet-usermarker-alter",
        iconSize: [_width, _width],
        iconAnchor: [_height, _height],
        popupAnchor: [0, -20],
        labelAnchor: [11, -3],
        html: '<i class="pulse"></i>'
    });

    var iconSmall = L.divIcon({
        className: "leaflet-usermarker-small",
        iconSize: [_height, _height],
        iconAnchor: [9, 9],
        popupAnchor: [0, -10],
        labelAnchor: [3, -4],
        html: ''
    });
    var iconPulsingSmall = L.divIcon({
        className: "leaflet-usermarker-small",
        iconSize: [_height, _height],
        iconAnchor: [9, 9],
        popupAnchor: [0, -10],
        labelAnchor: [3, -4],
        html: '<i class="pulse"></i>'
    });
    var circleStyle = {
        stroke: true,
        color: "#03f",
        weight: 3,
        opacity: 0.5,
        fillOpacity: 0.15,
        fillColor: "#03f",
        clickable: false
    };

    L.UserMarker = L.Marker.extend({
        options: {
            pulsing: false,
            smallIcon: false,
            accuracy: 0,
            circleOpts: circleStyle,
            alterColor: false
        },

        initialize: function(latlng, options) {
            options = L.Util.setOptions(this, options);
            
            this.setPulsing(this.options.pulsing);
            this._accMarker = L.circle(latlng, this.options.accuracy, this.options.circleOpts);
        
            // call super
            L.Marker.prototype.initialize.call(this, latlng, this.options);
        
            this.on("move", function() {
                this._accMarker.setLatLng(this.getLatLng());
            }).on("remove", function() {
                this._map.removeLayer(this._accMarker);
            });
        },
    
        setPulsing: function(pulsing) {
            this._pulsing = pulsing;
            
            if (this.options.smallIcon) {
                this.setIcon(!!this._pulsing ? iconPulsingSmall : iconSmall);
            } else {
                if (!this.options.alterColor) {
                    this.setIcon(!!this._pulsing ? iconPulsing : icon);
                } else {
                    this.setIcon(!!this._pulsing ? iconPulsingAlter : iconAlter);
                }
            }
        },
    
        setAccuracy: function(accuracy)	{
            this._accuracy = accuracy;
            if (!this._accMarker) {
                this._accMarker = L.circle(this._latlng, accuracy, this.options.circleOpts).addTo(this._map);
            } else {
                this._accMarker.setRadius(accuracy);
            }
        },
    
        onAdd: function(map) {
            // super
            L.Marker.prototype.onAdd.call(this, map);
            this._accMarker.addTo(map);
        }
    });

    L.userMarker = function (latlng, options) {
        return new L.UserMarker(latlng, options);
    };
})(window);
