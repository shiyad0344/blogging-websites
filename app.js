

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")

const homeStartingContent = "This is a multipurpose platform tackling diverse topics, where anyone with an account can write. It’s super simple to use.It’s a solid solution for personal blogs, but it’s not the best resource for professional use.It has simple appearance options, so the focus stays more on the writing part.When it comes to the ease of use, the platform provides an old-school editor.A blog is an online journal or informational website displaying information in reverse chronological order, with the latest posts appearing first, at the top. It is a platform where a writer or a group of writers share their views on an individual subject. This website provides a simple interface to write blogs .";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const blogs = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("Home",{starting_content:homeStartingContent,blogs:blogs});
})

app.get("/about",function(req,res){
  res.render("about",{about_content:aboutContent});
})

app.get("/contact",function(req,res){
  res.render("contact",{contact_content:contactContent});
})

app.get("/compose",function(req,res){
  res.render("compose");
})

app.post("/compose",function(req,res){
  var fullblog = {
    title:req.body.title,
    blog:req.body.blog
  }

  blogs.push(fullblog);
  res.redirect("/");
})


app.get("/blogs/:postName",function(req,res){
  var parameter = _.lowerCase(req.params.postName) ;
  for(var i=0;i<blogs.length;i++){
    if(parameter===_.lowerCase(blogs[i].title))
    {
      res.render("post",{title:blogs[i].title,blog:blogs[i].blog});
    }
  }
})







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
