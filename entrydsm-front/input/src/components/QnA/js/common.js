function insertArticle() {
    var contentarea = document.getElementById("content-area");

    for(var i=1;i<=10;i++) {
    var article = "<div class=\"article\">" +
                    "<li>" +
                        "<span class=\"article-number\">" + i + "</span>" +
                        "<span class=\"article-title\">TITLETITLETITLETITLETITLETITLE" + i + "</span>" +
                        "<span class=\"article-writer\">WRITER" + i + "</span>" +
                        "<span class=\"article-date\">" + i*1000 + "/" + i*i + "/" + i + "</span>" +
                    "</li>" +
                "</div>";
        contentarea.innerHTML += article;
    }
}


document.addEventListener('DOMContentLoaded', function() {
   insertArticle();
});