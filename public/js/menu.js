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
});
