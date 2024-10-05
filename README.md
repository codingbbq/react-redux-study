# What is this Project ?
This is a simple application inspired by a [YouTube tutorial](https://www.youtube.com/watch?v=-ovliZG617g&ab_channel=RoadsideCoder) on Redux Toolkit. I wanted to understand how Redux Toolkit works, so this was a good exercise.

In an application with many components, passing data from one component to another at multiple levels becomes unmanageable, a problem known as prop drilling. To solve this, we use Redux, which provides a single store where all the data is managed.

Let's say you have an array of objects that you need to maintain, such as 'habits':

```js
const habits = [
  { id: 1, name: 'Read books', completionDates: ['3-10-2024', '4-10-2024'], createdOn: '20-09-2024' },
  { id: 2, name: 'Go To Gym', completionDates: ['2-10-2024', '4-10-2024'], createdOn: '20-09-2024' }
];
```

Here's how your components might look:

1. **Count**: Maintain the habits count.
2. **Add Habit**: Form to add a habit.
3. **List Habit**: Display all the habits.
4. **Stats**: Show some statistics based on the habits data.

Passing the habit array as props every time makes this unmanageable. So, we use a library to manage the state.

### Redux

Redux is a JavaScript library for managing state.

### Getting Started

In this React application, we need to install the `redux-toolkit` package along with `redux`. This is the standard instruction given on the Redux Toolkit website.

We need a "store" to store, manage, and update our data. Redux uses "Actions" to update the store, and a view to display the data.

Usually, our data can be in an array or an object. These are mutable, meaning you can add, remove, or update items. However, for our Redux store, we do not want to mutate the existing array. The best practice is to create a copy of the array/object and then apply actions to the newly created data. (A copy is created using spread operators.)

Redux expects all state updates to be done immutably.

### Redux Terminologies

- **Action**: An action is a plain JavaScript object that has `type` and `payload` keys. `type` describes the action (e.g., `addHabits`), and `payload` contains the information.

```js
const addHabits = {
  type: 'addHabits',
  payload: { name: 'Go to Gym', createdOn: '5-10-2024' },
};
```

- **Reducers**: A reducer is a function that receives the current `state` and `action` object and decides how to update the state if required. It then returns a new state.

Reducers must always follow some rules:

- They should calculate the new state value based on the state and action arguments.
- They cannot modify the existing state.
- They cannot perform any async tasks, complex calculations, or cause any side effects.

- **Store**: The store is an object where the current state of the application resides. The `configureStore` method from Redux Toolkit is used to configure a store, and we need to pass in the reducer to get started.

- **Slice**: A slice categorizes how you want to maintain your application state. For example, a slice can be for a "cart", another slice can be for "products", and so on. We use the `createSlice` method from Redux Toolkit, which takes an object containing `name`, `initialState`, and `reducers`.

- **Dispatch**: How do we update the state? We use the `useDispatch` hook from the `react-redux` library.

```js
const dispatch = useDispatch();

dispatch(addHabits({ type: 'addHabits', payload: { name: 'Go to Gym' } }));
```
