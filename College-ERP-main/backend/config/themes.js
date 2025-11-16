/**
 * Professional ERP Theme Configuration
 * College ERP System - UI Color Themes
 */

const themes = {
  // 1. Professional Blue Theme (Most Used in ERP)
  professionalBlue: {
    name: "Professional Blue",
    primary: "#1A73E8",
    secondary: "#185ABC", 
    accent: {
      success: "#34A853",
      warning: "#FBBC05"
    },
    background: {
      light: "#F5F7FA",
      white: "#FFFFFF"
    },
    text: {
      primary: "#1F1F1F",
      secondary: "#555555"
    }
  },

  // 2. Modern Navy + Cyan Theme (Premium ERP Look)
  modernNavy: {
    name: "Modern Navy + Cyan",
    primary: "#0F172A",
    secondary: "#38BDF8",
    accent: {
      darkBlue: "#1E40AF",
      orange: "#EA580C"
    },
    background: {
      light: "#F8FAFC"
    },
    text: {
      primary: "#0F172A",
      secondary: "#64748B"
    }
  },

  // 3. Purple + Indigo Theme (Modern UI/UX Style)
  purpleIndigo: {
    name: "Purple + Indigo",
    primary: "#6366F1",
    secondary: "#4F46E5",
    accent: {
      violet: "#A855F7",
      success: "#10B981"
    },
    background: {
      light: "#F9FAFB"
    },
    text: {
      primary: "#111827",
      secondary: "#6B7280"
    }
  },

  // 4. Green + Dark Theme (Eco-friendly Education Style)
  greenDark: {
    name: "Green + Dark",
    primary: "#16A34A",
    secondary: "#15803D",
    accent: {
      yellow: "#FACC15",
      blue: "#0284C7"
    },
    background: {
      dark: "#0F0F0F",
      light: "#F8FAFC"
    },
    text: {
      white: "#FFFFFF",
      secondary: "#D1D5DB"
    }
  },

  // 5. Dark Blue + Orange (Premium ERP/CRM Look)
  darkBlueOrange: {
    name: "Dark Blue + Orange",
    primary: "#003566",
    secondary: "#F77F00",
    accent: {
      darkBlue: "#001D3D",
      yellow: "#FFC300"
    },
    background: {
      light: "#F8F9FA"
    },
    text: {
      primary: "#212529"
    }
  },

  // Recommended UI Structure
  uiStructure: {
    sidebar: {
      dark: "#0F172A",
      medium: "#1E293B"
    },
    navbar: {
      light: "#FFFFFF"
    },
    buttons: {
      primary: "#1A73E8",
      danger: "#E53935",
      success: "#34A853"
    }
  }
};

module.exports = themes;