import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { getGeoDistribution } from '../services/api';
import worldMap from '../data/world-map.json';
import cityData from '../data/city-coordinates.json';
import '../assets/styles.css';

// Convert the city data JSON into a lookup object
const cityCoordinates = cityData.reduce((acc, city) => {
    acc[city.city] = [city.lng, city.lat]; // Note: longitude, latitude
    return acc;
}, {});

const GeoDistributionMap = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGeoData = async () => {
            try {
                const result = await getGeoDistribution();
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching geographical distribution data:', error);
                setLoading(false);
            }
        };

        fetchGeoData();
    }, []);

    if (loading) {
        return <div className="chart-container">Loading chart...</div>;
    }

    return (
        <div className="chart-wrapper">
            <h2 className="chart-title">Geographical Distribution of Customers:</h2>
            <div className="chart-container">
                <ComposableMap
                    projection="geoMercator"
                    width={800}
                    height={600}
                    style={{ width: '100%', height: 'auto' }}
                >
                    <Geographies geography={worldMap}>
                        {({ geographies }) =>
                            geographies.map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#EAEAEC"
                                    stroke="#D6D6DA"
                                />
                            ))
                        }
                    </Geographies>
                    {data.map(({ _id, count }) => {
                        const coordinates = cityCoordinates[_id] || [0, 0]; // Default to [0, 0] if not found
                        return (
                            <Marker key={_id} coordinates={coordinates}>
                                <circle
                                    r={count * 0.5} // Adjust size here
                                    fill="#F53"
                                    stroke="#FFF"
                                    strokeWidth={0.5}
                                />
                            </Marker>
                        );
                    })}
                </ComposableMap>
            </div>
        </div>
    );
};

export default GeoDistributionMap;
