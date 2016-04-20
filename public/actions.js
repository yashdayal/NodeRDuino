$(document).ready(function(){
    $("#top").click(function(){
        console.log('clicked top');
        $.get('/forward');
    });

    $("#left").click(function(){
        console.log('clicked left');
        $.get('/left');
    });

    $("#right").click(function(){
        console.log('clicked right');
        $.get('/right');
    });

    $("#down").click(function(){
        console.log('clicked down');
        $.get('/back');
    });

    $("#stop").click(function(){
        console.log('clicked stop');
        $.get('/stop');
    });

});