import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PropTypes from 'prop-types';
const StudentList = ({ teacherName, classroom, students }) => {


    return (
        <Box sx={{ p: 4, direction: 'rtl' }}>
            <Typography variant="h3" gutterBottom sx={{padding: '30px',  fontWeight: 'bold' , borderRadius: '20px 20px 20px 20px', color: '#65d437' , fontSize:'20' }}>
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

StudentList.propTypes = {
    teacherName: PropTypes.string,
    classroom: PropTypes.string,
    students: PropTypes.array
};
export default StudentList;