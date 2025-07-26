function initAuth() {
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Show loading state
            const submitBtn = document.getElementById('loginBtn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Signing in...';
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // For demo purposes, just redirect
                window.location.href = 'dashboard.html';
            } catch (error) {
                showAlert('error', 'Login failed. Please check your credentials.');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Sign In';
            }
        });
    }

    // Registration form handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                password: document.getElementById('password').value,
                businessName: document.getElementById('businessName').value,
                businessType: document.getElementById('businessType').value
            };
            
            if (formData.password !== document.getElementById('confirmPassword').value) {
                return showAlert('error', 'Passwords do not match');
            }

            // Show loading state
            const submitBtn = document.getElementById('registerBtn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Registering...';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // For demo purposes, just redirect
                showAlert('success', 'Registration successful! Redirecting to dashboard...');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } catch (error) {
                showAlert('error', 'Registration failed. Please try again.');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Create Account';
            }
        });
    }

    // Password reset handling
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            
            // Show loading state
            const submitBtn = document.getElementById('resetBtn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            
            // Simulate API call
            setTimeout(() => {
                showAlert('success', `Password reset link sent to ${email}`);
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Reset Link';
            }, 1500);
        });
    }

    // Show alert message
    function showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`;
        alertDiv.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'} mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.classList.add('opacity-0', 'transition-opacity', 'duration-500');
            setTimeout(() => alertDiv.remove(), 500);
        }, 3000);
    }
}

if (typeof initAuth === 'function') {
    document.addEventListener('DOMContentLoaded', initAuth);
}

