export const isAuthenticated = state => {
if(state.authR.auth.idToken) return true;
return false;
} 