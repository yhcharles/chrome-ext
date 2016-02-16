
function addRating(index) {
    var query = $(' > dl > dt > strong', this).text().match('《(.*)》')[1];
    if (!query) {
        $(' > dl > dd > p:nth-child(3)', this).append(' | <a href="http://movie.douban.com/subject_search?search_text=' + query + '">???</a>');
        return;
    }

    var elem = $(' > dl > dd > p:nth-child(3)', this);
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
            console.log(rating);
            elem.append(' | <a style="color:green" target="_blank" href="http://movie.douban.com/subject_search?search_text=' + query + '">豆瓣评分：' + rating + '</a>');
        }
    });
}

function douban() {
    $(".area-left").find(".fl-info").each(addRating);
}

$(document).ready(douban);
