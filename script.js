// FacePulse - JavaScript Functionality

// Global state management
let currentUser = null;
let currentPage = 'login-page';
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Demo data
const demoUsers = {
    student: {
        username: 'student',
        password: 'student123',
        role: 'student',
        data: {
            id: 'STU001',
            name: 'John Doe',
            program: 'Computer Science',
            year: '3rd Year',
            attendanceToday: false,
            totalClasses: 45,
            attendedClasses: 38,
            attendanceRate: 84
        }
    },
    teacher: {
        username: 'teacher',
        password: 'teacher123',
        role: 'teacher',
        data: {
            id: 'TCH001',
            name: 'Dr. Sarah Johnson',
            department: 'Computer Science Department',
            totalStudents: 127,
            presentToday: 98,
            avgAttendance: 87,
            classesThisWeek: 15
        }
    }
};

const demoStudents = [
    { id: 'STU001', name: 'John Doe', program: 'Computer Science', year: '3rd', attendance: 84 },
    { id: 'STU002', name: 'Jane Smith', program: 'Information Technology', year: '2nd', attendance: 92 },
    { id: 'STU003', name: 'Michael Johnson', program: 'Software Engineering', year: '4th', attendance: 76 },
    { id: 'STU004', name: 'Emily Davis', program: 'Computer Science', year: '3rd', attendance: 88 },
    { id: 'STU005', name: 'David Wilson', program: 'Data Science', year: '1st', attendance: 95 },
    { id: 'STU006', name: 'Sarah Brown', program: 'Cybersecurity', year: '2nd', attendance: 67 },
    { id: 'STU007', name: 'James Miller', program: 'Computer Science', year: '4th', attendance: 89 },
    { id: 'STU008', name: 'Lisa Anderson', program: 'Information Technology', year: '3rd', attendance: 82 }
];

const demoClasses = [
    {
        subject: 'Data Structures',
        date: '2024-01-15',
        time: '10:00 AM',
        room: 'CS-201',
        attendanceRate: 85,
        presentCount: 34,
        totalCount: 40
    },
    {
        subject: 'Algorithms',
        date: '2024-01-14',
        time: '2:00 PM',
        room: 'CS-102',
        attendanceRate: 92,
        presentCount: 46,
        totalCount: 50
    },
    {
        subject: 'Database Systems',
        date: '2024-01-13',
        time: '11:00 AM',
        room: 'CS-301',
        attendanceRate: 78,
        presentCount: 31,
        totalCount: 40
    },
    {
        subject: 'Software Engineering',
        date: '2024-01-12',
        time: '9:00 AM',
        room: 'CS-401',
        attendanceRate: 88,
        presentCount: 35,
        totalCount: 40
    }
];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Apply saved theme
    applyTheme();
    
    // Initialize particles
    initializeParticles();
    
    // Set up event listeners
    setupEventListeners();
    
    // Show initial page
    showPage('login-page');
    
    console.log('FacePulse initialized');
}

// Theme Management
function applyTheme() {
    document.body.classList.toggle('dark', isDarkMode);
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    
    if (sunIcon && moonIcon) {
        sunIcon.style.display = isDarkMode ? 'none' : 'block';
        moonIcon.style.display = isDarkMode ? 'block' : 'none';
    }
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    applyTheme();
}

// Particle Animation System
function initializeParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 4 + 2; // 2-6px
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 3 + 3; // 3-6s
    const delay = Math.random() * 2; // 0-2s
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createParticle(container);
        }
    }, (duration + delay) * 1000);
}

// Event Listeners Setup
function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Role selector buttons
    const roleButtons = document.querySelectorAll('.role-btn');
    roleButtons.forEach(btn => {
        btn.addEventListener('click', () => selectRole(btn.dataset.role));
    });
    
    // Back button
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (currentUser) {
                showPage(currentUser.role === 'student' ? 'student-dashboard' : 'teacher-dashboard');
            } else {
                showPage('login-page');
            }
        });
    }
    
    // Face scan buttons
    const startScanBtn = document.getElementById('start-scan-btn');
    const scanAgainBtn = document.getElementById('scan-again-btn');
    
    if (startScanBtn) {
        startScanBtn.addEventListener('click', startFaceScan);
    }
    
    if (scanAgainBtn) {
        scanAgainBtn.addEventListener('click', resetFaceScan);
    }
    
    // Dashboard buttons
    const markAttendanceBtn = document.getElementById('mark-attendance-btn');
    const actionMarkAttendance = document.getElementById('action-mark-attendance');
    
    if (markAttendanceBtn) {
        markAttendanceBtn.addEventListener('click', () => showPage('face-scan-page'));
    }
    
    if (actionMarkAttendance) {
        actionMarkAttendance.addEventListener('click', () => showPage('face-scan-page'));
    }
    
    // Logout buttons
    const studentLogoutBtn = document.getElementById('student-logout-btn');
    const teacherLogoutBtn = document.getElementById('teacher-logout-btn');
    
    if (studentLogoutBtn) {
        studentLogoutBtn.addEventListener('click', logout);
    }
    
    if (teacherLogoutBtn) {
        teacherLogoutBtn.addEventListener('click', logout);
    }
    
    // Quick action buttons
    const actionViewSchedule = document.getElementById('action-view-schedule');
    const actionDownloadReport = document.getElementById('action-download-report');
    
    if (actionViewSchedule) {
        actionViewSchedule.addEventListener('click', () => {
            console.log('View schedule clicked');
            // Placeholder for schedule functionality
            alert('Schedule feature coming soon!');
        });
    }
    
    if (actionDownloadReport) {
        actionDownloadReport.addEventListener('click', () => {
            console.log('Download report clicked');
            // Placeholder for report download
            alert('Report download feature coming soon!');
        });
    }
    
    // Teacher dashboard tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    // Student search
    const studentSearch = document.getElementById('student-search');
    if (studentSearch) {
        studentSearch.addEventListener('input', filterStudents);
    }
}

// Page Management
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Initialize page-specific content
        switch(pageId) {
            case 'student-dashboard':
                initializeStudentDashboard();
                break;
            case 'teacher-dashboard':
                initializeTeacherDashboard();
                break;
            case 'face-scan-page':
                initializeFaceScan();
                break;
        }
    }
}

// Login Functionality
function selectRole(role) {
    const roleButtons = document.querySelectorAll('.role-btn');
    roleButtons.forEach(btn => btn.classList.remove('active'));
    
    const selectedBtn = document.querySelector(`[data-role="${role}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }
    
    const btnText = document.getElementById('btn-text');
    if (btnText) {
        btnText.textContent = `Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}`;
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const selectedRole = document.querySelector('.role-btn.active').dataset.role;
    
    console.log('Login attempted:', username, password, selectedRole);
    
    const loginBtn = document.getElementById('login-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoader = document.getElementById('btn-loader');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'block';
    loginBtn.disabled = true;
    
    // Simulate login delay
    setTimeout(() => {
        // Check demo credentials
        let user = null;
        
        if (username === demoUsers.student.username && password === demoUsers.student.password) {
            user = demoUsers.student;
        } else if (username === demoUsers.teacher.username && password === demoUsers.teacher.password) {
            user = demoUsers.teacher;
        }
        
        // Reset button state
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
        loginBtn.disabled = false;
        
        if (user) {
            currentUser = user;
            console.log('User logged in:', user);
            
            // Redirect to appropriate dashboard
            if (user.role === 'student') {
                showPage('student-dashboard');
            } else if (user.role === 'teacher') {
                showPage('teacher-dashboard');
            }
            
            // Clear form
            document.getElementById('login-form').reset();
        } else {
            alert('Invalid credentials. Please use the demo credentials provided.');
        }
    }, 1000);
}

function logout() {
    console.log('User logged out');
    currentUser = null;
    showPage('login-page');
}

// Face Scanning Functionality
function initializeFaceScan() {
    resetFaceScan();
    initializeCamera();
}

function initializeCamera() {
    const video = document.getElementById('camera-feed');
    if (!video) return;
    
    // Create a placeholder camera feed
    video.style.background = 'linear-gradient(45deg, #22c55e, #16a34a)';
    video.style.position = 'relative';
    
    // Add face outline overlay
    setTimeout(() => {
        addFaceOutline();
    }, 1000);
}

function addFaceOutline() {
    const overlay = document.querySelector('.scan-overlay');
    const faceCircle = document.getElementById('face-circle');
    
    if (faceCircle) {
        faceCircle.style.border = '2px solid rgba(34, 197, 94, 0.8)';
    }
}

function startFaceScan() {
    const startBtn = document.getElementById('start-scan-btn');
    const scanAgainBtn = document.getElementById('scan-again-btn');
    const statusIcon = document.getElementById('status-icon');
    const statusText = document.getElementById('status-text');
    const scanStatus = document.getElementById('scan-status');
    const progressContainer = document.getElementById('progress-container');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const studentInfo = document.getElementById('student-info');
    const faceCircle = document.getElementById('face-circle');
    
    // Hide start button, show progress
    startBtn.style.display = 'none';
    progressContainer.style.display = 'block';
    
    // Update status
    scanStatus.classList.add('scanning');
    statusText.textContent = 'Scanning face...';
    faceCircle.classList.add('scanning');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5; // Random progress increment
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            completeFaceScan();
        }
        
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}% Complete`;
    }, 200);
}

function completeFaceScan() {
    const scanStatus = document.getElementById('scan-status');
    const statusText = document.getElementById('status-text');
    const studentInfo = document.getElementById('student-info');
    const scanAgainBtn = document.getElementById('scan-again-btn');
    const faceCircle = document.getElementById('face-circle');
    
    // Update to success state
    scanStatus.classList.remove('scanning');
    scanStatus.classList.add('success');
    statusText.textContent = 'Face recognized successfully!';
    faceCircle.classList.remove('scanning');
    faceCircle.classList.add('success');
    
    // Show student info
    studentInfo.style.display = 'block';
    scanAgainBtn.style.display = 'block';
    
    // Update student data
    if (currentUser && currentUser.role === 'student') {
        const userData = currentUser.data;
        document.getElementById('student-name').textContent = userData.name;
        document.getElementById('student-id').textContent = userData.id;
        document.getElementById('student-program').textContent = userData.program;
        document.getElementById('student-year').textContent = userData.year;
        
        // Mark attendance
        if (!userData.attendanceToday) {
            userData.attendanceToday = true;
            userData.attendedClasses++;
            userData.attendanceRate = Math.round((userData.attendedClasses / userData.totalClasses) * 100);
        }
    }
    
    console.log('Scan completed:', {
        success: true,
        studentData: currentUser?.data
    });
}

function resetFaceScan() {
    const startBtn = document.getElementById('start-scan-btn');
    const scanAgainBtn = document.getElementById('scan-again-btn');
    const scanStatus = document.getElementById('scan-status');
    const statusText = document.getElementById('status-text');
    const progressContainer = document.getElementById('progress-container');
    const progressFill = document.getElementById('progress-fill');
    const studentInfo = document.getElementById('student-info');
    const faceCircle = document.getElementById('face-circle');
    
    // Reset UI state
    startBtn.style.display = 'block';
    scanAgainBtn.style.display = 'none';
    progressContainer.style.display = 'none';
    studentInfo.style.display = 'none';
    
    // Reset status
    scanStatus.classList.remove('scanning', 'success', 'error');
    statusText.textContent = 'Position your face in the center';
    faceCircle.classList.remove('scanning', 'success', 'error');
    
    // Reset progress
    progressFill.style.width = '0%';
}

// Student Dashboard
function initializeStudentDashboard() {
    if (!currentUser || currentUser.role !== 'student') return;
    
    const userData = currentUser.data;
    
    // Update welcome message
    const welcomeMsg = document.getElementById('student-welcome');
    const detailsMsg = document.getElementById('student-details');
    
    if (welcomeMsg) welcomeMsg.textContent = `Welcome, ${userData.name}`;
    if (detailsMsg) detailsMsg.textContent = `${userData.program} • ${userData.year} • ID: ${userData.id}`;
    
    // Update stats
    document.getElementById('total-classes').textContent = userData.totalClasses;
    document.getElementById('attended-classes').textContent = userData.attendedClasses;
    document.getElementById('attendance-rate').textContent = `${userData.attendanceRate}%`;
    
    const todayStatus = document.getElementById('today-status');
    if (todayStatus) {
        todayStatus.textContent = userData.attendanceToday ? 'Present' : 'Absent';
        todayStatus.className = `stat-badge ${userData.attendanceToday ? 'present' : 'absent'}`;
    }
    
    // Update progress bars
    const overallProgress = document.getElementById('overall-progress');
    if (overallProgress) {
        overallProgress.style.width = `${userData.attendanceRate}%`;
    }
}

// Teacher Dashboard
function initializeTeacherDashboard() {
    if (!currentUser || currentUser.role !== 'teacher') return;
    
    const userData = currentUser.data;
    
    // Update welcome message
    const welcomeMsg = document.getElementById('teacher-welcome');
    const detailsMsg = document.getElementById('teacher-details');
    
    if (welcomeMsg) welcomeMsg.textContent = `Welcome, ${userData.name}`;
    if (detailsMsg) detailsMsg.textContent = `${userData.department} • ID: ${userData.id}`;
    
    // Initialize students table
    populateStudentsTable();
    
    // Initialize classes list
    populateClassesList();
}

function populateStudentsTable() {
    const tableBody = document.getElementById('students-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    demoStudents.forEach(student => {
        const row = document.createElement('div');
        row.className = 'table-row';
        
        const attendanceClass = student.attendance >= 85 ? 'good' : student.attendance >= 75 ? '' : 'poor';
        const statusClass = student.attendance >= 75 ? 'present' : 'absent';
        const statusText = student.attendance >= 75 ? 'Active' : 'At Risk';
        
        row.innerHTML = `
            <div class="student-info-cell">
                <div class="student-avatar">${student.name.split(' ').map(n => n[0]).join('')}</div>
                <div class="student-name">${student.name}</div>
            </div>
            <div class="cell-content">${student.id}</div>
            <div class="cell-content">${student.program}</div>
            <div class="cell-content">${student.year}</div>
            <div class="attendance-percentage ${attendanceClass}">${student.attendance}%</div>
            <div class="attendance-badge ${statusClass}">${statusText}</div>
        `;
        
        tableBody.appendChild(row);
    });
}

function populateClassesList() {
    const classesList = document.getElementById('classes-list');
    if (!classesList) return;
    
    classesList.innerHTML = '';
    
    demoClasses.forEach(classItem => {
        const classDiv = document.createElement('div');
        classDiv.className = 'class-item';
        
        classDiv.innerHTML = `
            <div class="class-header">
                <div class="class-info">
                    <h4>${classItem.subject}</h4>
                    <div class="class-meta">
                        <span>${classItem.date}</span>
                        <span>${classItem.time}</span>
                        <span>Room: ${classItem.room}</span>
                    </div>
                </div>
                <div class="class-stats">
                    <div class="attendance-rate">${classItem.attendanceRate}%</div>
                    <div class="attendance-count">${classItem.presentCount}/${classItem.totalCount} present</div>
                    <button class="view-details-btn">View Details</button>
                </div>
            </div>
        `;
        
        classesList.appendChild(classDiv);
    });
}

function switchTab(tabName) {
    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    // Update tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    const activeContent = document.getElementById(`${tabName}-tab`);
    if (activeContent) activeContent.classList.add('active');
}

function filterStudents() {
    const searchTerm = document.getElementById('student-search').value.toLowerCase();
    const tableRows = document.querySelectorAll('#students-table-body .table-row');
    
    tableRows.forEach(row => {
        const studentName = row.querySelector('.student-name').textContent.toLowerCase();
        const studentId = row.querySelector('.cell-content').textContent.toLowerCase();
        
        if (studentName.includes(searchTerm) || studentId.includes(searchTerm)) {
            row.style.display = 'grid';
        } else {
            row.style.display = 'none';
        }
    });
}

// Utility Functions
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
}

function generateId() {
    return Math.random().toString(36).substring(2, 15);
}

// Animation helpers
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Handle window resize for particles
window.addEventListener('resize', () => {
    // Reinitialize particles on resize
    const particlesContainer = document.querySelector('.particles-container');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
        setTimeout(() => initializeParticles(), 100);
    }
});

// Export for debugging (in browser console)
window.FacePulse = {
    currentUser,
    demoUsers,
    showPage,
    toggleTheme,
    startFaceScan
};