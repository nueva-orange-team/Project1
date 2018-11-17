var queryURL = "https://api.yelp.com/v3/businesses/search=60647";
var apiKey = "8Em9E2JthZrHTdWxKOk08-mIEc-wA3P2WfNONM3pj8OXMkQmByxinWG3KwgbfeoTrfwuJ0HeTvIL27_wMdnNSppsW_i9Q2bMjU_CyvEe5VK8i9PD8qlEUwx51kLuW3Yx"



$.ajax({
  url: queryURL,
  method: "GET",
  headers: {
  `Authorization: Bearer ${apiKey}``
  },
}).then(function(res) {
var results = res.data
console.log(results);
})
