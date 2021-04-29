module.exports = function (user) {
    if(user.role !== 'guest') {
        return true;
    } else {
        return false;
    }
}