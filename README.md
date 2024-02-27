# Simple-React-Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In order to demonstrate a quick show of proficiency in Typescript and React please clone this project. Within this project you will see a standard React App that can be run by using `npm start`. Within the `src` folder you will find three Functional Components:`App.tsx`, `Counter.tsx` and `TrafficLight.tsx`.

Please modify only these components when completing this technical challenge. Please ensure the following components meet the following criteria:

### `Counter.tsx`

This component must do the following:

- It must have an increment, and decrement button that will increase or decrease a value by 1.
- It must display the current value
- It should be abstracted to be used multiple times and in such a way that it acts as a controlled component.

### `TrafficLight.tsx`

This component must do the following

- It must contain a prop named `state` that is an object that contains the keys `value` which is a number and `label` which is a string. **NOTE**: This prop is an OBJECT, these are not individual props, but a single prop that is an object containing those two fields (e.g. `<TrafficLight state={{ value: 0, label: 'foobar' }} />`)
- It must contain some element that changes color depending on `state.value` from red, to yellow, to green and then repeat that process for any value where 0 = red, 1 = yellow, 2 = green, 3 = red and so on...
- It must display the `state.label` value.

### `App.tsx`

This parent component must do the following:

- It must render two child `Counter` components, that each have their own counter value.
- It must keep track of any time any `Counter` child component updates its value. This should be noted as `Total clicks` and displayed. It does not matter if the counter is incremented or decremented, both actions are considered a click.
- It must render a child `TrafficLight` component whose `state.label` value is whatever you want it to be and whose `state.value` is driven by only _one_ of the `Counter` components above.

#### Other things of note

- **Optimize each component to only render when necessary.** Wasteful renders could be costly! (yes ok, for this level of complexity it obviously doesn't matter but lets pretend it does :) )
- Use explicit typing if it helps readability. And try to avoid any `any`'s!
- You can do more than the requirements listed above, so long as all the requirements above are met. Go hog wild if you wish.
- Don't overthink this. Its a pretty simple challenge, just meant to prove you know the basics. This shouldn't take you more than 30 minutes.
