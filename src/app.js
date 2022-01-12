const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


//Define path for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials') 

//Setup handler engin and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name:'Tanush Agarkar'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'Tanush Agarkar'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        msg:'This is a weather app so you can track current weather status',
        title:'Help',
        name:'Tanush '
    })
})

app.get('/help/*',(req,res) => {
    res.render('error',{
        title:'Help Error',
        name:'Tanush Agarkar',
        msg:'Help page does not found'
    })
})

app.get('/weather',(req,res) => {

    address = req.query.address
    if(!address){
        return res.send({
            error:"You must provide an address"
        })
    }

    geocode(address,(error,{ latitude, longtitude, location } = {}) => {
        if (error){
            res.send(error)
        }
        forecast(longtitude, latitude, (error, forecastData) => {
    
            if (error){
                console.log(error)
            }
            
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
          })
    })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        product:[]
    })
})

app.get('*',(req,res) => {
    res.render('error',{
        title:'404',
        name:'Tanush Agarkar',
        msg:'Page not Found'
    })
})








app.listen(3000,() => {
    console.log("server is running on port 3000")
})