module.exports = function (user) {
    if(user.role === 'admin') {
        return true;
    } else {
        return false;
    }
}