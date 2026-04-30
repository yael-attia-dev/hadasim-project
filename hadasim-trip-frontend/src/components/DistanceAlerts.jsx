import React from 'react';
import { Alert, Stack, Typography, Paper, Box } from '@mui/material';

// מיקום קבוע של המורה (לפי הבקשה שלך)
const TEACHER_LOCATION = { lat: 31.7683, lng: 35.2137 };

const DistanceAlerts = ({ students }) => {

    // פונקציית העזר לחישוב מרחק אווירי
    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // סינון התלמידות שרחוקות יותר מ-3 ק"מ
    const farStudents = students.filter(student => {
        const dist = getDistance(
            TEACHER_LOCATION.lat,
            TEACHER_LOCATION.lng,
            student.latitude,
            student.longitude
        );
        return dist > 3;
    });

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                מרכז בטיחות: תלמידות בסיכון
            </Typography>

            {farStudents.length === 0 ? (
                <Alert severity="success">כל התלמידות נמצאות בטווח הבטוח (עד 3 ק"מ).</Alert>
            ) : (
                <Stack spacing={2}>
                    <Alert severity="error" sx={{ fontWeight: 'bold' }}>
                        שימי לב! {farStudents.length} תלמידות חרגו מהטווח המותר!
                    </Alert>

                    {farStudents.map(student => (
                        <Paper key={student.id} elevation={2} sx={{ p: 2, borderRight: '5px solid #d32f2f' }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {student.firstName} {student.lastName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                תעודת זהות: {student.id} | כיתה: {student.classroom}
                            </Typography>
                            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
                                חרגה מהמרחק המותר (נמצאת במרחק של מעל 3 ק"מ)
                            </Typography>
                        </Paper>
                    ))}
                </Stack>
            )}
        </Box>
    );
};

export default DistanceAlerts;