
function douban(query, callback) {
    $.ajax({
        url: "https://api.douban.com/v2/movie/search?q=" + query,
        dataType: "json",
        success: function(data) {
            var rating;
            if (data.subjects.length > 0) {
                rating = data.subjects[0].rating.average;
            } else {
                rating = '?';
            }
            callback(rating);
        }
    });
}

function doubanLink(query) {
    return 'http://movie.douban.com/subject_search?search_text=' + query;
}

function addRatingZMZ() {
    $(".area-left").find(".fl-info").each(function(index) {
        var query = $(' > dl > dt > strong', this).text().match('《(.*)》')[1];
        if (!query) {
            $(' > dl > dd > p:nth-child(3)', this).append(' | <a href="' + doubanLink(query) + '">???</a>');
            return;
        }

        var elem = $(' > dl > dd > p:nth-child(3)', this);
        douban(query, function(rating) {
            elem.append(' | <a style="color:green" target="_blank" href="' + doubanLink(query) + '">豆瓣评分：' + rating + '</a>');
        });
    });
}

function addRatingXiamp4() {
    $(".box.newbox .img-list.dis.clearfix > li").each(function(index) {
        //console.log($(' > a', this).text());
        var query = $(' > a', this).attr('title');
        var elem = $(' > p', this);
        douban(query, function(rating) {
            console.log(query + ': ' + rating);
            //elem.append('<a style="color:green" target="_blank" href="' + doubanLink(query) + '">豆瓣评分：' + rating + '</a>');
            elem.html('<a style="color:green" target="_blank" href="' + doubanLink(query) + '">豆瓣评分：' + rating + '</a>');
        });
    });
}

function addRatingMP4BAR() {
    $(".tbody > tr").each(addRatingMP4BAR);
    var title = $('td:eq(2)', this).text().trim();
    console.log(title.split('.', 1)[0]);
}

function main() {
    addRatingZMZ();
    addRatingXiamp4();
    //addRatingMP4BAR();
}

$(document).ready(main);

