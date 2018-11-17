var queryURL = "https://api.yelp.com/v3/";
var apiKey = "8Em9E2JthZrHTdWxKOk08-mIEc-wA3P2WfNONM3pj8OXMkQmByxinWG3KwgbfeoTrfwuJ0HeTvIL27_wMdnNSppsW_i9Q2bMjU_CyvEe5VK8i9PD8qlEUwx51kLuW3Yx"



$.ajax({
  url: queryURL,
  method: "GET",
  headers: {
    "accept": "application/json",
    "Access-Control-Allow-Origin":"*",
    "Authorization": `Bearer ${apiKey}`
}
}).then(function(res) {
var results = res.data
console.log(results);
})
