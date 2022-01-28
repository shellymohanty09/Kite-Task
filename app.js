import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import https from "https";
import fetch from "node-fetch";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req, res){
    res.render("index");
})



app.get('/randomQuote', function(req, res){
    
    const url = "https://animechan.vercel.app/api/random";
    
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const anime = JSON.parse(data);
            if(response.statusCode===200){
                res.render("randomQuote", {quote:anime.quote, animeName:anime.anime});
            }else{
                res.render("failure");
            }
            
        })
    })
});




app.get('/tenRandomQuotes', function(req, res){
    fetch('https://animechan.vercel.app/api/quotes')
      .then(response => response.json())
      .then(quotes =>{
        var quote = new Array();
        for(var i=0;i<10;i++){
            quote[i]= (quotes[i].quote);
        }
        res.render("tenRandomQuotes", {quote1:quote[0], quote2:quote[1], quote3:quote[2], quote4:quote[3],
            quote5:quote[4], quote6:quote[5], quote7:quote[6], quote8:quote[7], quote9:quote[8], quote10:quote[9]
        });
    });
});



app.get('/animeTitle', function(req, res){
    res.render("animeTitle");
    app.post("/animeTitle", function(req, res){
        const query = req.body.titleName;
        const url = 'https://animechan.vercel.app/api/quotes/anime?title='+query;
        
        fetch(url)
          .then(response => response.json())
          .then(quotes =>{ 
            var quote= (quotes[0].quote);
            var character= (quotes[0].character);
            var anime = (quotes[0].anime);
            res.render("randomQuote", {quote:quote, animeName:anime});
            });
    });
});



app.get('/characterName', function(req, res){
    res.render("characterName");
    app.post("/characterName", function(req, res){
        const query = req.body.titleName;
        const url = 'https://animechan.vercel.app/api/quotes/character?name='+query;
        
        fetch(url)
          .then(response => response.json())
          .then(quotes =>{ 
            var quote= (quotes[0].quote);
            var character= (quotes[0].character);
            var anime = (quotes[0].anime);
            res.render("randomQuote", {quote:quote, animeName:anime});
            });
    });
});



app.get('/allAnime', function(req, res){
    fetch('https://animechan.vercel.app/api/available/anime')
      .then(response => response.json())
      .then(quotes =>{
        var quote = new Array();
        res.render("allAnime", {quote:quotes});
    });
});



app.listen(3000 || process.env.PORT, function(){
    console.log("Server is running");
})