const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const Path = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)


app.use(express.static(Path))


app.get('', (req, res) =>{
    res.render('index',{
        title:'Weather',
        name : 'AKSHAY'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Akshay'
    })
})
app.get('/help', (req, res)=>{
    res.render('help',{
        helptext: 'Hi i am help page',
        title:'help',
        name:'Akshay'
    })
})

app.get('/weather', (req,res) =>{
    if (!req.query.address){
        return res.send({
            error: 'provide address please'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location} = {})=>{
        if (error){
            return res.send ({error})
        }
        forecast(latitude,longitude,(error, forecastData)=>{
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
             address: req.query.address,
             location
            })
            
            

        })
    })
    
})

app.get('/products', (req,res) =>{
    console.log (req.query)
    res.send({
        products:[]
    })
})

app.get('*', (req, res) =>{
    res.render('404',{
        errortext: '404! PAGE NOT FOUND'
    })
})
app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})