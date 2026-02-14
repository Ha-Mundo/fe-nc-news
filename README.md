# NC-News (Frontend)

This repository contains the **frontend** application for a full-stack news platform. It is built with **React** and connects to a dedicated backend API to deliver a dynamic, real-time user experience.

The goal of this project was to build a robust interface that handles complex data structures, advanced state management, and provides a seamless C.R.U.D experience.

The project features a default, logged-in user: **tickle122**.

## 🚀 Key Features

### Articles & Interactions
- **Browse & Filter**: Explore articles by topic with a responsive layout.
- **Dynamic Voting**: Upvote or downvote articles with immediate visual feedback.
- **Voting Persistence**: Uses `localStorage` to ensure a user's vote status is remembered across sessions and navigation.
- **Advanced Sorting**: Sort articles by date, author, or topic in both ascending and descending order.

### Modern Comment System
- **Real-time Updates**: Add comments with immediate UI injection.
- **Optimistic UI & Rollback**: Actions like deleting comments are reflected instantly. If the server call fails, the app automatically performs a "rollback" to restore data integrity.
- **Lifting State Up**: Article comment counters are synchronized across different components in real-time without page refreshes.
- **User Control**: Users can manage and delete their own comments.

### Enhanced UX
- **Toast Notifications**: Integrated `react-hot-toast` for elegant, real-time feedback on user actions.
- **Responsive UI**: Optimized for mobile, tablet, and desktop screens.
- **Modular Code**: Clean architecture using specific components (like `CommentCard`) for better maintainability.

---

## 🛠️ Technologies Used

- **Framework**: React (Hooks, Context API, React Router)
- **Styling**: CSS3, Material UI Icons
- **Data Fetching**: Axios
- **Feedback**: React Hot Toast
- **Backend API**: [Hosted on Render](https://be-nc-news-hiai.onrender.com/api)

---

## 🔗 Links

- **Live Demo:** [nc-news-22](https://nc-news-22.netlify.app/)
- **Backend API Repository:** [be-nc-news](https://github.com/Ha-Mundo/be-nc-news)

---

### 1. Clone the repository
```bash
git clone https://github.com/Ha-Mundo/fe-nc-news.git

cd fe-nc-news
```

---

### 2. Install all dependencies

```bash
npm i
```

---

### 3. Run App in the browser

```bash
npm start
```

#### The app will open automatically at http://localhost:3000
---
Developed as part of a coding bootcamp to demonstrate frontend proficiency in a full-stack ecosystem.
