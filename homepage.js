var search = document.getElementsByClassName("search");

function search (){
    var code = ' <input class="" id="myInput" type="text" placeholder="Search.."><br><ul class="list-group" id="myList"><li class="list-group-item">name</li><li class="list-group-item">class</li><li class="list-group-item">roll no</li><li class="list-group-item">branch</li></ul><script>$(document).ready(function(){$("#myInput").on("keyup", function() {var value = $(this).val().toLowerCase();$("#myList li").filter(function() {$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)});});});</script>';
    e.dataTransfer.setData('Text',code);
    rightbox.innerHTML = e.dataTransfer.getData('text');
}
search.addEventListener("click", search,false);