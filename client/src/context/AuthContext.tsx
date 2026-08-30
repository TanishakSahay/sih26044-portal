import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Student } from '../types';
import { api } from '../services/api';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'credit' | 'match' | 'challenge' | 'eval';
  timestamp: string;
  read: boolean;
  roleTarget: UserRole | 'all';
}

interface AuthContextType {
  user: User;
  role: UserRole;
  studentProfile: Student | null;
  setRole: (role: UserRole) => void;
  switchRoleDemo: (role: UserRole) => void;
  notifications: NotificationItem[];
  unreadCount: number;
  markAllNotificationsRead: () => void;
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
}

const DEMO_USERS: Record<UserRole, User> = {
  student: {
    id: 'usr-student-1',
    name: 'Aarav Patel',
    email: 'aarav.patel@iitb.ac.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    collegeId: 'col-1',
    collegeName: 'IIT Bombay',
    title: 'Final Year B.Tech CSE'
  },
  tpo: {
    id: 'usr-tpo-1',
    name: 'Dr. Ramesh Sundaram',
    email: 'tpo.head@iitb.ac.in',
    role: 'tpo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    collegeId: 'col-1',
    collegeName: 'IIT Bombay',
    title: 'Head of Training & Placement'
  },
  recruiter: {
    id: 'usr-recruiter-1',
    name: 'Pooja Deshmukh',
    email: 'pooja.deshmukh@razorpay.com',
    role: 'recruiter',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    companyName: 'Razorpay',
    title: 'Lead Technical Talent Partner'
  }
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Pending Credit Sign-Off',
    message: 'Razorpay submitted intern evaluation (4.8/5) for Aarav Patel. 4 credits ready for 1-click approval.',
    type: 'credit',
    timestamp: '10m ago',
    read: false,
    roleTarget: 'tpo'
  },
  {
    id: 'notif-2',
    title: 'AI Skill Delta Matched',
    message: 'Razorpay posted "Fintech Backend Intern". Your skill match is 84% — 1 Docker challenge to 95%.',
    type: 'match',
    timestamp: '25m ago',
    read: false,
    roleTarget: 'student'
  },
  {
    id: 'notif-3',
    title: 'Top Verified Candidates',
    message: '5 candidates from IIT Bombay & NIT Trichy achieved >80% Verified Skill Scores for your job post.',
    type: 'eval',
    timestamp: '1h ago',
    read: false,
    roleTarget: 'recruiter'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('student');
  const [user, setUser] = useState<User>(DEMO_USERS.student);
  const [studentProfile, setStudentProfile] = useState<Student | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  useEffect(() => {
    setUser(DEMO_USERS[role]);
    if (role === 'student') {
      api.getStudentProfile('std-1').then(res => {
        if (res && res.student) {
          setStudentProfile(res.student);
        }
      });
    } else {
      setStudentProfile(null);
    }
  }, [role]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    setUser(DEMO_USERS[newRole]);
  };

  const switchRoleDemo = (newRole: UserRole) => {
    setRole(newRole);
  };

  const addNotification = (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read && (n.roleTarget === role || n.roleTarget === 'all')).length;

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        studentProfile,
        setRole,
        switchRoleDemo,
        notifications,
        unreadCount,
        markAllNotificationsRead,
        addNotification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
