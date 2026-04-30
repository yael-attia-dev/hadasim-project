import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
    const [studentsLocations, setStudentsLocations] = useState([]);

    const updateMapData = async () => {
        try {
            const timestamp = new Date().getTime();

            const [studentsResp, locationsResp] = await Promise.all([
                axios.get(`http://localhost:8080/api/students?t=${timestamp}`),
                axios.get(`http://localhost:8080/api/latest?t=${timestamp}`)
            ]);

            const studentsFromDB = studentsResp.data;
            const latestLocationsFromDB = locationsResp.data;

            const updatedData = studentsFromDB.map(student => {
                const loc = latestLocationsFromDB.find(l => l.studentId === student.id);

                if (loc && loc.latitude && loc.longitude) {
                    return {
                        ...student,
                        lat: parseFloat(loc.latitude),
                        lng: parseFloat(loc.longitude)
                    };
                }
                return null;
            }).filter(item => item !== null);

            console.log("Map Update:", updatedData);
            setStudentsLocations(updatedData);
        } catch (err) {
            console.error("שגיאה בטעינת הנתונים למפה", err);
        }
    };

    useEffect(() => {
      void updateMapData();
        const interval = setInterval(updateMapData, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{ height: '600px', width: '100%', borderRadius: '15px', overflow: 'hidden', boxShadow: 3 }}>
            <MapContainer
                center={[31.7683, 35.2137]} // מרכז ירושלים
                zoom={12}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {studentsLocations.map((student) => (
                    <Marker

                        key={`${student.id}-${student.lat}-${student.lng}`}
                        position={[student.lat, student.lng]}
                    >
                        <Tooltip
                            permanent
                            direction="top"
                            offset={[0, -32]}
                            opacity={0.9}
                        >
                            <Box sx={{ textAlign: 'center', direction: 'rtl' }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
                                    {student.firstName} {student.lastName}
                                </Typography>
                                <Typography variant="caption" display="block">
                                    כיתה: {student.classroom}
                                </Typography>
                            </Box>
                        </Tooltip>
                    </Marker>
                ))}
            </MapContainer>
        </Box>
    );
};

export default MapComponent;