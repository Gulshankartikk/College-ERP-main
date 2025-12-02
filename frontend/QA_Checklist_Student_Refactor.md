# QA Checklist: Student Pages Refactoring

## Overview
This checklist tracks the refactoring progress of the Student portal pages to ensure they adhere to the new design system (semantic colors, components, typography).

## Status Legend
- [ ] Pending
- [x] Completed
- [!] Issues Found

## Refactored Pages

### Dashboard & Profile
- [x] `StudentDashboardNew.jsx`
    - [x] Semantic colors used (no hardcoded hex/names)
    - [x] `font-heading` applied to titles
    - [x] `Card` component used
    - [x] `Badge` component used
    - [x] Responsive layout
- [x] `StudentProfile.jsx`
    - [x] Semantic colors used
    - [x] `font-heading` applied
    - [x] `Input`, `Button`, `Card` components used
    - [x] Edit mode functionality verified (visually)

### Academic
- [x] `StudentSubjects.jsx`
    - [x] Semantic colors used
    - [x] `Card`, `Badge`, `Button` components used
    - [x] Loading state handled
- [x] `StudentAttendance.jsx`
    - [x] Semantic colors used
    - [x] `Card`, `Badge` components used
    - [x] Table styling updated
    - [x] Stats visualization updated
- [x] `StudentTimetable.jsx`
    - [x] Semantic colors used
    - [x] `Card` component used
    - [x] Table styling updated
    - [x] Removed legacy headers/buttons
- [x] `StudentAssignments.jsx`
    - [x] Semantic colors used
    - [x] `Card`, `Badge`, `Button` components used
    - [x] Loading state handled
- [x] `StudentFees.jsx`
    - [x] Semantic colors used
    - [x] `Card`, `Button` components used
    - [x] Table styling updated
- [x] `StudentLeave.jsx`
    - [x] Semantic colors used
    - [x] `Card`, `Button`, `Input`, `Select`, `Modal` components used
    - [x] Form styling updated
- [x] `StudentLibrary.jsx`
    - [x] Semantic colors used
    - [x] `Card`, `Button`, `Input`, `Badge` components used
    - [x] Tab navigation updated
- [x] `StudentMarks.jsx`
    - [x] Semantic colors used
    - [x] `Card`, `Table`, `Badge`, `Select` components used
    - [x] Table styling updated
- [x] `StudentMaterials.jsx`
    - [x] Semantic colors used
    - [x] `Card`, `Button` components used
    - [x] Layout updated

### Pending Refactoring
- [x] `StudentNotes.jsx`
    - [x] Semantic colors used
    - [x] `Card`, `Button` components used
    - [x] Layout updated
- [x] `StudentNotices.jsx`
    - [x] Semantic colors used
    - [x] `Card` component used
    - [x] Layout updated
- [x] `StudentResources.jsx`
    - [x] Semantic colors used
    - [x] `Card`, `Button`, `Table`, `Badge` components used
    - [x] Tab navigation updated
    - [x] Resource cards updated

### Pending Refactoring
- [x] Verify `StudentProfile.jsx` navigation
- [ ] Backend Integration (Future Session)

## Common Issues to Watch For
- [ ] Hardcoded colors: `text-navy`, `bg-sky-blue`, `text-text-grey`, `bg-soft-grey`, `bg-red-100`, `text-red-800`
- [ ] Legacy components: `StudentHeader`, `BackButton` (should be removed if Sidebar is used)
- [ ] Native HTML elements: `input`, `select`, `button` (should be replaced with `Input`, `Select`, `Button`)
- [ ] Typography: Missing `font-heading` on titles
- [ ] Spacing: Inconsistent padding/margins

## Verification Steps
1.  **Visual Check:** Ensure the page looks consistent with the new design system.
2.  **Functional Check:** Ensure all interactive elements (buttons, forms, links) work as expected.
3.  **Responsiveness:** Check layout on mobile and desktop.
4.  **Console Errors:** Check for any runtime errors in the browser console.
