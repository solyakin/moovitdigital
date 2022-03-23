<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {{-- <script src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script> --}}
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>AdCode</title>
</head>
<style>
.send{
    position: relative;
    height: 100%;
    width: 100%;
}
    .ad{
        background: rgba(0,0,0, 0.7);
        height: auto;
        width: auto;
        padding: 2px 5px;
        position: absolute;
        top:0;
        right:0;
        z-index: 99;
    }
    .ad img{
        width: 50px;
        height: 20px;
        margin-right: 0;
    }
</style>

<body>
    <a href={{ $ad->url }} target="_blank" class="send" data-pageref-id={{ $pub->id }} >
        <img src="/storage/banner/{{ $ad->banner }}" alt="banner" width={{ $ad->width}} height={{ $ad->height}} />
        <div class="ad">
            <a href="https://moovitdigital.com"><img src={{ asset('images/log.svg')}} alt=""></a>
        </div>
    </a>
</body>
<script>

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $(".send").click(function(){

      var id = $(this).attr('data-pageref-id');
      var url = $(this).attr('data-url');

      $.ajax({
        url: "{{ route('click') }}",
        type:"POST",
        data:{
          id:id
        },
        success:function(response){
            console.log("successful")
        },
        error: function(error) {
         console.log(error);
        }
       });
  });

</script>

</html>
