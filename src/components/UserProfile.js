var UserProfile = (function() {
    var getUser = function() {
      let userDetails = JSON.parse(localStorage.getItem('user'));
      return userDetails;
       // Or pull this from cookie/localStorage
    };
  
    var setUser = function(name) {
      // cookies.set('userLoggedIn', name, { path: '/' });
      // console.log(cookies.get('userLoggedIn')); // Pacman
      // localStorage.setItem('user', JSON.stringify(name));     
      // Also set this in cookie/localStorage
    };

    var getRole = function() {
        return localStorage.getItem('role');    // Or pull this from cookie/localStorage
      };
    
    var setRole = function(role) {
        localStorage.setItem('role', role)    
    // Also set this in cookie/localStorage
    };

    var setUserId = function(id) {
      localStorage.setItem('id',id);
    }

    var getUserId = function() {
      return localStorage.getItem('id');
    }
  
    return {
      getUser: getUser,
      setUser: setUser,
      getRole: getRole,
      setRole: setRole,
      setUserId: setUserId,
      getUserId: getUserId,
    }
  
  })();
  
  export default UserProfile;