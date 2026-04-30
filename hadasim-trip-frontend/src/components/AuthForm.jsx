import {useState} from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Alert,
    IconButton,
    InputAdornment,
    Stack
} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import axios from 'axios';

function AuthForm({onLoginSuccess}) {
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
                const response = await axios.post('http://localhost:8080/api/teachers/login', {id, password});
                const fullName = `${response.data.firstName} ${response.data.lastName}`;
                localStorage.setItem('teacherName', fullName);
                localStorage.setItem('teacherId', id);
                localStorage.setItem('teacherClass', response.data.classroom);
                onLoginSuccess();
            } else {
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
        } catch (error) {

            const serverMessage = error.response?.data?.message || error.response?.data;
            console.log("Extracted Message:", serverMessage);
            setError(typeof serverMessage === 'string' ? serverMessage : "שגיאה ברישום. ודאי שכל השדות מלאים.");
        }


    };

    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2}}>
            <Container maxWidth="xs">
                <Paper elevation={4} sx={{p: 4, borderRadius: 3}}>

                    <Typography variant="h5" align="center" gutterBottom sx={{fontWeight: 'bold', color: '#65d437'}}>
                        {isLogin ? "כניסת מורות" : "רישום מורה חדשה"}
                    </Typography>

                    {error && <Alert severity="error" sx={{
                        mb: 2,
                        borderRadius: '12px',
                        borderWidth: '2px',
                        fontWeight: 'bold',
                        direction: 'rtl'
                    }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{
                        mb: 2,
                        borderRadius: '12px',
                        borderWidth: '2px',
                        fontWeight: 'bold',
                        direction: 'rtl'
                    }}>{success}</Alert>}

                    <Stack spacing={1}>
                        {!isLogin && (
                            <>
                                <TextField fullWidth label="שם פרטי" sx={{
                                    '& label.Mui-focused': {color: '#65d437',},
                                    '& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#65d437',},},
                                }}
                                           variant="outlined" size="small" value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}/>

                                <TextField fullWidth label="שם משפחה" sx={{
                                    '& label.Mui-focused': {color: '#65d437',},
                                    '& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#65d437',},},
                                }}
                                           variant="outlined" size="small" value={lastName}
                                           onChange={(e) => setLastName(e.target.value)}/>

                                <TextField fullWidth label="כיתה (למשל: א1)" sx={{
                                    '& label.Mui-focused': {color: '#65d437',},
                                    '& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#65d437',},},
                                }}
                                           variant="outlined" size="small" value={classroom}
                                           onChange={(e) => setClassroom(e.target.value)}/>
                            </>
                        )}

                        <TextField fullWidth label="מספר תעודת זהות" sx={{
                            '& label.Mui-focused': {color: '#65d437',},
                            '& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#65d437',},},
                        }}
                                   variant="outlined" value={id} onChange={(e) => setId(e.target.value)}/>

                        <TextField

                            fullWidth
                            sx={{
                                '& label.Mui-focused': {color: '#65d437',},
                                '& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#65d437',},},
                            }}
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
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Stack>

                    <Button fullWidth variant="contained" size="large" onClick={handleSubmit}
                            sx={{mt: 3, py: 1.5, backgroundColor: '#65d437', fontWeight: 'bold'}}>
                        {isLogin ? "התחברות" : "סיום הרשמה"}
                    </Button>

                    <Button fullWidth variant="text" sx={{mt: 2, color: '#65d437'}} onClick={() => {
                        setIsLogin(!isLogin);
                        setError('');
                    }}>
                        {isLogin ? "עוד לא רשומה? לחצי כאן להרשמה" : "כבר רשומה? חזרי להתחברות"}
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
}

export default AuthForm;