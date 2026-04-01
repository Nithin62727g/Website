// Profile Logic

document.addEventListener('DOMContentLoaded', async () => {
  if (!requireAuth()) return;
  // Nav is handled in HTML/sidebar-container

  const u = getUser();
  if (u) renderUser(u);

  try {
    const freshUser = await api.auth.me();
    saveUser(freshUser);
    renderUser(freshUser);
  } catch (err) {
    if (err.status === 401) logout();
  }

  // Edit Email
  document.getElementById('form-email').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-save-email');
    const newMail = document.getElementById('edit-email').value;
    const pwd = document.getElementById('edit-email-pwd').value;

    setLoading(btn, true);
    try {
      const res = await api.auth.updateEmail(newMail, pwd);
      setToken(res.access_token);
      showToast('Email updated successfully', 'success');
      
      const updatedUser = await api.auth.me();
      saveUser(updatedUser);
      renderUser(updatedUser);
      document.getElementById('modal-email').classList.remove('open');
      document.getElementById('form-email').reset();
    } catch(err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(btn, false);
    }
  });

  // Edit Password
  document.getElementById('form-pwd').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-save-pwd');
    const oldPwd = document.getElementById('edit-pwd-old').value;
    const newPwd = document.getElementById('edit-pwd-new').value;

    const error = validatePassword(newPwd);
    if (error) return showToast(error, 'error');

    setLoading(btn, true);
    try {
      await api.auth.updatePassword(oldPwd, newPwd);
      showToast('Password updated successfully', 'success');
      document.getElementById('modal-password').classList.remove('open');
      document.getElementById('form-pwd').reset();
    } catch(err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(btn, false);
    }
  });

  // Edit Learning Style
  document.getElementById('form-style').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-save-style');
    const style = document.getElementById('edit-style').value;

    setLoading(btn, true);
    try {
      const res = await api.auth.onboarding({ learning_style: style });
      saveUser(res.user);
      renderUser(res.user);
      showToast('Learning style updated! 🧠', 'success');
      document.getElementById('modal-style').classList.remove('open');
    } catch(err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(btn, false);
    }
  });

  // Delete Account
  document.getElementById('btn-delete-account').addEventListener('click', async () => {
    const btn = document.getElementById('btn-delete-account');
    setLoading(btn, true, 'Deleting...');
    try {
      await api.auth.deleteAccount();
      showToast('Account deleted. We are sorry to see you go.', 'info');
      setTimeout(() => logout(), 1500);
    } catch(err) {
      showToast(err.message, 'error');
      setLoading(btn, false, 'Yes, Delete');
    }
  });

});

function renderUser(u) {
  document.getElementById('prof-name').textContent = u.name;
  document.getElementById('prof-email').textContent = u.email;
  document.getElementById('prof-xp').textContent = `${u.xp} XP`;
  document.getElementById('prof-initial').textContent = u.name.charAt(0).toUpperCase();
  if (u.learning_style) {
    document.getElementById('prof-style').textContent = u.learning_style;
  }
}

function validatePassword(pwd) {
  if (pwd.length < 8) return "Password must be at least 8 characters long";
  if (!/[A-Z]/.test(pwd)) return "Password must contain at least one uppercase letter";
  if (!/[0-9]/.test(pwd)) return "Password must contain at least one number";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return "Password must contain at least one special character";
  return null;
}

