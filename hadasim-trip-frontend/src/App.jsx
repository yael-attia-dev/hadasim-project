import { useState } from 'react';
import { Box, Typography, Button, Stack, Paper, Container } from '@mui/material';
import Sidebar from './components/Sidebar.jsx'; // ניצור אותו מיד
import AuthForm from './components/AuthForm.jsx'; // הקוד המקורי שלך יועבר לכאן
import AddStudent from "./components/AddStudent.jsx";
import MapComponent from "./components/MapComponent.jsx";
import StudentList from "./components/StudentList.jsx";

function App() {

    const [page, setPage] = useState('home'); // ניהול פשוט של דפים
    const isLoggedIn = localStorage.getItem('teacherId');
    const [authUpdate, setAuthUpdate] = useState(false);
    // פונקציה להצגת התוכן המרכזי לפי הבחירה


    const onLoginSuccess = () => {
        setPage('home');
        setAuthUpdate(!authUpdate); // גורם לריענון של כל ה-App והסרגל
    };

    const renderContent = () => {

        if (page === 'auth') {
            // במקום ללכת ישירות לבית, קוראים לפונקציה שמרעננת את המערכת
            return <AuthForm onLoginSuccess={onLoginSuccess}/>;
        }

        if (page === 'student-list') {
            // שליפה מהזיכרון של הדפדפן
            const savedName = localStorage.getItem('teacherName');
            const savedClass = localStorage.getItem('teacherClass');

            // שליחה לקומפוננטה של הרשימה
            return <StudentList teacherName={savedName} classroom={savedClass} />;
        }

        if (page === 'map-component') {
            return <MapComponent />;
        }



        if (page === 'add-student') {
            return <AddStudent />;
        }

        if (page === 'home') {

            return (
                <Container  maxWidth="md">

                    <Box sx={{ backgroundColor: 'white', textAlign: 'center', mb: 3 }}>
                        {/* במקום הכיתוב "מערכת ניהול תלמידים", נשים את הלוגו */}
                        <img
                            src="/logo.png"
                            alt="לוגו מערכת ניהול"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                maxHeight: '250px', // תשלטי פה על הגובה של הלוגו
                                objectFit: 'contain'
                            }}
                        />
                    </Box>


                    <Stack direction="row" spacing={4} sx={{  backgroundColor:'white' ,justifyContent: "center" }}>
                        {/* אופציות שלא קשורות למורה ספציפית - במרכז המסך */}


                        <Paper elevation={3} sx={{p: 4, textAlign: 'center', cursor: 'pointer', flex: 1}}>
                            <Typography variant="h6">הוספת תלמידה לטיול</Typography>
                            <Button
                                variant="outlined"
                                sx={{ mt: 2 }}
                                onClick={() => setPage('add-student')}
                            >
                                רשום תלמידה
                            </Button>
                        </Paper>



                        <Paper elevation={3} sx={{p: 4, textAlign: 'center', cursor: 'pointer', flex: 1}}>
                            <Typography variant="h6">הצגת מפת המיקומים</Typography>
                            <Button
                                variant="outlined"
                                sx={{ mt: 2 }}
                                onClick={() => setPage('map-component')}
                            >
                                הצג מפה
                            </Button>
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