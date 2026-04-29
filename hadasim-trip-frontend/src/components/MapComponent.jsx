import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Box } from '@mui/material';
import 'leaflet/dist/leaflet.css';

// פונקציית עזר להמרת הפורמט של ה-JSON שלך למספר עשרוני
const convertDMSToDecimal = (dms) => {
    return parseFloat(dms.Degrees) + parseFloat(dms.Minutes) / 60 + parseFloat(dms.Seconds) / 3600;
};

// רכיב פנימי שגורם למפה "לקפוץ" למיקום החדש כשהוא משתנה
function RecenterMap({ coords }) {
    const map = useMap();
    useEffect(() => {
        map.setView(coords, map.getZoom());
    }, [coords]);
    return null;
}

const MapComponent = () => {
    const [position, setPosition] = useState([32.0853, 34.7818]); // מיקום התחלתי (ת"א)

    // סימולציה של נתוני ה-JSON (במציאות זה יגיע מקובץ או מ-API)
    const mockJsonData = {
        "ID": 123456789,
        "Coordinates": {
            "Longitude": {"Degrees": "34", "Minutes": "46", "Seconds": "44"},
            "Latitude": {"Degrees": "32", "Minutes": "5", "Seconds": "23"}
        }
    };

    useEffect(() => {
        // כאן אנחנו "משחקים אותה" כאילו הנתונים מתעדכנים
        const interval = setInterval(() => {
            const lat = convertDMSToDecimal(mockJsonData.Coordinates.Latitude);
            const lng = convertDMSToDecimal(mockJsonData.Coordinates.Longitude);

            // אנחנו מוסיפים רעש קטן כדי לראות תנועה על המפה (רק לסימולציה)
            const randomNoise = (Math.random() - 0.5) * 0.01;
            setPosition([lat + randomNoise, lng + randomNoise]);

            console.log("מיקום התעדכן:", lat, lng);
        }, 5000); // מתעדכן כל 5 שניות

        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{ height: '500px', width: '100%', borderRadius: '15px', overflow: 'hidden' }}>
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Marker position={position}>
                    <Popup>
                        תלמידה מספר: {mockJsonData.ID} <br />
                        מעדכן מיקום בזמן אמת...
                    </Popup>
                </Marker>

                <RecenterMap coords={position} />
            </MapContainer>
        </Box>
    );
};

export default MapComponent;