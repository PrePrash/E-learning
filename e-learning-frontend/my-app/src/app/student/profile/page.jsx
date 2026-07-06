"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.data);
        setNameInput(res.data.data.name || "");
        setError(null);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateName = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/profile",
        { name: nameInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.data); // update profile immediately
      setModalOpen(false); // close modal
    } catch (err) {
      console.error(err);
      alert("Failed to update name");
    }
  };

  // Loading component
  if (loading) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.loadingCard}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Error component
  if (error) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.errorCard}>
          <div style={styles.errorIcon}>
            <svg width="32" height="32" fill="#ef4444" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 style={styles.errorTitle}>Profile Not Found</h2>
          <p style={styles.errorMessage}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={styles.retryButton}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.errorCard}>
          <div style={styles.userNotFoundIcon}>
            <svg width="32" height="32" fill="#9ca3af" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 style={styles.errorTitle}>User Not Found</h2>
          <p style={styles.errorMessage}>Unable to load user profile.</p>
        </div>
      </div>
    );
  }

  const roleConfig = {
    student: { color: "#3b82f6", label: "Student" },
    instructor: { color: "#f97316", label: "Instructor" },
    admin: { color: "#10b981", label: "Administrator" },
  };

  const currentRole = roleConfig[user.role] || { color: "#6b7280", label: user.role };

  const generateInitials = (name) => {
    if (!name) return "U";
    return name
      .trim()
      .split(" ")
      .filter(n => n.length > 0)
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const initials = generateInitials(user.name);

  const getAvatarColor = (str) => {
    const colors = [
      '#3b82f6', '#8b5cf6', '#ec4899', '#6366f1', 
      '#10b981', '#f59e0b', '#ef4444', '#14b8a6'
    ];
    const hash = str?.split('').reduce((a, b) => a + b.charCodeAt(0), 0) || 0;
    return colors[hash % colors.length];
  };

  const avatarColor = getAvatarColor(user.name || user.email);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.cardContainer}>
        {/* Main Profile Card */}
        <div style={styles.profileCard}>
          <div style={styles.header}>
            <div style={{...styles.avatar, backgroundColor: avatarColor}}>
              {initials}
            </div>
            <h1 style={styles.userName}>{user.name}</h1>
            <p style={styles.userEmail}>{user.email}</p>
          </div>

          <div style={styles.content}>
            <div style={styles.roleBadgeContainer}>
              <span style={{...styles.roleBadge, backgroundColor: currentRole.color}}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" style={styles.roleIcon}>
                  <path fillRule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.242a1 1 0 011.213-.727zM9.03 8l-1 4h2.94l1-4H9.03z" clipRule="evenodd" />
                </svg>
                {currentRole.label}
              </span>
            </div>

            <div style={styles.statsContainer}>
              <div style={styles.pointsCard}>
                <div style={styles.statNumber}>{user.points || 0}</div>
                <div style={styles.statLabel}>POINTS</div>
              </div>
              <div style={styles.badgesCard}>
                <div style={styles.statNumber}>{user.badges ? user.badges.length : 0}</div>
                <div style={styles.statLabel}>BADGES</div>
              </div>
            </div>

            <div style={styles.infoSection}>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Member Since</span>
                <span style={styles.infoValue}>
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Status</span>
                <span style={styles.statusContainer}>
                  <div style={styles.statusDot}></div>
                  Active
                </span>
              </div>
            </div>

            <div style={styles.buttonContainer}>
              <button style={styles.editButton} onClick={() => setModalOpen(true)}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Edit Name</h2>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button onClick={() => setModalOpen(false)}>Cancel</button>
              <button onClick={handleUpdateName}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
   modalOverlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    width: "300px",
  },
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #dbeafe 0%, #c7d2fe 50%, #e0e7ff 100%)',
    padding: '48px 16px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  
  cardContainer: {
    maxWidth: '448px',
    margin: '0 auto',
  },
  
  profileCard: {
    backgroundColor: 'white',
    borderRadius: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    transform: 'scale(1)',
    transition: 'all 0.3s ease',
  },
  
  header: {
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    padding: '32px 24px',
    textAlign: 'center',
    position: 'relative',
  },
  
  avatar: {
    width: '96px',
    height: '96px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 auto 16px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    border: '4px solid white',
  },
  
  userName: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    margin: '0 0 4px 0',
  },
  
  userEmail: {
    fontSize: '14px',
    color: '#bfdbfe',
    margin: 0,
  },
  
  content: {
    padding: '24px',
  },
  
  roleBadgeContainer: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  
  roleBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '8px 16px',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  },
  
  roleIcon: {
    marginRight: '8px',
  },
  
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '24px',
  },
  
  pointsCard: {
    textAlign: 'center',
    padding: '16px',
    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    borderRadius: '12px',
  },
  
  badgesCard: {
    textAlign: 'center',
    padding: '16px',
    background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
    borderRadius: '12px',
  },
  
  statNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: '4px',
  },
  
  statLabel: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#1e40af',
    letterSpacing: '0.05em',
  },
  
  infoSection: {
    marginBottom: '24px',
  },
  
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '14px',
    color: '#6b7280',
  },
  
  infoLabel: {
    fontWeight: '500',
  },
  
  infoValue: {
    color: '#374151',
  },
  
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
    color: '#374151',
  },
  
  statusDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    marginRight: '8px',
  },
  
  buttonContainer: {
    marginTop: '24px',
  },
  
  editButton: {
    width: '100%',
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
    transform: 'translateY(0)',
  },
  
  // Loading and Error States
  loadingCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    textAlign: 'center',
  },
  
  spinner: {
    width: '48px',
    height: '48px',
    border: '2px solid #f3f4f6',
    borderTopColor: '#3b82f6',
    borderRadius: '50%',
    margin: '0 auto',
    animation: 'spin 1s linear infinite',
  },
  
  loadingText: {
    color: '#6b7280',
    marginTop: '16px',
    textAlign: 'center',
  },
  
  errorCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    maxWidth: '448px',
    textAlign: 'center',
  },
  
  errorIcon: {
    width: '64px',
    height: '64px',
    backgroundColor: '#fef2f2',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },
  
  userNotFoundIcon: {
    width: '64px',
    height: '64px',
    backgroundColor: '#f9fafb',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },
  
  errorTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    margin: '0 0 8px 0',
  },
  
  errorMessage: {
    color: '#6b7280',
    marginBottom: '24px',
  },
  
  retryButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '8px 24px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
};

// CSS for animations
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  button:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
  }
  
  .profile-card:hover {
    transform: scale(1.02) !important;
  }
`;
document.head.appendChild(styleSheet);