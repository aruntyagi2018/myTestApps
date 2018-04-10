$(function(){
    $('.btn-secondary').click(function(){
        var searchItem= $('#Artist').val();
  $.ajax({

    url: '/mtunes/search/' + searchItem,
    type: 'GET',
    success : function(data) {
        var jsondata = JSON.stringify(data[0]);
        var source = $("#book-detail-templete").html();
        var template = Handlebars.compile(source);
        var html = template(data);
       $("#resultsBlock").html(html);
       addFav();
       removeFav();
    }
  });
});
removeFav();
});

function addFav(){
$('.add-fav').click(function(){
  $obj =$(this);
  var favItemid = $(this).attr('id')
$.ajax({

url: '/mtunes/addfav/' + favItemid,
type: 'GET',
success : function(data) {
 // alert($obj);
 //alert($obj.parents('card'));
 //alert($obj.parents('card').parent());
 $obj.parents('.card').parent('div').addClass('favourite');
}
});
});
}
function removeFav(){
$('.remove-fav').click(function(){
  $obj =$(this);
  var favItemid = $(this).attr('id')
  alert(favItemid);
$.ajax({

url: '/mtunes/removefav/' + favItemid,
type: 'GET',
success : function(data) {
 // alert($obj);
 //alert($obj.parents('card'));
 //alert($obj.parents('card').parent());
 $obj.parents('.card').parent('div').removeClass('favourite');
}
});
});
}