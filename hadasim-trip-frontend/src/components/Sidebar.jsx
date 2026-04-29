import { Box, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Sidebar = ({ onNavigate }) => {
    const isLoggedIn = localStorage.getItem('teacherId');

    const handleProtected = (target) => {
        if (!isLoggedIn) {
            onNavigate('auth');
        } else {
            onNavigate(target);
        }
    };

    return (
        <Box sx={{ width: 250, height: '100vh', bgcolor: '#1976d2', color: 'white', position: 'fixed', right: 0, top: 0, pt: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4, cursor: 'pointer' }} onClick={() => onNavigate('auth')}>
                <AccountCircleIcon sx={{ fontSize: 60 }} />
                <Typography variant="body1">התחברות / הרשמה</Typography>
            </Box>
            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
            <List>
                <ListItem button onClick={() => handleProtected('my-students')}>
                    <ListItemText primary="רשימת התלמידות שלי" sx={{ textAlign: 'right' }} />
                </ListItem>
                <ListItem button onClick={() => handleProtected('search-map')}>
                    <ListItemText primary="חיפוש תלמידה במפה" sx={{ textAlign: 'right' }} />
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;