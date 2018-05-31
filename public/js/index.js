$(function(){
    $("#btn_submit").click(function(){
      $.ajax({
          type: "POST",
          url: "/api/rsa/get",
          dataType: "json",
          contentType: "application/json;charset=utf-8",
　　　　　 success: function(result){
              if(result.status==0){
                param={};
                param.name=$('input[name=name]').val();
                param.password=$('input[name=password]').val();
                param.rsaKeyId=result.data.id;
                var encrypt=new JSEncrypt();
                encrypt.setPublicKey(result.data.publicKey);
                param.password=encrypt.encrypt(param.password);
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
              }
          }
      });
    });
});
