$(document).ready(function(){    
    var dayCount=0;
    var markerNum;
    var dayInfo=[];
    var dayNum;

//********************************
     
    var hotelMarkers = [];
    var restaurantMarkers = [];
    var thingMarkers = [];


    for (var i = 0; i<all_hotels.length; i++) {
        var tempNum=all_hotels[i].place[0].location;
        var myLatlng = new google.maps.LatLng(tempNum[0],tempNum[1]);
        var newMarker = new google.maps.Marker({
            position: myLatlng,
            map: map
            })
        newMarker.setMap(null);
        hotelMarkers.push(newMarker);
    };

    for (var i = 0; i<all_restaurants.length; i++) {
        var tempNum=all_restaurants[i].place[0].location;
        var myLatlng = new google.maps.LatLng(tempNum[0],tempNum[1]);
        var newMarker = new google.maps.Marker({
            position: myLatlng,
            map: map
            })
        newMarker.setMap(null);
        restaurantMarkers.push(newMarker);
    };

    for (var i = 0; i<all_things_to_do.length; i++) {
        var tempNum=all_things_to_do[i].place[0].location;
        var myLatlng = new google.maps.LatLng(tempNum[0],tempNum[1]);
        var newMarker = new google.maps.Marker({
            position: myLatlng,
            map: map
            })
        newMarker.setMap(null);
        thingMarkers.push(newMarker);
    };

//***************************************
function setHotel(ele){
    console.log(dayInfo[dayNum].hotel);
    if($('.hotels div').length<1 && ele.length>0){
            $(".hotels").append('<div class="itinerary-item">'+
                  '<span class="title ">'+ele+'</span>'+
            '<button class="btn btn-xs pull-right btn-danger remove btn-circle">x</button>'+'</div>');
        } else {
            $(".hotels div span").text(ele);
    }
}

function setRes(ele){
    $(".restaurants").append('<div class="itinerary-item">'+
        '<span class="title">'+ele+'</span>'+
        '<button class="btn btn-xs pull-right btn-danger remove btn-circle">x</button>'+'</div>');
}

function setThing(ele){
    $(".things").append('<div class="itinerary-item">'+
            '<span class="title">'+ele+'</span>'+
            '<button class="btn btn-xs pull-right btn-danger remove btn-circle">x</button>'+'</div>');
}
//***************************************


    $("#hotelAdd").on('click',function(){
        var hotel=$(this).siblings('select').val();
        dayInfo[dayNum].hotel=hotel;
        setHotel(hotel);
        wipeMap();
        populateMap();
           
    });

    $("#restaurantAdd").on('click',function(){
        var restaurant=$(this).siblings('select').val();

        if($('.restaurants div').length<3){
            dayInfo[dayNum].restaurant.push(restaurant);
            setRes(restaurant); 
        }
        
        wipeMap();
        populateMap();

    });

    $("#thingAdd").on('click',function(){
        var thing=$(this).siblings('select').val();
        
        dayInfo[dayNum].things.push(thing); 
        setThing(thing);
        wipeMap();
        populateMap();

    });

    $(".hotels").on('click','.remove',function(){
        $(this).parent().remove();
        dayInfo[dayNum].hotel="";
        wipeMap();
        populateMap();
    });

    $(".restaurants").on('click','.remove',function(){
        var tempWord=$(this).parent().text();
        var index = dayInfo[dayNum].restaurant.indexOf(tempWord.slice(0,-1));
        if(index>-1){
            dayInfo[dayNum].restaurant.splice(index,1);
        }
        $(this).parent().remove();
        wipeMap();
        populateMap();
    });

    $(".things").on('click','.remove',function(){
        var tempWord=$(this).parent().text();
        var index = dayInfo[dayNum].things.indexOf(tempWord.slice(0,-1));
        if(index>-1){
            dayInfo[dayNum].things.splice(index,1);
        }
        $(this).parent().remove();

        wipeMap();
        populateMap();
    });

    $('.day-buttons').on('click','.day-btn',function(){
        $('.day-title span').text('Day '+ dayNum);
         
        dayNum=$('.day-btn').index(this)-1;

        $('.hotels').children().remove();
        $('.restaurants').children().remove();
        $('.things').children().remove();

        setHotel(dayInfo[dayNum].hotel);
        dayInfo[dayNum].restaurant.forEach(setRes);
        dayInfo[dayNum].things.forEach(setThing);

        console.log(dayInfo[dayNum].hotel);

        wipeMap();
        populateMap();

    })

    $("#addDay").on('click', function(){
         var obj={
            hotel:"",
            restaurant:[],
            things:[]
        };

        dayCount++;
        $(this).prev().removeClass('current-day');
        $('<button class="btn btn-circle day-btn current-day">'+dayCount+'</button>').insertBefore(this);
        dayInfo.push(obj);
        $('.hotels').children().remove();
        $('.restaurants').children().remove();
        $('.things').children().remove();

        wipeMap();
        //populateMap();
    });




function wipeMap() {
    for (var i = 0; i<hotelMarkers.length; i++) {
        hotelMarkers[i].setMap(null);
    };

    for (var i = 0; i<restaurantMarkers.length; i++) {
        restaurantMarkers[i].setMap(null);
    };

    for (var i = 0; i<thingMarkers.length; i++) {
        thingMarkers[i].setMap(null);
    };
};

function populateMap() {
    for (var i = 0; i<all_hotels.length; i++) {
        if(dayInfo[dayNum].hotel === all_hotels[i].name){
            hotelMarkers[i].setMap(map);
        }
    };

    for (var i = 0; i<all_restaurants.length; i++) {
        for(var j=0; j<dayInfo[dayNum].restaurant.length; j++){
            if(dayInfo[dayNum].restaurant[j] === all_restaurants[i].name){
                restaurantMarkers[i].setMap(map);
            }
        }    
    };

    for (var i = 0; i<all_hotels.length; i++) {
        for(var j=0; j<dayInfo[dayNum].things.length; j++){
            if(dayInfo[dayNum].things[j] === all_things_to_do[i].name){
                thingMarkers[i].setMap(map);
            }
        }
    };

}


});