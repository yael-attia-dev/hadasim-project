import { Box, List, ListItem, ListItemText, Divider, Typography, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Sidebar.css';

const Sidebar = ({ onNavigate }) => {
    const teacherId = localStorage.getItem('teacherId');
    const teacherName = localStorage.getItem('teacherName') || "מורה";

    const handleProtected = (target) => {
        if (!teacherId) {
            onNavigate('auth');
        } else {
            onNavigate(target);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('teacherId');
        localStorage.removeItem('teacherName');
        onNavigate('home'); // חוזרים לבית אחרי ניתוק
        window.location.reload(); // דרך פשוטה לוודא שהכל מתאפס
    };

    return (
        <Box sx={{ width: 250, height: '100vh', bgcolor: '#3b8d39', color: 'white', position: 'fixed', right: 0, top: 0, pt: 4, display: 'flex', flexDirection: 'column' , borderRadius: '20px 20px 20px 20px'}}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <AccountCircleIcon sx={{ fontSize: 60 }} />

                {/* כאן קורה השינוי של השם */}
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {teacherId ? `שלום, ${teacherName}` : "התחברות / הרשמה"}
                </Typography>

                {teacherId ? (
                    <Button color="inherit" size="small" onClick={handleLogout} sx={{ mt: 1, textDecoration: 'underline', fontSize: '0.7rem'  }}>
                        התנתקות
                    </Button>
                ) : (
                    <Button color="inherit" size="small" onClick={() => onNavigate('auth')} sx={{ mt: 1 }}>
                        לחצי כאן
                    </Button>
                )}
            </Box>

            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />

            <List>
                <ListItem button onClick={() => onNavigate('home')}>
                    <ListItemText primary="מסך הבית" sx={{ textAlign: 'right' }} />
                </ListItem>

                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 1 }} />



                <ListItem button onClick={() => {handleProtected('my-students'); // בודק הרשאות
                        onNavigate('student-list');    // מעביר דף
                    }}
                    sx={{'&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }, cursor: 'pointer'}}>
                    <ListItemText primary="רשימת התלמידות שלי" sx={{ textAlign: 'right', color: 'white' }}
                    />
                </ListItem>


                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 1 }} />

                <ListItem button onClick={() => {handleProtected('dist-alerts'); // בודק הרשאות
                    onNavigate('dist-alerts');    // מעביר דף
                }}
                          sx={{'&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }, cursor: 'pointer'}}>
                    <ListItemText primary="אזהרות מרחק" sx={{ textAlign: 'right', color: 'white' }}
                    />
                </ListItem>


            </List>
        </Box>
    );
};

export default Sidebar;