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

    loadUserList(1,10);
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
                    tr.append('<td>'+(UserListPageNum-1)*10+i+'</td>');
                    tr.append('<td>'+userList[i].name+'</td>');
                    tr.append('<td>'+"删除"+'</td>');
                    $('#user-list-table').append(tr);
                }
            }
        }
    });
}
