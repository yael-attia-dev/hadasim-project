import {useEffect, useState} from 'react';
import {Box, Typography, Button, Stack, Paper, Container} from '@mui/material';
import Sidebar from './components/Sidebar.jsx';
import AuthForm from './components/AuthForm.jsx';
import AddStudent from "./components/AddStudent.jsx";
import MapComponent from "./components/MapComponent.jsx";
import StudentList from "./components/StudentList.jsx";
import DistanceAlerts from "./components/DistanceAlerts.jsx";
import axios from "axios";

function App() {

    const [page, setPage] = useState('home');
    const isLoggedIn = localStorage.getItem('teacherId');
    const [students, setStudents] = useState([]);
    const [authUpdate, setAuthUpdate] = useState(false);

    const fetchStudents = async (classroom) => {
        if (!classroom) return;
        try {
            const response = await axios.get(`http://localhost:8080/api/students/by-class`, {
                params: {classroom: classroom.trim()}
            });
            setStudents(response.data);
        } catch (err) {
            console.error("שגיאה בטעינת הרשימה", err);
        }
    };

    useEffect(() => {
        const savedClass = localStorage.getItem('teacherClass');
        if (savedClass) {
            fetchStudents(savedClass);
        }
    }, [page]);

    const onLoginSuccess = () => {
        setPage('home');
        setAuthUpdate(!authUpdate);
    };

    const renderContent = () => {

        const protectedPages = ['student-list', 'dist-alerts', 'map-component'];
        if (protectedPages.includes(page) && !isLoggedIn) {
            return <AuthForm onLoginSuccess={onLoginSuccess}/>;
        }

        if (page === 'auth') {
            return <AuthForm onLoginSuccess={onLoginSuccess}/>;
        }

        if (page === 'student-list') {
            const savedName = localStorage.getItem('teacherName');
            const savedClass = localStorage.getItem('teacherClass');

            return <StudentList
                teacherName={savedName}
                classroom={savedClass}
                students={students}
            />;
        }

        if (page === 'dist-alerts') {
            const savedName = localStorage.getItem('teacherName');
            const savedClass = localStorage.getItem('teacherClass');

            return <DistanceAlerts
                teacherName={savedName}
                classroom={savedClass}
                students={students}
            />;
        }

        if (page === 'map-component') {
            return <MapComponent/>;
        }

        if (page === 'add-student') {
            return <AddStudent/>;
        }

        if (page === 'home') {

            return (
                <Container maxWidth="md">

                    <Box sx={{backgroundColor: 'white', textAlign: 'center', mb: 3}}>

                        <img
                            src="/logo.png"
                            alt="לוגו מערכת ניהול"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                maxHeight: '250px',
                                objectFit: 'contain',
                                padding: 0
                            }}
                        />
                    </Box>


                    <Stack direction="row" spacing={4} sx={{backgroundColor: 'white', justifyContent: "center"}}>

                        <Paper elevation={3} sx={{
                            p: 4,
                            borderColor: '#65d437',
                            borderRadius: '20',
                            textAlign: 'center',
                            cursor: 'pointer',
                            flex: 1
                        }}>
                            <Typography variant="h6">הוספת תלמידה לטיול</Typography>
                            <Button
                                variant="outlined"
                                sx={{backgroundColor: '#65d437', mt: 2, color: 'white'}}
                                onClick={() => setPage('add-student')}>
                                רשום תלמידה
                            </Button>
                        </Paper>


                        <Paper elevation={3} sx={{p: 4, textAlign: 'center', cursor: 'pointer', flex: 1}}>
                            <Typography variant="h6">הצגת מפת המיקומים</Typography>
                            <Button
                                variant="outlined"
                                sx={{backgroundColor: '#65d437', mt: 2, color: 'white'}}
                                onClick={() => setPage('map-component')}>
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
        <Box sx={{display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5'}}>

            <Sidebar onNavigate={setPage}/>
            <Box component="main" sx={{
                backgroundColor: 'white',
                flexGrow: 1,
                p: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '250px'
            }}>
                {renderContent()}
            </Box>
        </Box>
    );
}

export default App;