# Teacher Pages Refactoring QA Checklist

## Overview
This checklist verifies the UI/UX refactoring of the Teacher pages in the College ERP application. The goal was to update hardcoded styles to semantic colors, apply consistent typography (`font-heading`), and replace native HTML elements with reusable UI components (`Button`, `Input`, `Select`, `Card`).

## Refactored Files

### 1. TeacherLeave.jsx
- [x] **Header/Navigation**: Removed `TeacherHeader` and `BackButton`.
- [x] **Typography**: Title "Leave Applications" uses `font-heading` and `text-secondary`.
- [x] **Colors**: Hardcoded colors (navy, sky-blue) replaced with `secondary`, `primary`, etc.
- [x] **Components**: `Button`, `Select`, `Input`, `Card` used.
- [x] **Modal**: Styled with `backdrop-blur-sm`, `rounded-xl`, and semantic colors.

### 2. TeacherMaterials.jsx
- [x] **Header/Navigation**: Removed `TeacherHeader` and `BackButton`.
- [x] **Typography**: Title "Study Materials" uses `font-heading`.
- [x] **Colors**: Semantic colors applied throughout.
- [x] **Components**: `Button`, `Select`, `Input`, `Card` used.
- [x] **Styling**: File input styled with semantic colors.

### 3. TeacherNotices.jsx
- [x] **Typography**: Title "My Notices" uses `font-heading`.
- [x] **Colors**: Semantic colors applied throughout.
- [x] **Components**: `Button`, `Select`, `Input`, `Card` used.
- [x] **Styling**: Notice cards have `border-gray-200` and hover effects.

### 4. TeacherResources.jsx
- [x] **Header/Navigation**: Removed `TeacherHeader` and `BackButton`.
- [x] **Typography**: Title "Learning Resources" uses `font-heading`.
- [x] **Colors**: Semantic colors applied throughout.
- [x] **Components**: `Button`, `Select`, `Input`, `Card` used.
- [x] **Styling**: Resource grid layout optimized.

### 5. TeacherSummary.jsx
- [x] **Typography**: Title "My Activity Summary" uses `font-heading`.
- [x] **Colors**: Semantic colors applied throughout.
- [x] **Components**: `Card` used for main content area.
- [x] **Styling**: Summary cards use semantic border colors.

### 6. TeacherTimetable.jsx
- [x] **Header/Navigation**: Removed `TeacherHeader` and `BackButton`.
- [x] **Typography**: Title "My Timetable" uses `font-heading`.
- [x] **Colors**: Semantic colors applied throughout.
- [x] **Components**: `Card` used for table container.
- [x] **Styling**: Table headers and rows styled with semantic colors.

### 7. TeacherUpload.jsx
- [x] **Typography**: Title "Upload Content" uses `font-heading`.
- [x] **Colors**: Semantic colors applied throughout.
- [x] **Components**: `Button`, `Select`, `Input`, `Card` used.
- [x] **Styling**: File upload area styled with dashed border and semantic colors.

### 8. AttendanceUpload.jsx
- [x] **Typography**: Title "Mark Attendance" uses `font-heading`.
- [x] **Colors**: Semantic colors applied throughout.
- [x] **Components**: `Button`, `Select`, `Input`, `Card`, `LoadingSpinner` used.
- [x] **Styling**: Student list items styled with consistent borders and padding.

### 9. StudentList.jsx
- [x] **Typography**: Title "Student Attendance" uses `font-heading`.
- [x] **Colors**: Semantic colors applied throughout.
- [x] **Components**: `Button`, `Select`, `Input`, `Card`, `LoadingSpinner` used.
- [x] **Styling**: Table styled with semantic colors and consistent spacing.

## Build Fixes
- [x] **index.css**: Fixed `text-text-primary` error by replacing it with `text-secondary` (same color value).

## Next Steps
1.  **Manual Testing**: Navigate through all Teacher pages to ensure no runtime errors.
2.  **Responsiveness Check**: Verify layout on mobile and tablet screens.
3.  **Data Integration**: Ensure all forms and lists interact correctly with the backend.
