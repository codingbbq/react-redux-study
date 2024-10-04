import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Habit {
	id: string;
	name: string;
	frequency: 'daily' | 'weekly';
	completeDates: string[];
	createdAt: string;
}

interface HabitState {
	habits: Habit[];
    isLoading: boolean;
    error: string | null;
}

const initialState: HabitState = {
	habits: [],
    isLoading: false,
    error: null
};

export const fetchHabits = createAsyncThunk('habit/fetchHabits', async() => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mockHabits: Habit[] = [
        {
            id: '1',
            name: 'Drink Water',
            frequency: 'daily',
            completeDates: [],
            createdAt: new Date().toISOString(),
        },
        {
            id: '2',
            name: 'Read a Book',
            frequency: 'daily',
            completeDates: [],
            createdAt: new Date().toISOString(),
        },
        {
            id: '3',
            name: 'Go for a Walk',
            frequency: 'daily',
            completeDates: [],
            createdAt: new Date().toISOString(),
        }
    ];

    return mockHabits;
})

const habitSlice = createSlice({
	name: 'habit',
	initialState: initialState,
	reducers: {
		addHabit: (
			state,
			action: PayloadAction<{ name: string; frequency: 'daily' | 'weekly' }>
		) => {
			const newHabit: Habit = {
				id: new Date().toString(),
				name: action.payload.name,
				frequency: action.payload.frequency,
				completeDates: [],
				createdAt: new Date().toISOString(),
			};

            state.habits.push(newHabit);
		},

        toggleHabit: (state, action: PayloadAction<{ id: string; date: string}>) => {
            const habit = state.habits.find((habit) => habit.id === action.payload.id);
            if(habit) {
                if(habit.completeDates.includes(action.payload.date)) {
                    habit.completeDates = habit.completeDates.filter((date) => date !== action.payload.date);
                } else {
                    habit.completeDates.push(action.payload.date);
                }
            }
        },

        removeHabit: (state, action: PayloadAction<{ id: string}>) => {
            state.habits = state.habits.filter((habit) => habit.id !== action.payload.id);
        }
	},
    extraReducers: (builder) => {
        builder.addCase(fetchHabits.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchHabits.fulfilled, (state, action) => {
            state.isLoading = false;
            state.habits = action.payload;
        })
        .addCase(fetchHabits.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'An error occurred';
        });
    }
});

export const { addHabit, toggleHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;
