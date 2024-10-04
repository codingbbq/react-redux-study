import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { Box, Button, LinearProgress, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CheckCircleOutline, DeleteOutline } from '@mui/icons-material';
import { Habit, removeHabit, toggleHabit } from '../store/habit-slice';

const HabitList: React.FC = () => {
	const { habits } = useSelector((state: RootState) => state.habit);
	const today = new Date().toISOString().split('T')[0];
    const dispatch = useDispatch<AppDispatch>();

    const getStreak = (habit: Habit) => {
        let streak = 0;
        const date = new Date();
        while(habit.completeDates.includes(date.toISOString().split('T')[0])) {
            streak++;
            date.setDate(date.getDate() - 1);
        }
        return streak;
    }
	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				{habits.map((habit) => {
					return (
						<Paper elevation={4} key={habit.id} sx={{ padding: 2, marginTop: 3 }}>
							<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
								<Grid size={{ xs: 12, sm: 6 }}>
									<Typography variant='h6'>{habit.name}</Typography>
									<Typography
										variant='body2'
										color='text.secondary'
										sx={{ textTransform: 'capitalize' }}
									>
										{habit.frequency}
									</Typography>
								</Grid>
								<Grid size={{ xs: 12, sm: 6 }}>
									<Box
										sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}
									>
										<Button
                                            onClick={() => {
                                                dispatch(
                                                    toggleHabit({
                                                        id: habit.id,
                                                        date: today,
                                                    })
                                                );
                                            }}
											color={
												habit.completeDates.includes(today)
													? 'success'
													: 'primary'
											}
											variant='outlined'
											startIcon={<CheckCircleOutline />}
										>
											{ habit.completeDates.includes(today)
													? 'Completed'
													: 'Mark as Complete'
											}
										</Button>
                                        <Button
											color={'error'}
											variant='outlined'
											startIcon={<DeleteOutline />}
                                            onClick={() => {
                                                dispatch(
                                                    removeHabit({
                                                        id: habit.id
                                                    })
                                                )
                                            }}
										>
											Remove
										</Button>
									</Box>
								</Grid>
							</Grid>

                            <Box sx={{ mt: 2 }}>
                                <Typography variant='body2' color='text.secondary'>
                                    Streak: {getStreak(habit)}
                                </Typography>

                                <LinearProgress
                                    variant='determinate'
                                    value={getStreak(habit) / 30 * 100}
                                    sx={{ mt: 1 }}
                                    ></LinearProgress>
                            </Box>
						</Paper>
					);
				})}
			</Box>
		</>
	);
};

export default HabitList;
