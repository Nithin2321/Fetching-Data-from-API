//const express = require('express');
//const axios = require('axios');
//const cors = require('cors');
import express from "express";
import axios from 'axios';
import cors from 'cors';


const app = express();
app.use(cors());

//logic for fetching data
app.get('/api/data', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

//serer logic
app.listen(5000, () => {
    console.log("server running on 5000");
})
