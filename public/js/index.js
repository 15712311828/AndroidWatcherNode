$(function(){
    $("#btn_submit").click(function(){
        param={};
        param.name=$('input[name=name]').val();
        param.password=$('input[name=password]').val();
        var json=JSON.stringify(param);
        $.ajax({
            type: "POST",
            url: "/api/user/login",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: json,
　　　　　　　　　success: function(result){
                if(result.status==0){
                    $(location).attr('href', '/webapp/menu.html');
                }
                else{
                    alert(result.message);
                }
            }
        });
    });
});
