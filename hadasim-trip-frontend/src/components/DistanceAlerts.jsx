import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';
import axios from 'axios';

const TEACHER_LOCATION = { lat: 31.7683, lng: 35.2137 };

const DistanceAlerts = ({ classroom }) => {
    const [combinedData, setCombinedData] = useState([]);

    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const fetchData = async () => {
        try {
            const timestamp = new Date().getTime();
            // משיכה של התלמידות והמיקומים בנפרד כמו במפה
            const [studentsResp, locationsResp] = await Promise.all([
                axios.get(`http://localhost:8080/api/students?t=${timestamp}`),
                axios.get(`http://localhost:8080/api/latest?t=${timestamp}`)
            ]);

            const studentsFromDB = studentsResp.data;
            const latestLocations = locationsResp.data;

            // חיבור הנתונים: לכל תלמידה מחפשים את המיקום האחרון שלה
            const merged = studentsFromDB
                .filter(s => s.classroom === classroom) // מציגים רק את הכיתה של המורה
                .map(student => {
                    const loc = latestLocations.find(l => l.studentId === student.id);
                    return {
                        ...student,
                        lat: loc ? parseFloat(loc.latitude) : null,
                        lng: loc ? parseFloat(loc.longitude) : null
                    };
                });

            setCombinedData(merged);
        } catch (err) {
            console.error("Error fetching distance data:", err);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000); // עדכון כל 10 שניות
        return () => clearInterval(interval);
    }, [classroom]);

    return (
        <Box sx={{ p: 4, direction: 'rtl', width: '100%' }}>
            <Typography variant="h4" gutterBottom sx={{padding: '30px',  fontWeight: 'bold' , borderRadius: '20px 20px 20px 20px', color: '#65d437' , fontSize:'20' }}>
                מעקב מרחקי תלמידות - כיתה {classroom}
            </Typography>

            <TableContainer component={Paper} elevation={4} sx={{ borderRadius: '15px' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
                        <TableRow>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>שם התלמידה</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>מרחק מהמורה</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>סטטוס בטיחות</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {combinedData.map((student) => {
                            const hasLocation = student.lat !== null && student.lng !== null;
                            let distance = 0;
                            if (hasLocation) {
                                distance = getDistance(TEACHER_LOCATION.lat, TEACHER_LOCATION.lng, student.lat, student.lng);
                            }
                            const isFar = hasLocation && distance > 3;

                            return (
                                <TableRow key={student.id} sx={{ backgroundColor: isFar ? '#fff5f5' : 'inherit' }}>
                                    <TableCell align="right">{student.firstName} {student.lastName}</TableCell>
                                    <TableCell align="right" sx={{ color: isFar ? '#d32f2f' : 'inherit', fontWeight: isFar ? 'bold' : 'normal' }}>
                                        {hasLocation ? `${distance.toFixed(2)} ק"מ` : "אין נתוני מיקום"}
                                    </TableCell>
                                    <TableCell align="right">
                                        {hasLocation ? (
                                            isFar ? (
                                                <Alert icon={false} severity="error" sx={{ py: 0, px: 1, display: 'inline-flex' }}>מרוחקת מדי</Alert>
                                            ) : (
                                                <Alert icon={false} severity="success" sx={{ py: 0, px: 1, display: 'inline-flex' }}>תקין</Alert>
                                            )
                                        ) : (
                                            <Typography variant="caption">ממתין לעדכון...</Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default DistanceAlerts;