<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Laravel</title>

    </head>
    <body>     

        
        <script src="{{asset('js/app.js')}}" type="text/javascript"></script>

        <script type="text/javascript" language="javascript">
            function print_stat(){
                 jQuery.ajax({
                  type: 'GET',
                  async: false ,
                  url: 'http://127.0.0.1:8000/api/users',
                  dataType: 'json',
                  success: function (data) {
                    alert("TEST");
                    console.log(data);
                  },
                  error : function(x, e) {
                      alert('server error occoured');
                      if(x.status==0){ alert('0 error'); 
                      }else if(x.status==404){ alert('404 error'); 
                      }else if(x.status==500){ alert('500 error'); 
                      }else if(e=='parsererror'){ alert('Error.nParsing JSON Request failed.'); 
                      }else if(e=='timeout'){ alert('Time out.'); 
                      }else { alert(x.responseText); }
                    }
                });
            }
             </script>
             <body>
             <input type="button" onclick="print_stat()" value="test">

    </body>
</html>
