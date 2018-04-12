$(function(){
    $.ajax({
        type: "POST",
        url: "/api/user/name",
        dataType: "json",
        success: function(result){
            if(result.status==0){
                var name=result.data;
            }
            else{
                alert("未登录");
                $(location).attr('href', '/');
            }
        }
    });
    $.ajax({
        type: "POST",
        url: "/api/device/name",
        dataType: "json",
        success: function(result){
            if(result.status==0){
                var name=result.data;
                var video="<video id=\"video\" class=\"video-js\" controls=\"controls\" autoplay=\"false\" preload=\"no\" width=\"640px\" height=\"360px\" data-setup=\"{}\"/>";
                $("#video-div").html(video);
                var source = $("<source src=\""+ "rtmp://118.89.229.227/live/" + name+"\"/>");
                $("#video").append(source);
                var warn="<p>不支持手机浏览器播放，电脑无法播放请尝试打开flash</p>";
                $("#video-div").append(warn);
            }
            else{
                alert("未选择设备");
                $(location).attr('href', '/webapp/menu');
            }
        }
    });
});
