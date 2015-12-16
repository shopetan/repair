// server.js

// 必要なパッケージの読み込み
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var fs         = require('fs');

// DBへの接続
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/repair');

// モデルの宣言
var User              = require('./app/models/user');
var EditProgram       = require('./app/models/edit_program');
var Support           = require('./app/models/support');
var Edit              = require('./app/models/edit');
var Exec              = require('./app/models/exec');


// POSTでdataを受け取るための記述
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 3000番を指定
var port = process.env.PORT || 3000;

// expressでAPIサーバを使うための準備
var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

// 正しく実行出来るか左記にアクセスしてテストする (GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'Successfully Posted a test message.' });
});

// /users というルートを作成する．
// ----------------------------------------------------
router.route('/users')

// ユーザの作成 (POST http://localhost:3000/api/users)
    .post(function(req, res) {

        // 新しいユーザのモデルを作成する．
        var user = new User();

        // ユーザの各カラムの情報を取得する．
        user.name = req.body.name;
        user.is_login = req.body.is_login;
        
        // ユーザ情報をセーブする．
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'User created!' });
        });
    })

// 全てのユーザ一覧を取得 (GET http://localhost:8080/api/users)
    .get(function(req, res) {

        //あるプログラムの作成者を表示する．
        if(req.query.programName != null){
            EditProgram.find({"name" : req.query.programName}, function(err,edit_program){
                if(err)
                    res.send(err);
                else{
                    edit_program.forEach(function(edit_program){
                        Edit.find({"e_id": edit_program._id},function(err,edit){
                            if(err)
                                res.send(err);
                            edit.forEach(function(edit){
                                User.findById(edit.u_id,function(err,user){
                                    if(err)
                                        res.send(err);
                                    res.json(user);
                                });
                            });
                        });
                    });
                }
            });
        }
        else{
            User.find(function(err, users) {
                if (err)
                    res.send(err);
                res.json(users);
            });
        }
    });
        

// /users/:user_id というルートを作成する．
// ----------------------------------------------------
router.route('/users/:user_id')

// 1人のユーザの情報を取得 (GET http://localhost:3000/api/users/:user_id)
    .get(function(req, res) {
        //user_idが一致するデータを探す．
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
// 1人のユーザの情報を更新 (PUT http://localhost:3000/api/users/:user_id)
    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            // ユーザの各カラムの情報を更新する．
            user.name = req.body.name;
            user.is_login = req.body.is_login;

            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'User updated!' });
            });
        });
    })

// 1人のユーザの情報を削除 (DELETE http://localhost:3000/api/users/:user_id)
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });


// /edit_program というルートを作成する．
// ----------------------------------------------------
router.route('/edit_programs')

// プログラムの作成 (POST http://localhost:3000/api/edit_programs)
    .post(function(req, res) {

        if(req.query.userID != null){

            // 新しいプログラムのモデルを作成する．
            var edit_program = new EditProgram();

            // プログラムの各カラムの情報を取得する．
            edit_program.name = req.body.name;
            edit_program.type = req.body.type;
            edit_program.source = req.body.source;

            // プログラム情報をセーブする．
            edit_program.save(function(err) {
                if (err)
                    res.send(err);
            });

            // Editモデルの情報を作成，セーブする．

            var edit = new Edit();
            edit.e_id = edit_program._id;
            edit.u_id = req.query.userID;

            edit.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Edit created!' });
            });

        }})
// 全てのプログラム一覧を取得 (GET http://localhost:8080/api/edit_programs)
    .get(function(req, res) {
        
        EditProgram.find(function(err, edit_programs) {
            if (err)
                res.send(err);
            res.json(edit_programs);
        });
    });

// /edit_programs/:edit_program_id というルートを作成する．
// ----------------------------------------------------
router.route('/edit_programs/:edit_program_id')

// 1つのプログラムの情報を取得 (GET http://localhost:3000/api/edit_programs/:edit_program_id)
    .get(function(req, res) {
        //edit_program_idが一致するデータを探す．
        EditProgram.findById(req.params.edit_program_id, function(err, edit_program) {
            if (err)
                res.send(err);
            res.json(edit_program);
        });
    })
// 1つのプログラムの情報を更新 (PUT http://localhost:3000/api/edit_programs/:edit_program_id)
    .put(function(req, res) {
        User.findById(req.params.edit_program_id, function(err, edit_program) {
            if (err)
                res.send(err);
            // プログラムの各カラムの情報を更新する．
            edit_program.name = req.body.name;
            edit_program.type = req.body.type;
            edit_program.source = req.body.source;

            edit_program.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'edit_program updated!' });
            });
        });
    })

// 1つのプログラムの情報を削除 (DELETE http://localhost:3000/api/edit_programs/:edit_program_id)
    .delete(function(req, res) {
        EditProgram.remove({
            _id: req.params.edit_program_id
        }, function(err, edit_program) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

// /supports というルートを作成する．
// ----------------------------------------------------
router.route('/supports')

// 推奨環境設定の作成 (POST http://localhost:3000/api/supports)
    .post(function(req, res) {
        if(req.query.editProgramID != null){
            // 推奨環境設定のモデルを作成する．
            var support = new Support();

            // 推奨環境設定の情報を取得する．
            support.os = req.body.os;
            support.browser = req.body.browser;

            // 設定をセーブする．
            support.save(function(err) {
                if (err)
                    res.send(err);
            });

            // Execモデルの情報を作成，セーブする．
            var exec = new Exec();
            exec.s_id = support._id;
            exec.e_id = req.query.editProgramID;

            exec.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Exec created!' });
            });
        }})

// 全ての環境設定一覧を取得 (GET http://localhost:8080/api/supports)
    .get(function(req, res) {
        Support.find(function(err, supports) {
            if (err)
                res.send(err);
            res.json(supports);
        });
    });

// /supports/:support_id というルートを作成する．
// ----------------------------------------------------
router.route('/supports/:support_id')

// 1つの環境情報を取得 (GET http://localhost:3000/api/supports/:support_id)
    .get(function(req, res) {
        //support_idが一致するデータを探す．
        Support.findById(req.params.support_id, function(err, support) {
            if (err)
                res.send(err);
            res.json(support);
        });
    })
// 1つの環境情報を更新 (PUT http://localhost:3000/api/supports/:support_id)
    .put(function(req, res) {
        User.findById(req.params.support_id, function(err, support) {
            if (err)
                res.send(err);
            // ユーザの各カラムの情報を更新する．
            support.os = req.body.os;
            support.browser = req.body.browser;

            support.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'support updated!' });
            });
        });
    })

// 1つの環境情報を削除 (DELETE http://localhost:3000/api/supports/:support_id)
    .delete(function(req, res) {
        Support.remove({
            _id: req.params.support_id
        }, function(err, support) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfuly deleted' });
        });
    });



// ルーティング登録
app.use('/api', router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);


// USE Socket.io and static page

var http = require('http');
var viewDir = "./app/view"
var connect = require('connect');
var serveStatic = require('serve-static');
var view = connect();
view.use(serveStatic(viewDir));
var viewServer = http.createServer(view);
viewServer.listen(8080);

// add start
var socketIO = require('socket.io');
var io = socketIO.listen(viewServer);
console.log("listen on port 8080");

io.sockets.on('connection', function(socket) {
    console.log("connection");
    socket.on('message', function(data) {
        console.log("message");
        io.sockets.emit('message', { value: data.value });
    });

    socket.on('disconnect', function(){
        console.log("disconnect");
    });
});
