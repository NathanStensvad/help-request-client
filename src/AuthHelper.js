const AuthHelper = {
    getLoginInfo() {
      const infoStr = window.localStorage.getItem('loginInfo');
      return infoStr && JSON.parse(infoStr);
    },
  
    setLoginInfo(info) {   // { user, token }
      window.localStorage.setItem('loginInfo', JSON.stringify(info));
    },
  
    getToken() {
      const info = this.getLoginInfo();
      return info && info.token;
    },
  
    deleteLoginInfo() {
      window.localStorage.removeItem('loginInfo');
    }
  };

  export default AuthHelper