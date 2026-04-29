import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const StudentList = ({ teacherName, classroom }) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            if (!classroom) return; // הגנה: אל תשלח בקשה אם הכיתה עדיין ריקה

            try {
                // הדרך המקצועית לשלוח פרמטרים
                const response = await axios.get(`http://localhost:8080/api/students/by-class`, {
                    params: {
                        classroom: classroom.trim()
                    }
                });
                setStudents(response.data);
            } catch (err) {
                console.error("שגיאה בטעינת הרשימה", err);
            }
        };
        fetchStudents();
    }, [classroom]);


    return (
        <Box sx={{ p: 4, direction: 'rtl' }}>
            <Typography variant="h3" gutterBottom sx={{padding: '20px',  fontWeight: 'bold' ,backgroundColor:'#3b8d39', borderRadius: '20px 20px 20px 20px', color: 'white' , fontSize:'20' }}>
                כיתה {classroom} של המורה {teacherName}
            </Typography>

            <TableContainer component={Paper} sx={{ mt: 4, boxShadow: 3 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell align="right">ת"ז</TableCell>
                            <TableCell align="right">שם פרטי</TableCell>
                            <TableCell align="right">שם משפחה</TableCell>
                            <TableCell align="right">סטטוס</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.length > 0 ? (
                            students.map((s) => (
                                <TableRow key={s.id} hover>
                                    <TableCell align="right">{s.id}</TableCell>
                                    <TableCell align="right">{s.firstName}</TableCell>
                                    <TableCell align="right">{s.lastName}</TableCell>
                                    <TableCell align="right">נוכחת</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    טוען נתונים או שלא נמצאו תלמידות לכיתה {classroom}...
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default StudentList;