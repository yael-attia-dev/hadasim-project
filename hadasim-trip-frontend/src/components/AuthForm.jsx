import { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Alert, IconButton, InputAdornment, Stack} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

function AuthForm({ onLoginSuccess }) {
    const [isLogin, setIsLogin] = useState(true);

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [classroom, setClassroom] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = async () => {
        setError('');
        setSuccess('');

        try {
            if (isLogin) {
                const response = await axios.post('http://localhost:8080/api/teachers/login', { id, password });
                const fullName = `${response.data.firstName} ${response.data.lastName}`;
                localStorage.setItem('teacherName', fullName);
                localStorage.setItem('teacherId', id);
                onLoginSuccess();
            }else {
                // הרשמה
                await axios.post('http://localhost:8080/api/teachers', {
                    id: id,
                    firstName: firstName,
                    lastName: lastName,
                    classroom: classroom,
                    password: password
                });
                setSuccess("המורה נרשמה בהצלחה! עכשיו אפשר להתחבר.");
                setIsLogin(true);
            }
        } catch (err) {
            setError(isLogin ? "פרטים שגויים." : "שגיאה ברישום. ודאי שכל השדות מלאים.");
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
            <Container maxWidth="xs">
                <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
                    <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        {isLogin ? "כניסת מורות" : "רישום מורה חדשה"}
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                    <Stack spacing={1}>
                        {!isLogin && (
                            <>
                                <TextField fullWidth label="שם פרטי" variant="outlined" size="small" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                <TextField fullWidth label="שם משפחה" variant="outlined" size="small" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                <TextField fullWidth label="כיתה (למשל: א'1)" variant="outlined" size="small" value={classroom} onChange={(e) => setClassroom(e.target.value)} />
                            </>
                        )}

                        <TextField fullWidth label="מספר תעודת זהות" variant="outlined" value={id} onChange={(e) => setId(e.target.value)} />

                        <TextField
                            fullWidth
                            label="סיסמה"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            // בגרסאות החדשות משתמשים ב-slotProps במקום ב-InputProps
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Stack>

                    <Button fullWidth variant="contained" size="large" onClick={handleSubmit} sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}>
                        {isLogin ? "התחברות" : "סיום הרשמה"}
                    </Button>

                    <Button fullWidth variant="text" sx={{ mt: 2 }} onClick={() => { setIsLogin(!isLogin); setError(''); }}>
                        {isLogin ? "עוד לא רשומה? לחצי כאן להרשמה" : "כבר רשומה? חזרי להתחברות"}
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
}

export default AuthForm;