var UserListPageNum=1;
$(function(){
    $.ajax({
        type: "POST",
        url: "/api/user/name",
        dataType: "json",
        success: function(result){
            if(result.status==0){
                var name=result.data;
                $('#name').html("你好："+name);
            }
            else{
                alert("未登录");
                $(location).attr('href', '/');
            }
        }
    });

    $('#btn_add_user').click(function(){
        var password=$('input[name=password]').val();
        var comfirm_password=$('input[name=comfirm-password]').val();
        if(password!=comfirm_password){
            alert("两次密码不一致");
            return;
        }
        param={};
        param.name=$('input[name=name]').val();
        param.password=password;
        var json=JSON.stringify(param);
        $.ajax({
            type: "POST",
            url: "/api/user/add",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: json,
        　　success: function(result){
                if(result.status==0){
                    alert("成功");
                    $(location).attr('href', '/webapp/menu.html');
                }
                else{
                    alert(result.message);
                }
            }
        });
    });

    $('#btn_change_password').click(function(){
        var password=$('input[name=new-password]').val();
        var comfirm_password=$('input[name=comfirm-new-password]').val();
        if(password!=comfirm_password){
            alert("两次密码不一致");
            return;
        }
        param={};
        param.password=password;
        var json=JSON.stringify(param);
        $.ajax({
            type: "POST",
            url: "/api/user/changePassword",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: json,
        　　success: function(result){
                if(result.status==0){
                    alert("成功");
                    $('input[name=new-password]').val("");
                    $('input[name=comfirm-new-password]').val("");
                }
                else{
                    alert(result.message);
                }
            }
        });
    });

    loadUserList(1,10);

    $("#next-page").click(function(){
        UserListPageNum++;
        loadUserList(UserListPageNum,10);
    });

    $("#last-page").click(function(){
        UserListPageNum--;
        loadUserList(UserListPageNum,10);
    });

    var lastplayer=null;
    $("#device-comfirm").click(function(){
        if(lastplayer!=null){
            lastplayer.dispose();
            $("#video-div").append("<video id='my-player'/>");
        }
        var device=$('input[name=device-name]').val();
        var rtmplink="rtmp://118.89.229.227/live/"+device;
        var hlslink="http://118.89.229.227/live/"+device+".m3u8";
        var options = {
            sources: [{
                src: rtmplink,
                type:"rtmp/flv",
            },{
                src: hlslink,
                type:"application/x-mpegURL",
            }]
        };
        var player = videojs("my-player", options, function onPlayerReady() {
          videojs.log('Your player is ready!');
          this.play();
        });
        lastplayer=player;
    });
});
function loadUserList(pageNum,pageSize){
    param={};
    param.pageNum=pageNum;
    param.pageSize=pageSize;
    var json=JSON.stringify(param);
    $.ajax({
        type: "POST",
        url: "/api/user/list",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        data: json,
        success: function(result){
            if(result.status==0){
                var total=result.data.total;
                var userList=result.data.users;
                $('#user-list-table tr[name!=head]').remove();
                for(var i=0;i<userList.length;i++){
                    var tr=$("<tr/>");
                    tr.append('<td>'+((UserListPageNum-1)*10+i)+'</td>');
                    tr.append('<td>'+userList[i].name+'</td>');
                    tr.append('<td>'+"<a onclick='deleteUser("+userList[i].id+")'>删除</a>"+'</td>');
                    $('#user-list-table').append(tr);
                }
                if(total<=UserListPageNum*10){
                    $("#next-page").hide();
                }
                else{
                    $("#next-page").show();
                }
                if(UserListPageNum==1){
                    $("#last-page").hide();
                }
                else{
                    $("#last-page").show();
                }
            }
        }
    });
};
function deleteUser(id){
    param={};
    param.id=id;
    var json=JSON.stringify(param);
    $.ajax({
        type: "POST",
        url: "/api/user/delete",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        data: json,
    　　success: function(result){
            if(result.status==0){
                alert("成功");
                loadUserList(UserListPageNum,10);
            }
            else{
                alert(result.message);
            }
        }
    });
};
