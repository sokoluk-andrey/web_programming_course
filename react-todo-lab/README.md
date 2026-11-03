# Taskflow - React ToDo (Laboratory Work N2)

A ToDo application built with **React 18** and **Vite** for the Web Application Development Tools course (Lab Variant 10).

## Features
- Add tasks with priority (high / medium / low) and an optional due date
- Mark tasks as done, edit a task by double-clicking it, delete tasks
- Filter: All / Active / Done, and "Clear completed"
- Progress ring showing the share of completed tasks
- Tasks are saved in `localStorage` and survive a page reload
- Dynamic elements: page-load animation, staggered slide-in of tasks, slide-out on delete,
  shake + error message on empty input, animated checkbox, "Today" / "Overdue" due-date labels
- Responsive layout for mobile

## Run locally
```bash
npm install
npm run dev
```
Then open http://localhost:5173

## Build
```bash
npm run build
```
