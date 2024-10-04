import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchHabits } from "../store/habit-slice";
import { CircularProgress, Paper, Typography } from "@mui/material";

const HabitStats: React.FC = () => {

    const { habits, isLoading, error } = useSelector((state: RootState) => state.habit);
    const dispatch = useDispatch<AppDispatch>();

    const getCompletedToday = () => {
        const today = new Date().toISOString().split('T')[0];
        return habits.filter(habit => habit.completeDates.includes(today)).length;
    }

    const getLongestStreak = () => {
        let longestStreak = 0;
        habits.forEach((habit) => {
            let eachStreak = 0;
            const date = new Date();
            while(habit.completeDates.includes(date.toISOString().split('T')[0])) {
                eachStreak++;
                date.setDate(date.getDate() - 1);
            }
            longestStreak = Math.max(eachStreak, longestStreak);
        })
        return longestStreak;
    }


    useEffect(() => {
        dispatch(fetchHabits());
    }, [dispatch]);
    
    if(isLoading) {
        return <CircularProgress />;
    }

    if(error) {
        return <Typography variant='h6' color='error'>{error}</Typography>;
    }
    
    return (
        <Paper elevation={2} sx={{ mt: 3, p: 2 }}>
            <Typography variant="h6" gutterBottom>Stats</Typography>
            <Typography variant="body1">Total Habits: { habits.length }</Typography>
            <Typography variant="body1">Completed Today: { getCompletedToday() }</Typography>
            <Typography variant="body1">Longest Streak: { getLongestStreak() }</Typography> 
        </Paper>
    )
};

export default HabitStats;