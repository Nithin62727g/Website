/* LearnFlow AI API Client
 * Backend is hosted at a fixed remote server: http://180.235.121.253:8159
 * Override at runtime via localStorage key 'learnflow_api_base' if needed.
 */
const BACKEND_BASE_URL = 'http://180.235.121.253:8159';

function apiBaseUrl() {
  const stored = localStorage.getItem('learnflow_api_base');
  if (stored && stored.trim()) return stored.replace(/\/$/, '');
  return BACKEND_BASE_URL;
}

const FETCH_TIMEOUT_MS = 30000;

const api = {
  _token: () => localStorage.getItem('learnflow_token'),

  _headers() {
    const h = { 'Content-Type': 'application/json' };
    const token = this._token();
    if (token) h['Authorization'] = `Bearer ${token}`;
    return h;
  },

  baseUrl: () => apiBaseUrl(),

  async _fetch(method, path, body = null) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const base = apiBaseUrl();
    const opts = { method, headers: this._headers(), signal: controller.signal };
    if (body !== null) opts.body = JSON.stringify(body);
    try {
      const res = await fetch(`${base}${path}`, opts);
      clearTimeout(timeout);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 401 && typeof logout === 'function') logout();
        throw { status: res.status, message: data.error || data.detail || 'Request failed' };
      }
      return data;
    } catch (err) {
      clearTimeout(timeout);
      
      let errMsg = err.message;
      let errStatus = err.status;
      
      if (err.name === 'AbortError') {
        errStatus = 0;
        errMsg = `No response from API (${base}) within ${FETCH_TIMEOUT_MS / 1000}s.`;
      } else if (err instanceof TypeError && (String(err.message).includes('fetch') || String(err.message).includes('NetworkError'))) {
        errStatus = 0;
        errMsg = `Cannot reach API at ${base}. Please check your connection.`;
      }
      
      if (errStatus === 0 && typeof showToast === 'function') {
        showToast(errMsg, 'error');
      }
      
      throw { status: errStatus || 500, message: errMsg || 'Unknown error occurred' };
    }
  },

  get:    (path)       => api._fetch('GET',    path),
  post:   (path, body) => api._fetch('POST',   path, body),
  put:    (path, body) => api._fetch('PUT',    path, body),
  delete: (path)       => api._fetch('DELETE', path),

  auth: {
    login:          (email, password)               => api.post('/api/v1/auth/login', { email, password }),
    register:       (name, email, password, otp)    => api.post('/api/v1/auth/register', { name, email, password, otp }),
    sendSignupOtp:  (email)                         => api.post('/api/v1/auth/send-signup-otp', { email }),
    forgotPassword: (email)                         => api.post('/api/v1/auth/forgot-password', { email }),
    resetPassword:  (email, otp, new_password)      => api.post('/api/v1/auth/reset-password', { email, otp, new_password }),
    me:             ()                              => api.get('/api/v1/auth/me'),
    onboarding:     (data)                          => api.put('/api/v1/auth/me/onboarding', data),
    updateEmail:    (new_email, password)           => api.put('/api/v1/auth/me/email', { new_email, password }),
    updatePassword: (current_password, new_password)=> api.put('/api/v1/auth/me/password', { current_password, new_password }),
    deleteAccount:  ()                              => api.delete('/api/v1/auth/me'),
  },
  roadmaps: {
    list:         ()                                 => api.get('/api/v1/roadmaps/'),
    generate:     (topic, difficulty, hours_per_week)=> api.post('/api/v1/roadmaps/generate', { topic, difficulty, hours_per_week }),
    saveProgress: (topic_id)                         => api.put(`/api/v1/roadmaps/progress?topic_id=${encodeURIComponent(topic_id)}`),
    save:         (roadmap_id)                       => api.post(`/api/v1/roadmaps/${roadmap_id}/save`),
    saveOffline:  (data)                             => api.post('/api/v1/roadmaps/save-offline', data),
    delete:       (roadmap_id)                       => api.delete(`/api/v1/roadmaps/${roadmap_id}`),
  },
  mentor: {
    chat: (message, topic = 'General Programming', context = '') =>
              api.post('/api/v1/mentor/chat', { message, topic, context }),
  },
  quizzes: {
    generate: (topic, difficulty, curriculum) => api.post('/api/v1/quizzes/generate', { topic, difficulty, curriculum }),
    submit:   (topic, score, max_score) => api.post('/api/v1/quizzes/submit', { topic, score, max_score }),
  },
  career: {
    insights: (role) => api.get(`/api/v1/career/insights?role=${encodeURIComponent(role)}`),
  },
};
