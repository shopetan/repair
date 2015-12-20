var socket = io.connect('http://localhost:8080');

socket.on('connect', function(msg) {
    console.log("connet");
});

socket.on('title_message', function(msg,id) {
  console.log("send_title");
  console.log(msg);
    document.getElementById("input_name").innerHTML = msg.value;
});
socket.on('type_message', function(msg,id) {
  console.log("send_type");
  console.log(msg);
    document.getElementById("input_type").innerHTML = msg.value;
});
socket.on('source_message', function(msg,id) {
  console.log("send_source");
  console.log(msg);
    document.getElementById("input_source").innerHTML = msg.value;
});
function SendTitleMsg(id) {
  var msg = document.getElementById("input_name").value;
    socket.emit('title_message', { value: msg ,id: id});
}
function SendTypeMsg(id) {
  var msg = document.getElementById("input_type").value;
    socket.emit('type_message', { value: msg ,id: id});
}
function SendSourceMsg(id) {
  var msg = document.getElementById("input_source").value;
    socket.emit('source_message', { value: msg ,id: id});
}

function DisConnect() {
  socket.emit('message', { value: msg });
  socket.disconnect();
}
function keydown(){
    var name = document.forms.EditProgram.input_name.value;
    var type = document.forms.EditProgram.input_type.value;
    var source = document.forms.EditProgram.input_source.value + ``;
    SendTitleMsg("name");
    SendTypeMsg("type");
    SendSourceMsg("source");
}

// Draw html
function DrawUsersHTML(item){
  var template = [
    '<div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">',
      '<div class="mdl-card__media">',
      '</div>',
      '<div class="mdl-card__title">',
         '<h4 class="mdl-card__title-text"><%- name %></h4>',
      '</div>',
      '<div class="mdl-card__supporting-text">',
        '<span class="mdl-typography--font-light mdl-typography--subhead">login:<%- is_login %></span>',
      '</div>',
      '<div class="mdl-card__actions">',
        ' <a class="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="detail.html?userID=<%- _id %>">',
        ' 詳細画面へ',
        '   <i class="material-icons">chevron_right</i>',
        ' </a>',
    '</div>',
    '</div>'
  ].join("");

  $("#users").append(_.template(template)({name      :item.name,
                                            is_login :item.is_login,
                                           _id      :item._id}));
}

function DrawSingleEditProgramsHTML(item){
  var template = [
    '<div class="mdl-card mdl-shadow--3dp ">',
      '<div class="mdl-card__media">',
      '</div>',
      '<div class="mdl-card__title">',
      '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">',
      '<textarea class="mdl-textfield__input" type="text" rows= "1" id="input_name"><%- name %></textarea>',
      '<label class="mdl-textfield__label" for="source">title</label>',
      '</div>',
     ' </div>',
      '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">',
      '<textarea class="mdl-textfield__input" type="text" rows= "1" id="input_type"><%- name %></textarea>',
      '<label class="mdl-textfield__label" for="source">type</label>',
      '</div>',
      '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">',
        '<div class="mdl-textfield mdl-js-textfield">',
          '<textarea class="mdl-textfield__input" type="text" rows= "15" id="input_source"><%- source %></textarea>',
          '<label class="mdl-textfield__label" for="source">edit_program</label>',
        '</div>',
      '</div>',
      '</div>'
  ].join("");
  console.log(item);
  $("#EditProgram").append(_.template(template)({name:item.name,
                                            type :item.type,
                                            source  :item.source}));
                                            console.log("なぜだ");
}

function DrawEditProgramsHTML(item,i){
  var template = [
    '<div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">',
      '<div class="mdl-card__media">',
      '</div>',
      '<div class="mdl-card__title">',
         '<h4 class="mdl-card__title-text"><%- name %></h4>',
      '</div>',
      '<div class="mdl-card__supporting-text">',
        '<span class="mdl-typography--font-light mdl-typography--subhead">type:<%- type %></span>',
      '</div>',
      '<div class="mdl-card__actions">',
        ' <a class="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="create.html?editProgramID=<%- _id %>&userID=<%- u_id%>">',
        ' このコードを編集する',
        '   <i class="material-icons">chevron_right</i>',
        ' </a>',
      '</div>',
      '</div>'
  ].join("");
  $("#editPrograms").append(_.template(template)({name:item.edit_programs[i].name,
                                            type :item.edit_programs[i].type,
                                            _id  :item.edit_programs[i]._id,
                                        u_id :item._id }));
}

function DrawSingleUserHTML(item){
	var template = [
	  '<img class="mdl-cell mdl-cell--4-col" src="images/stationery.png"><div class="logo-font android-sub-slogan"><%- name %></div>'
  ].join("");

    $("#user").append(_.template(template)({name : item.name}));
}

//HTTP Request

function GetAllUserAPI(theUrl){
  fetch(theUrl)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        // Examine the text in the response
        response.json().then(function(data) {
          for(var i = 0; i < data.length; i++){
            DrawUsersHTML(data[i]);
          }
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function GetSingleEditProgramAPI(theUrl){
  fetch(theUrl)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        // Examine the text in the response
        response.json().then(function(data) {
	        DrawSingleEditProgramsHTML(data);
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function GetEditProgramAPI(theUrl){
  fetch(theUrl)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        // Examine the text in the response
        response.json().then(function(data) {
			DrawSingleUserHTML(data);
			for(var i = 0; i < data.edit_programs.length; i++){
	            DrawEditProgramsHTML(data,i);
			}
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function GetEditProgramIDAPI(theUrl,routeAPI){
    fetch(theUrl)
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
          // Examine the text in the response
          response.json().then(function(data) {
              console.log(data);
              getUserIDFromEditProgramUrl = routeAPI + 'users' + '?name=' + (data.name + '') + '&type=' + (data.type +'') + '&source=' + (data.source + '');
              getUserIDFromEditProgramAPI(getUserIDFromEditProgramUrl);
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
}

function getUserIDFromEditProgramAPI(theUrl){
    fetch(theUrl)
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
          // Examine the text in the response
          response.json().then(function(data) {
              console.log(data);
              console.log(theUrl);
              window.location.href = "./detail.html?userID=" + data[0]._id;
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
}

function PostUserCreateAPI(theUrl,u_name,is_login){
  fetch(theUrl, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Hubot',
      is_login: 'false'
    })
  });
}

function PostEditProgramAPI(theUrl,e_name,e_type,e_source){
    fetch(theUrl, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: e_name + '',
        type: e_type + '',
        source: e_source + ''
      })
  });
}

function DeleteUserAPI(theUrl){
    fetch(theUrl, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
  });
}

function DeleteEditProgramAPI(theUrl){
    fetch(theUrl, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
  });
}

function saveProgram(routeAPI,theUrl){
    var reg = new RegExp("\\?(.+?)$");
    var name = document.forms.EditProgram.input_name.value;
    var type = document.forms.EditProgram.input_type.value;
    var source = document.forms.EditProgram.input_source.value + ``;

    if(theUrl.match(/create/) != null){
        // urlの?以降(クエリパラメータを取得する)
        if(theUrl.match(reg)){
            var str = theUrl.match(reg)[1];
            var query = str.split("&");
            var method = []
            for (var i = 0;i < query.length;i++){
                method[i] = query[i].split("=");
            }
            DeleteEditProgramUrl = routeAPI + 'edit_programs/' + method[0][1];
            DeleteEditProgramAPI(DeleteEditProgramUrl);
            PostEditProgramUrl = routeAPI + 'edit_programs' + '?userID=' + method[1][1];
            PostEditProgramAPI(PostEditProgramUrl,name,type,source);
            DeleteUserUrl = routeAPI + 'users/' + method[1][1];
            DeleteUserAPI(DeleteUserUrl);
            GetEditProgramIDUrl = routeAPI + 'edit_programs' + '?name=' + (name+'') + '&type=' + (type+'') + '&source=' + (source+'');
            GetEditProgramIDAPI(GetEditProgramIDUrl,routeAPI);
            console.log(PostEditProgramUrl);
            console.log(DeleteUserUrl);
            console.log(GetEditProgramIDUrl);
        }
    }

//    window.location.href = "./index.html";
}

function getURL(theUrl){
	return theUrl;
}

function decideAPI(routeAPI,theUrl){
    var reg = new RegExp("\\?(.+?)$");
	//Use GetAllUserAPI
	if(theUrl.match(/users/) != null){
        if(theUrl.match(reg)){
            var str = theUrl.match(reg)[1];
            theUrl = routeAPI + 'users' +'?' + str;
            console.log(theUrl);
            GetAllUserAPI(theUrl);
        }
        else{
		    theUrl = routeAPI + 'users';
		    GetAllUserAPI(theUrl);
        }
    }
	//Use GetEditProgramAPI
    else if(theUrl.match(/detail/) != null){
		// urlの?以降(クエリパラメータを取得する)
		if(theUrl.match(reg)){
			var str = theUrl.match(reg)[1];
			var query = str.split("=");
			theUrl = routeAPI + 'users/' + query[1];
			GetEditProgramAPI(theUrl);
		}
	}
    //Use GetSingleEditProgramAPI
    else if(theUrl.match(/create/) != null){
        // urlの?以降(クエリパラメータを取得する)
        if(theUrl.match(reg)){
            var str = theUrl.match(reg)[1];
            var query = str.split("&");
            var method = []
            for (var i = 0;i < query.length;i++){
                method[i] = query[i].split("=");
            }
            theUrl = routeAPI + 'edit_programs/' + method[0][1];
            GetSingleEditProgramAPI(theUrl);
        }else{
            var intro = {};
            intro.source = "source";
            intro.type = "type";
            intro.name = "title";
            intro.source =  "うーんできたっぽい?↵aaa↵waaaaaaaaaaaaaaaaai";
            intro.type =  "てすとようの";
            intro.name = "これは";
            DrawSingleEditProgramsHTML(intro);
        }
    }else{
    }

}
