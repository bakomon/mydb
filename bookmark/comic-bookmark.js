(function(d, w) {
  // Simple querySelector https://codepen.io/pen/oKYOEK
  function el(e,l,m) {
    var elem, parent = l != 'all' && (l || l === null) ? l : document;
    if (parent === null) {
      elem = parent;
      console.error('selector: '+ e +' => parent: '+ parent);
    } else {
      elem = (m || l == 'all') ? parent.querySelectorAll(e) : parent.querySelector(e);
    }
    return elem;
  }
  
  // Add script to head. data, info, boolean, element. https://codepen.io/sekedus/pen/QWKYpVR
  function addScript(i,n,f,o) {
    var dJS = document.createElement('script');
    dJS.type = 'text/javascript';
    if (n == 'in') dJS.async = (n || f) === true ? true : false;
    n == 'in' ? dJS.innerHTML = i : dJS.src = i;
    var elm = n && n.tagName ? n : f && f.tagName ? f : o && o.tagName ? o : document.querySelector('head');
    elm.appendChild(dJS);
  }
  
  // https://stackoverflow.com/a/32589289
  function firstCase(str, sep) {
    var separate = sep ? sep : ' ';
    var splitStr = str.toLowerCase().split(separate);
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
  }
  
  // Detect mobile device https://stackoverflow.com/a/11381730/7598333
  function isMobile() {
    var a = navigator.userAgent || navigator.vendor || window.opera;
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
  }
  
  function bc_checkData(id) {
    return firebase.database().ref(`comic/${id}`).once('value').then(function(snapshot) {
        return snapshot.exists() ? true : false;
    });
  }
  
  // Firebase update vs set https://stackoverflow.com/a/38924648
  function bc_updateData(id, title, alternative, chapter, note, host, url) {
    firebase.database().ref('comic/' + id).update({
      id: id,
      title: title,
      alternative: alternative,
      chapter: chapter,
      note: note,
      host: host,
      url: url
    }, (error) => {
      if (error) {
        el('.mn_notif').innerHTML = 'Error!!';
        console.log(error);
      } else {
        el('.mn_notif').innerHTML = 'Done';
      }
      el('.mn_notif').classList.remove('_hidden');
      setTimeout(function() { el('.mn_notif').classList.add('_hidden'); }, 1000);
    });
    
    if (is_search) {
      el('.bc_search button').click();
    } else {
      bc_mainData('new');
    }
  }
  
  function bc_setData(id, title, alternative, chapter, note, host, url) {
    firebase.database().ref('comic/' + id).set({
      id: id,
      title: title,
      alternative: alternative,
      chapter: chapter,
      note: note,
      host: host,
      url: url
    }, (error) => {
      if (error) {
        el('.mn_notif').innerHTML = 'Error!!';
        console.log(error);
      } else {
        el('.mn_notif').innerHTML = 'Done';
      }
      el('.mn_notif').classList.remove('_hidden');
      setTimeout(function() { el('.mn_notif').classList.add('_hidden'); }, 1000);
    });
    
    bc_mainData('new');
  }
  
  function bc_searchResult(arr) {
    var s_txt = '<div class="cs_list" style="margin-bottom:10px;"><ul>';
    if (arr.length != 0) {
      for (var i = 0; i < arr.length; i++) {
        s_txt += '<li class="_cl';
        if (i+1 < arr.length) s_txt += ' bc_line';
        s_txt += ' flex_wrap" data-index="'+ i +'">';
        s_txt += '<a class="_bc bc_100" href="'+ arr[i].url +'" target="_blank">'+ arr[i].title;
        if (arr[i].alternative != '') s_txt += ', '+ arr[i].alternative;
        s_txt += '</a>';
        s_txt += '<input class="cs_ch bc_input _bc bc_50" type="text" value="'+ arr[i].chapter +'" disabled>';
        s_txt += '<button class="cs_edit bc_btn _bc">Edit</button>';
        s_txt += '<span class="cs_num _bc _selected">'+ (i+1) +'</span>';
        s_txt += '</li>';
      }
    } else {
      s_txt += '<li>Oops! Comic not found</li>';
    }
    s_txt += '</ul></div>';
    s_txt += '<div class="cs_text flex"><span class="bc_text">Search Result</span><span class="f_grow"></span><button class="cs_close bc_btn _bc">Close</button></div>';
    
    el('.bc_result').innerHTML = s_txt;
    el('.bc_result').classList.remove('_hidden');
    el('.bc_result ul').style.height = (window.innerHeight - (el('.bc_tr1').offsetHeight + el('.cs_text').offsetHeight + 90)) + 'px';
    el('.bmark_db').classList.remove('s_shide');
    el('.mn_notif').classList.add('_hidden');
      
    el('.cs_close').onclick = function() {
      is_search = false;
      el('.bc_result').classList.add('_hidden');
      el('.bmark_db').classList.add('s_shide');
    };
    
    el('.bc_result .cs_edit', 'all').forEach(function(item) {
      item.addEventListener('click', function() {
        var cs_data = arr[item.parentNode.dataset.index];
        bc_editData('search', cs_data);
      });
    });
  }
  
  function bc_resetData() {
    el('.bc_id').value = '';
    el('.bc_title').value = '';
    el('.bc_alt').value = '';
    el('.bc_ch').value = '';
    el('.bc_note').value = '';
    el('.bc_host').value = '';
    el('.bc_url').value = '';
  }
  
  function bc_editData(note, data) {
    el('.bc_comic').classList.add('_hidden');
    if (is_search) el('.bmark_db').classList.add('s_shide');
    el('.bc_form').classList.remove('_hidden');
    el('.bc_set').classList.add('_hidden');
    el('.bc_update').classList.remove('_hidden');
    is_edit = true;
    
    el('.bc_id').value = data.id;
    el('.bc_title').value = data.title;
    el('.bc_alt').value = data.alternative;
    el('.bc_ch').value = data.chapter;
    el('.bc_note').value = data.note;
    el('.bc_host').value = data.host;
    el('.bc_url').value = data.url;
    el('.bc_ch').select();
  }
  
  function bc_showData() {
    cm_data = undefined;
    firebase.database().ref('comic/' + cm_ID).on('value', function(snapshot) {
      cm_data = snapshot.val();
      if (wh.indexOf(cm_data.host) != -1 && wp.indexOf(cm_ID) != -1) {
        el('.cm_edit').classList.remove('_hidden');
      } else {
        el('.bc_comic a').href = cm_data.url;
      }
      el('.bc_comic a').innerHTML = cm_data.title;
      el('.bc_comic .cm_ch').value = cm_data.chapter;
      el('.bc_comic').classList.remove('_hidden');
      if (el('.bmark_db').classList.contains('bc_shide') && wp.search(/(ch(ap(ter)?)?|ep(isode)?)(\/|\-|\_|\d+)/i) == -1) {
        el('.bc_toggle').click();
      }
    });
  }
  
  function bc_genData(json, query) {
    var arr = [];
    for (var key in json) {
      arr.push(json[key]);
      // check if comic data exist and show bookmark
      var id_rgx = new RegExp(json[key].id.replace(/\-/g, ' '), 'i');
      if (!query && (wp.indexOf(json[key].id) != -1 || el('title').innerHTML.search(id_rgx) != -1)) {
        cm_ID = json[key].id;
        is_comic = true;
        bc_showData();
      }
    }
    // search
    if (query) {
      var rgx = new RegExp(query, 'ig');
      return arr.filter(item => (item.id.search(rgx) != -1 || item.title.search(rgx) != -1 || item.alternative.search(rgx) != -1 || item.host.search(rgx) != -1));
    } else {
      return arr;
    }
  }
  
  function bc_mainData(note, query) {
    firebase.database().ref('comic').once('value', function(snapshot) {
      if (query) {
        bc_searchResult(bc_genData(snapshot.val(), query));
      } else {
        main_data = bc_genData(snapshot.val());
      }
    });
    
    if (note) {
      bc_resetData();
      el('.bc_form').classList.add('_hidden');
    }
  }
  
  function startBookmark() {
    var b_txt = '';
    // css control alread in css reader
    // css bookmark
    b_txt += '<style>.bc_100{width:100%;}.bc_50{width:50%;}.bmark_db{position:fixed;top:0;bottom:0;left:0;width:350px;padding:10px;background:#17151b;border-right:1px solid #333;}.bmark_db.bc_shide{left:-350px;}.bmark_db ul{padding:0;margin:0;}.bc_line{margin-bottom:10px;padding-bottom:10px;border-bottom:5px solid #333;}._bc{background:#252428;color:#ddd;padding:4px 8px;margin:4px;font:14px Arial;cursor:pointer;border:1px solid #3e3949;}._bc a{color:#ddd;font-size:14px;text-decoration:none;}.bc_text{padding:4px 8px;margin:4px;}._selected,.bc_btn:hover{background:#4267b2;border-color:#4267b2;}input._bc{padding:4px;display:initial;cursor:text;height:auto;background:#252428 !important;color:#ddd !important;border:1px solid #3e3949;}input._bc:hover{border-color:#3e3949;}.bc_result .cs_list{height:100%;overflow-y:auto;}.bc_result li{border-width:1px;}.bc_toggle{position:absolute;bottom:0;right:-40px;align-items:center;width:40px;height:40px;font-size:30px !important;padding:0;margin:0;line-height:0;}.bc_bg{position:fixed;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,.5);}.bmark_db.s_shide .bc_result,._hidden{display:none;}</style>';
    // css mobile
    b_txt += '<style>.bc_mobile .bmark_db{width:80%;}.bc_mobile .bmark_db.bc_shide{left:-80%;}.bc_mobile ._bc{font-size:16px;}.bc_mobile .bc_toggle{right:-70px;width:70px;height:70px;background:transparent;color:#fff;border:0;}</style>';
    // css custom
    b_txt += '<style>.mangaku\\.pro .bmark_db.bc_shide,.mangaindo\\.web\\.id .bmark_db.bc_shide{left:-370px;}.mangaku\\.pro .bc_mobile .bmark_db.bc_shide,.mangaindo\\.web\\.id .bc_mobile .bmark_db.bc_shide{left:-85%;}</style>';
    // html
    b_txt += '<div class="bc_bg _hidden"></div>';
    b_txt += '<div class="bmark_db s_shide bc_shide flex_wrap f_bottom">';
    b_txt += '<div class="bc_login flex_wrap _hidden">';
    b_txt += '<input class="bc_email bc_input _bc bc_100" type="email" placeholder="Email">';
    b_txt += '<input class="bc_pass bc_input _bc bc_100" type="password" placeholder="Password">';
    b_txt += '<div class="flex"><button class="bc_in bc_btn _bc">Login</button><span class="lg_notif _bc _selected _hidden"></span></div>';
    b_txt += '</div>';// .bc_login
    b_txt += '<div class="bc_data bc_100 _hidden">';
    b_txt += '<div class="bc_form bc_line flex_wrap _hidden">';
    b_txt += '<input class="bc_id bc_input _bc bc_100" type="text" placeholder="ID">';
    b_txt += '<input class="bc_title bc_input _bc bc_100" type="text" placeholder="Title">';
    b_txt += '<input class="bc_alt bc_input _bc bc_100" type="text" placeholder="Alternative Title">';
    b_txt += '<input class="bc_ch bc_input _bc bc_100" type="text" placeholder="Chapter">';
    b_txt += '<input class="bc_note bc_input _bc bc_100" type="text" placeholder="Note">';
    b_txt += '<input class="bc_host bc_input _bc bc_100" type="text" placeholder="hostname">';
    b_txt += '<input class="bc_url bc_input _bc bc_100" type="text" placeholder="URL">';
    b_txt += '<div class="bc_upnew bc_100 flex t_right"><button class="bc_gen bc_btn _bc">Generate</button><span class="f_grow"></span><button class="bc_close bc_btn _bc">Close</button><button class="bc_set bc_btn _bc _selected _hidden">Set</button><button class="bc_update bc_btn _bc _selected _hidden">Update</button></div>';
    b_txt += '</div>';// .bc_form
    b_txt += '<div class="bc_result bc_line _hidden"></div>';
    b_txt += '<div class="bc_tr1">';
    b_txt += '<div class="bc_comic bc_line _hidden"><div class="_cm flex_wrap"><a class="_bc bc_100" href="javascript:void(0)" target="_blank"></a><input class="cm_ch bc_input _bc bc_50" type="text" placeholder="chapter" disabled><button class="cm_edit bc_btn _bc _hidden">Edit</button></div></div>';
    b_txt += '<div class="bc_search bc_line flex"><input class="bc_input _bc bc_100" type="text" placeholder="Search..."><button class="bc_btn _bc">GO</button></div>';
    b_txt += '<div class="bc_menu flex"><button class="bc_add bc_btn _bc">Add</button><button class="bc_out bc_btn _bc">Logout</button><span class="mn_notif _bc _selected _hidden"></span></div>';
    b_txt += '</div>';// .bc_tr1
    b_txt += '</div>';// .bc_data
    b_txt += '<div class="bc_toggle bc_btn _bc bc_100 flex t_center">&#9733;</div>';
    b_txt += '</div>';// .bmark_db
    
    var b_html = d.createElement('div');
    b_html.style.cssText = 'position:relative;z-index:2147483647;';
    b_html.className = '_bmark' + (isMobile() ? ' bc_mobile' : '');
    b_html.innerHTML = b_txt;
    d.body.appendChild(b_html);
    
    // Check login source: https://youtube.com/watch?v=iKlWaUszxB4&t=102
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) { //User is signed in.
        is_login = true;
        bc_mainData(); //Start firebase data
        el('.bc_login').classList.add('_hidden');
        el('.bc_data').classList.remove('_hidden');
      } else {
        is_login = false;
        el('.bc_login').classList.remove('_hidden');
        el('.bc_data').classList.add('_hidden');
      }
    });
    
    d.onkeyup = function(e) {
      if (el('.bc_search input') === d.activeElement && e.keyCode == 13) {
        el('.bc_search button').click(); //enter to search
      }
    };
    
    el('.bc_toggle').onclick = function() {
      this.classList.toggle('_selected');
      el('.bmark_db').classList.toggle('bc_shide');
      if (isMobile()) {
        el('.bc_bg').classList.toggle('_hidden');
        d.body.style.overflow = el('.bmark_db').classList.contains('bc_shide') ? 'initial' : 'hidden';
      }
    };
    
    el('.bc_login .bc_in').onclick = function() {
      var userEmail = el('.bc_email').value;
      var userPass = el('.bc_pass').value;
      el('.lg_notif').innerHTML = 'Loading..';
      el('.lg_notif').classList.remove('_hidden');
      
      firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then((user) => {
        el('.lg_notif').classList.add('_hidden');
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        el('.lg_notif').innerHTML = 'Error!!';
      });
    };
    
    el('.bc_menu .bc_out').onclick = function() {
      firebase.auth().signOut();
    };
    
    el('.bc_menu .bc_add').onclick = function() {
      bc_resetData();
      if (is_edit) {
        is_edit = false;
      } else {
        el('.bc_form').classList.remove('_hidden');
      }
      el('.bc_set').classList.remove('_hidden');
      el('.bc_update').classList.add('_hidden');
      if (is_comic) el('.bc_comic').classList.add('_hidden');
      if (is_search) el('.bmark_db').classList.add('s_shide');
    };
    
    el('.bc_search button').onclick = function() {
      var bc_query = el('.bc_search input').value;
      if (bc_query == '') return;
      bc_mainData('search', bc_query);
      is_search = true;
      el('.mn_notif').innerHTML = 'Loading..';
      el('.mn_notif').classList.remove('_hidden');
    };
    
    el('.cm_edit').onclick = function() {
      bc_editData('comic', cm_data);
    };
    
    // klik "Generate" harus pada halaman komik
    el('.bc_gen').onclick = function() {
      cm_ID = wp.match(/\/(?:(?:baca-)?(?:komik|manga|read|[a-z]{2}\/[^\/]+|(?:title|series|comics?)(?:\/\d+)?|(?:\d{4}\/\d{2})|p)[\/\-])?([^\/\n]+)\/?(?:list)?/i)[1].replace(/-bahasa-indonesia(-online-terbaru)?/i, '').replace(/\.html/i, '');
      el('.bc_id').value = cm_ID;
      el('.bc_title').value = wh.indexOf('mangacanblog') != -1 ? firstCase(cm_ID, '_') : firstCase(cm_ID, '-');
      el('.bc_host').value = wh.replace(/w{3}\./, '');
      el('.bc_url').value = '//'+ wh + wp;
    };
    
    el('.bc_close').onclick = function() {
    	bc_resetData();
    	is_edit = false;
      el('.bc_form').classList.add('_hidden');
      if (is_comic) el('.bc_comic').classList.remove('_hidden');
      if (is_search) el('.bmark_db').classList.remove('s_shide');
    };
    
    el('.bc_set').onclick = function() {
      if (el('.bc_id').value == '') return;
      cm_ID = el('.bc_id').value;
      bc_checkData(cm_ID).then(function(res) {
        if (!res) {
          bc_setData(cm_ID, el('.bc_title').value, el('.bc_alt').value, el('.bc_ch').value, el('.bc_note').value, el('.bc_host').value, el('.bc_url').value);
        } else {
          alert('Exist.');
          el('.bc_set').classList.add('_hidden');
          el('.bc_update').classList.remove('_hidden');
        }
      });
    };
    
    el('.bc_update').onclick = function() {
      if (el('.bc_id').value == '') return;
      cm_ID = el('.bc_id').value;
      bc_updateData(cm_ID, el('.bc_title').value, el('.bc_alt').value, el('.bc_ch').value, el('.bc_note').value, el('.bc_host').value, el('.bc_url').value);
    };
  }
  
  var wl = w.location;
  var wh = wl.hostname;
  var wp = wl.pathname;
  var is_login = false;
  var is_comic = false;
  var is_search = false;
  var is_edit = false;
  var main_data, cm_data, cm_ID;
  
  addScript('https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js');
  
  // Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBma6cWOGzwSE4sv8SsSewIbCjTPhm7qi0",
    authDomain: "bakomon99.firebaseapp.com",
    databaseURL: "https://bakomon99.firebaseio.com",
    projectId: "bakomon99",
    storageBucket: "bakomon99.appspot.com",
    messagingSenderId: "894358128479",
    appId: "1:894358128479:web:6fbf2d52cf76da755918ea",
    measurementId: "G-Z4YQS31CXM"
  };
  
  var db_chk = setInterval(function() {
    if (typeof firebase !== 'undefined') {
      clearInterval(db_chk);
      firebase.initializeApp(firebaseConfig);
      addScript('https://www.gstatic.com/firebasejs/8.2.3/firebase-database.js');
      var db2_chk = setInterval(function() {
        if (typeof firebase.database !== 'undefined') {
          clearInterval(db2_chk);
          addScript('https://www.gstatic.com/firebasejs/8.2.3/firebase-auth.js');
          var db3_chk = setInterval(function() {
            if (typeof firebase.auth !== 'undefined') {
              clearInterval(db3_chk);
              startBookmark();
            }
          }, 100);
        }
      }, 100);
    }
  }, 100);
})(document, window);
