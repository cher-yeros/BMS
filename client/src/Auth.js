const Auth = {
  checkLoggedIn() {
    const pl = this.getCurrentUser();
    return pl == null ? false : true;
  },
  checkRole() {
    const pl = this.getCurrentUser();
    if (!this.checkLoggedIn()) {
      return "";
    } else {
      return pl?.role?.Name;
    }
  },
  getToken() {
    const pl = this.getCurrentUser();
    return pl?.token;
  },
  getCurrentUser() {
    const payload = localStorage.getItem("user-payload");
    return JSON.parse(payload);
  },
  getLoggedIn() {
    const payload = localStorage.getItem("user-payload");
    return JSON.parse(payload?.user);
  },
  login(payload) {
    localStorage.setItem("user-payload", JSON.stringify(payload));
  },
  logout() {
    localStorage.removeItem("user-payload");
  },
};

export default Auth;
