// JS Logic for login.html (Auth & Onboarding)
// Requires api.js and app.js

// ── Allowed email domains (client-side mirror of backend list) ─────────────────
const ALLOWED_EMAIL_DOMAINS = new Set([
  'gmail.com', 'yahoo.com', 'yahoo.in', 'yahoo.co.uk',
  'outlook.com', 'hotmail.com', 'live.com',
  'icloud.com', 'me.com',
  'saveetha.com', 'saveetha.ac.in',
  'protonmail.com', 'proton.me',
  'zoho.com', 'rediffmail.com',
]);

function validateEmail(email) {
  const at = email.indexOf('@');
  if (at < 0) return 'Please enter a valid email address.';
  const domain = email.slice(at + 1).toLowerCase();
  if (!ALLOWED_EMAIL_DOMAINS.has(domain)) {
    return `Email domain "@${domain}" is not allowed. Please use Gmail, Yahoo, Outlook, Saveetha, or similar.`;
  }
  return null;
}

function validatePassword(pwd) {
  if (pwd.length < 8)           return 'Password must be at least 8 characters long.';
  if (!/[A-Z]/.test(pwd))       return 'Password must contain at least one uppercase letter.';
  if (!/[a-z]/.test(pwd))       return 'Password must contain at least one lowercase letter.';
  if (!/[0-9]/.test(pwd))       return 'Password must contain at least one number.';
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd))
    return 'Password must contain at least one special character.';
  return null;
}

document.addEventListener('DOMContentLoaded', () => {
  // If already logged in, go to dashboard
  if (localStorage.getItem('learnflow_token')) {
    window.location.href = 'dashboard.html';
    return;
  }

  const tabLogin       = document.getElementById('tab-login');
  const tabSignup      = document.getElementById('tab-signup');
  const viewLogin      = document.getElementById('view-login');
  const viewSignup     = document.getElementById('view-signup');
  const viewSignupOtp  = document.getElementById('view-signup-otp');
  const viewForgot     = document.getElementById('view-forgot');
  const modalOnboarding = document.getElementById('modal-onboarding');

  // State saved between signup step 1 → step 2
  let signupData = { name: '', email: '', password: '' };

  // ── Tab switching ──────────────────────────────────────────────────────────
  function showLogin() {
    tabLogin.classList.add('active'); tabSignup.classList.remove('active');
    viewLogin.classList.remove('hidden');
    [viewSignup, viewSignupOtp, viewForgot].forEach(v => v.classList.add('hidden'));
  }
  function showSignup() {
    tabSignup.classList.add('active'); tabLogin.classList.remove('active');
    viewSignup.classList.remove('hidden');
    [viewLogin, viewSignupOtp, viewForgot].forEach(v => v.classList.add('hidden'));
  }

  tabLogin.addEventListener('click', showLogin);
  tabSignup.addEventListener('click', showSignup);

  // Auto-switch to signup if ?tab=signup
  if (new URLSearchParams(window.location.search).get('tab') === 'signup') showSignup();

  // Navigation
  document.getElementById('link-forgot').addEventListener('click', (e) => {
    e.preventDefault();
    viewLogin.classList.add('hidden');
    viewForgot.classList.remove('hidden');
  });
  document.querySelectorAll('.link-back').forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    viewForgot.classList.add('hidden');
    viewLogin.classList.remove('hidden');
  }));

  // ── Password Visibility Toggles ────────────────────────────────────────────
  document.querySelectorAll('.pwd-toggle').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const targetId = this.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;
      
      const newType = input.type === 'password' ? 'text' : 'password';
      input.type = newType;
      
      if (newType === 'text') {
        this.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events:none;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
      } else {
        this.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events:none;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
      }
    });
  });

  // ── Signup Step 1: live helpers ────────────────────────────────────────────
  const suEmail     = document.getElementById('su-email');
  const suEmailHint = document.getElementById('su-email-hint');
  const suPwd       = document.getElementById('su-pwd');
  const pills = {
    upper: document.getElementById('sp-upper'),
    lower: document.getElementById('sp-lower'),
    digit: document.getElementById('sp-digit'),
    sym:   document.getElementById('sp-sym'),
    len:   document.getElementById('sp-len'),
  };

  // Email domain hint
  suEmail.addEventListener('input', () => {
    const email = suEmail.value.trim();
    const at = email.indexOf('@');
    if (at < 0 || at === email.length - 1) {
      suEmailHint.className = 'email-domain-hint';
      suEmailHint.textContent = '';
      return;
    }
    const domain = email.slice(at + 1).toLowerCase();
    if (ALLOWED_EMAIL_DOMAINS.has(domain)) {
      suEmailHint.className = 'email-domain-hint visible ok';
      suEmailHint.textContent = `@${domain} ✓`;
    } else {
      suEmailHint.className = 'email-domain-hint visible bad';
      suEmailHint.textContent = `@${domain} — domain not allowed`;
    }
  });

  // Password strength pills
  suPwd.addEventListener('input', () => {
    const pwd = suPwd.value;
    const toggle = (pill, test) => pill.classList.toggle('met', test);
    toggle(pills.upper, /[A-Z]/.test(pwd));
    toggle(pills.lower, /[a-z]/.test(pwd));
    toggle(pills.digit, /[0-9]/.test(pwd));
    toggle(pills.sym,   /[!@#$%^&*(),.?":{}|<>]/.test(pwd));
    toggle(pills.len,   pwd.length >= 8);
  });

  // ── Signup Step 1 submit: validate + send OTP ──────────────────────────────
  document.getElementById('form-signup').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn   = document.getElementById('su-send-btn');
    const name  = document.getElementById('su-name').value.trim();
    const email = suEmail.value.trim();
    const pwd   = suPwd.value;

    if (name.length < 3) return showToast('Full name must be at least 3 characters long.', 'error');
    if (/\d/.test(name)) return showToast('Full name cannot contain numbers.', 'error');

    const emailErr = validateEmail(email);
    if (emailErr) return showToast(emailErr, 'error');

    const pwdErr = validatePassword(pwd);
    if (pwdErr) return showToast(pwdErr, 'error');

    setLoading(btn, true);
    try {
      await api.auth.sendSignupOtp(email);
      // Save for step 2
      signupData = { name, email, password: pwd };
      document.getElementById('su-otp-email-display').textContent = email;
      document.getElementById('su-otp-code').value = '';
      viewSignup.classList.add('hidden');
      viewSignupOtp.classList.remove('hidden');
      showToast('Verification code sent to your email!', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(btn, false);
    }
  });

  // ── Signup Step 2: verify OTP + register ───────────────────────────────────
  document.getElementById('form-signup-otp').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('su-otp-verify-btn');
    const otp = document.getElementById('su-otp-code').value.trim();

    if (otp.length !== 6) return showToast('Please enter the 6-digit code.', 'error');

    setLoading(btn, true);
    try {
      await api.auth.register(signupData.name, signupData.email, signupData.password, otp);
      // Auto-login
      const res = await api.auth.login(signupData.email, signupData.password);
      setToken(res.access_token);

      // Show onboarding
      document.querySelector('.auth-card').classList.add('hidden');
      modalOnboarding.classList.add('open');
      initOnboardingFlow();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(btn, false);
    }
  });

  // Resend code
  document.getElementById('su-resend-btn').addEventListener('click', async () => {
    const btn = document.getElementById('su-resend-btn');
    btn.disabled = true;
    try {
      await api.auth.sendSignupOtp(signupData.email);
      showToast('New code sent!', 'success');
      document.getElementById('su-otp-code').value = '';
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      btn.disabled = false;
    }
  });

  // Back from OTP to details form
  document.getElementById('su-back-btn').addEventListener('click', () => {
    viewSignupOtp.classList.add('hidden');
    viewSignup.classList.remove('hidden');
  });

  // ── Login Flow ─────────────────────────────────────────────────────────────
  document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn   = e.target.querySelector('button[type="submit"]');
    const email = document.getElementById('lo-email').value;
    const pwd   = document.getElementById('lo-pwd').value;

    setLoading(btn, true);
    try {
      const res = await api.auth.login(email, pwd);
      setToken(res.access_token);
      if (res.user) saveUser(res.user);
      window.location.href = 'dashboard.html';
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(btn, false);
    }
  });

  // ── Forgot Password Flow ───────────────────────────────────────────────────
  const fpSendBtn  = document.getElementById('fp-send-btn');
  const fpResetBtn = document.getElementById('fp-reset-btn');
  const fpCodeBox  = document.getElementById('fp-code-box');
  const fpPwdBox   = document.getElementById('fp-pwd-box');

  fpSendBtn.addEventListener('click', async () => {
    const email = document.getElementById('fp-email').value;
    if (!email) return showToast('Enter email first', 'error');
    setLoading(fpSendBtn, true);
    try {
      await api.auth.forgotPassword(email);
      showToast('Reset code sent to email', 'success');
      fpCodeBox.classList.remove('hidden');
      fpPwdBox.classList.remove('hidden');
      fpSendBtn.classList.add('hidden');
      fpResetBtn.classList.remove('hidden');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(fpSendBtn, false);
    }
  });

  document.getElementById('form-forgot').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('fp-email').value;
    const code  = document.getElementById('fp-code').value;
    const pwd   = document.getElementById('fp-pwd').value;

    const error = validatePassword(pwd);
    if (error) return showToast(error, 'error');

    setLoading(fpResetBtn, true);
    try {
      await api.auth.resetPassword(email, code, pwd);
      showToast('Password reset successful', 'success');
      viewForgot.classList.add('hidden');
      viewLogin.classList.remove('hidden');
      document.getElementById('lo-email').value = email;
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(fpResetBtn, false);
    }
  });

  // ── Onboarding ─────────────────────────────────────────────────────────────
  function initOnboardingFlow() {
    let step = 1;
    const views = [
      document.getElementById('ob-step-1'),
      document.getElementById('ob-step-2'),
      document.getElementById('ob-step-3')
    ];
    const data = { goal: '', experience_level: '', learning_style: '', weekly_hours: 5, target_completion: '3 months' };

    document.querySelectorAll('.ob-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const parent = opt.closest('.step-view');
        parent.querySelectorAll('.ob-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        data[opt.dataset.type] = opt.dataset.val;
      });
    });

    document.querySelectorAll('.ob-next').forEach(btn => btn.addEventListener('click', async () => {
      if (step === 1 && !data.goal) return showToast('Please select a goal to continue.', 'error');
      if (step === 2 && !data.experience_level) return showToast('Please select your experience level.', 'error');
      if (step === 3 && !data.learning_style) return showToast('Please select how you learn best.', 'error');

      if (step < 3) {
        views[step - 1].classList.add('hidden');
        views[step].classList.remove('hidden');
        step++;
      } else {
        setLoading(btn, true);
        try {
          const user = await api.auth.onboarding(data);
          saveUser(user);
          window.location.href = 'dashboard.html';
        } catch (err) {
          showToast(err.message, 'error');
          setLoading(btn, false);
        }
      }
    }));
  }
});
