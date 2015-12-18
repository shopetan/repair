var socket = io.connect('http://localhost:8080');

socket.on('connect', function(msg) {
    console.log("connet");
});

socket.on('message', function(msg) {
  console.log("send");
    document.getElementById("receiveMsg").innerHTML = msg.value;
});

function SendMsg() {
  var msg = document.getElementById("message").value;
    socket.emit('message', { value: msg });
  }

function DisConnect() {
  socket.emit('message', { value: msg });
  socket.disconnect();
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
	            DrawEditProgramsHTML(data.edit_programs[i]);
			}
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
      is_login: 'false',
    })
  })
}

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
                                            _id      :item._id}))
}

function DrawEditProgramsHTML(item){
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
        ' <a class="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="create.html?editProgramID=<%- _id %>">',
        ' このコードを編集する',
        '   <i class="material-icons">chevron_right</i>',
        ' </a>',
      '</div>',
    '</div>'
  ].join("");
  $("#editPrograms").append(_.template(template)({name:item.name,
                                            type :item.type,
                                            _id  :item._id}))
}

function DrawSingleUserHTML(item){
	var template = [
	  '<img class="mdl-cell mdl-cell--4-col" src="images/stationery.png"><div class="logo-font android-sub-slogan"><%- name %></div>'
  ].join("");

  $("#user").append(_.template(template)({name : item.name}))
}

function getURL(theUrl){
	return theUrl;
}

function decideAPI(routeAPI,theUrl){
	//Use GetAllUserAPI
	if(theUrl.match(/users/) != null){
		theUrl = routeAPI + 'users';
		GetAllUserAPI(theUrl);
	}
	//Use GetEditProgramAPI
	else if(theUrl.match(/detail/) != null){
		// urlの?以降(クエリパラメータを取得する)
		var reg=new RegExp("\\?(.+?)$");
		if(theUrl.match(reg)){
			var str = theUrl.match(reg)[1];
			var query = str.split("=");
			theUrl = routeAPI + 'users/' + query[1];
			GetEditProgramAPI(theUrl);
		}
	}

}
