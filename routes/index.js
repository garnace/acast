exports.userlist = function (req, res) {
var db = req.db;
var collection = db.get('usercollection'); // error in this line
collection.find({}, {}, function (e, docs) {
    res.render('userList', {
        "userlist": docs
    });
});
};
