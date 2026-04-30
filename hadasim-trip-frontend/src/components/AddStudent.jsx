import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Stack, Alert } from '@mui/material';
import axios from 'axios';

function AddStudent() {
    // ה-State מותאם בדיוק לשדות של ה-Entity שלך
    const [studentData, setStudentData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        classroom: ''
    });

    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        try {
            // שליחת הנתונים לשרת ה-Java
            await axios.post('http://localhost:8080/api/students', studentData);

            setMessage({ text: 'התלמידה נוספה בהצלחה למערכת!', type: 'success' });

            // איפוס הטופס לאחר הצלחה
            setStudentData({ id: '', firstName: '', lastName: '', classroom: '' });
        } catch (error) {

            const serverMessage = error.response?.data?.message || error.response?.data;

            // אם השרת החזיר הודעה על 9 ספרות או ת"ז קיימת - זה יופיע כאן
            setMessage({
                text: typeof serverMessage === 'string' ? serverMessage : "שגיאה ברישום התלמידה",
                type: 'error'
            });        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#65d437', textAlign: 'center' }}>
                    הוספת תלמידה חדשה
                </Typography>

                {message.text && <Alert severity={message.type} sx={{mb: 2, borderRadius: '12px', borderWidth: '2px', fontWeight: 'bold', direction: 'rtl' }}>{message.text}</Alert>}

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            sx={{ '& label.Mui-focused': {color: '#65d437',}, '& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#65d437',},},}}
                            fullWidth label="מספר תעודת זהות" name="id"
                            value={studentData.id} onChange={handleChange} required
                        />
                        <TextField
                            sx={{ '& label.Mui-focused': {color: '#65d437',}, '& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#65d437',},},}}
                            fullWidth label="שם פרטי" name="firstName"
                            value={studentData.firstName} onChange={handleChange} required
                        />
                        <TextField
                            sx={{ '& label.Mui-focused': {color: '#65d437',}, '& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#65d437',},},}}
                            fullWidth label="שם משפחה" name="lastName"
                            value={studentData.lastName} onChange={handleChange} required
                        />
                        <TextField
                            sx={{ '& label.Mui-focused': {color: '#65d437',}, '& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#65d437',},},}}
                            fullWidth label="כיתה" name="classroom"
                            value={studentData.classroom} onChange={handleChange} required
                        />

                        <Button type="submit" variant="contained" size="large" sx={{ mt: 2,backgroundColor:'#65d437', fontWeight: 'bold' }}>
                            שמור תלמידה
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
}

export default AddStudent;