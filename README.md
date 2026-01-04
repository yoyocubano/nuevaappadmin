# 🏆 Welux Admin App - Release Candidate 1
**Status:** ✅ RC1 OPERATIONAL

The official administration panel for Welux Events. This application provides full control over the core business operations, including content management, job postings, and live stream control.

---

## ✨ Core Features (RC1)

-   **Secure Authentication:** Robust login system powered by Supabase Auth, with role-based access control policies (RLS).
-   **Dashboard Overview:** A central hub displaying key metrics and providing quick access to all modules.
-   **Job Management:** Full CRUD (Create, Read, Update, Delete) functionality for managing job opportunities.
-   **Vlog Management:** Full CRUD capabilities for creating and managing video log entries for the public-facing app.
-   **Live Stream Control:** Real-time control over the live stream source, allowing administrators to change the YouTube video ID instantly.
-   **Premium UX:** A consistent and high-quality user experience featuring haptic feedback, unified design language, and clear loading/error states.

---

## 🚀 Tech Stack

-   **Expo** (React Native SDK)
-   **TypeScript**
-   **NativeWind** (Tailwind CSS for React Native)
-   **Supabase** (Backend as a Service: Auth, Database, RLS)
-   **React Navigation v6**

---

## 🎨 Design System

### Colors:
```javascript
primary: '#ecb613'        // Welux Gold
backgroundLight: '#FAF8F3' // Soft Cream
textPrimary: '#1f2937'   // Near Black
```

### Typography:
- **Primary:** System UI (Inter, San Francisco, etc.) for a clean, modern feel.

---

## 🔧 Installation

```bash
# Install dependencies
npm install

# Start the development server
npx expo start
```

---

## 📂 Project Structure

```
nuevaappadmin/
├── src/
│   ├── components/    # Reusable UI components (e.g., ScreenHeader)
│   ├── config/        # Environment variables
│   ├── context/       # React Context (e.g., AuthContext)
│   ├── hooks/         # Custom React hooks
│   ├── navigation/    # Navigation stack and types
│   ├── screens/       # Application screens (grouped by feature)
│   ├── services/      # Service configurations (e.g., Supabase, Haptics)
│   └── types/         # TypeScript type definitions (db types)
└── App.tsx            # App entry point
```

---

## 🎯 Future Roadmap (Post-RC1)

-   **Biometric Login:** Integration with Face ID / Fingerprint for faster, secure access.
-   **Push Notifications:** Alerts for significant events (e.g., new job applications).
-   **Advanced Analytics:** Deeper integration with the Dashboard for more detailed insights.
-   **Thumbnail Uploads:** Implement file storage for vlog and job thumbnails.

---

**Project Status:** ✅ RC1 - Deployed and Operational.
