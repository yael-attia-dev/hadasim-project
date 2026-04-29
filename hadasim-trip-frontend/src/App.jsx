import { useState } from 'react';
import { Box, Typography, Button, Stack, Paper, Container } from '@mui/material';
import Sidebar from './components/Sidebar.jsx'; // ניצור אותו מיד
import AuthForm from './components/AuthForm.jsx'; // הקוד המקורי שלך יועבר לכאן

function App() {
    const [page, setPage] = useState('home'); // ניהול פשוט של דפים
    const isLoggedIn = localStorage.getItem('teacherId');

    // פונקציה להצגת התוכן המרכזי לפי הבחירה
    const renderContent = () => {
        if (page === 'auth') {
            return <AuthForm onLoginSuccess={() => setPage('home')} />;
        }


        if (page === 'home') {
            return (
                <Container maxWidth="md">
                    <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
                        מערכת ניהול טיולים
                    </Typography>

                    <Stack direction="row" spacing={4} justifyContent="center">
                        {/* אופציות שלא קשורות למורה ספציפית - במרכז המסך */}
                        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', cursor: 'pointer', flex: 1 }}>
                            <Typography variant="h6">הוספת תלמידה לטיול</Typography>
                            <Button variant="outlined" sx={{ mt: 2 }}>עבור לרישום</Button>
                        </Paper>

                        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', cursor: 'pointer', flex: 1 }}>
                            <Typography variant="h6">הצגת מפת המיקומים</Typography>
                            <Button variant="outlined" sx={{ mt: 2 }}>פתח מפה</Button>
                        </Paper>
                    </Stack>
                </Container>
            );
        }

        return <Typography variant="h5">הדף {page} בבנייה...</Typography>;
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            {/* הסרגל הצידי - תמיד שם */}
            <Sidebar onNavigate={setPage} />

            {/* תוכן מרכזי - משתנה */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '250px' }}>
                {renderContent()}
            </Box>
        </Box>
    );
}

export default App;