const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const generateToken = require("../config/generateToken");
const { paginatedArray } = require("../helper/pagination");
const History = require("../models/historyModel");
const { sendSuccessResponse, sendErrorResponse } = require("../helper/utils");

const createHistory = asyncHandler(async (req, res) => {

   try {
    const { summary, userId, prompt , pdfUrl } = req.body;

    const history = await History.create({
        summary,
        userId,
        pdfUrl,
        history: [
            {
                prompt,
                response: "This is response",
            }
        ]
    })

    await history.populate('userId');

    if(history){
        sendSuccessResponse(res , {
            history
        })
    }
   } catch (error) {
    sendErrorResponse(res, error.message )
   }
})

const updateHistory = asyncHandler(async (req,res)=>{

    try {
        const { historyId , prompt } = req.body;

        const history = await History.findById(historyId)
        if (!history) {
            sendErrorResponse(res , "History not found" , 404)
        }
        history.history.push({ prompt, response: "This is response" });

        await history.save();

        sendSuccessResponse(res , {
            history
        })

    } catch (error) {   
        sendErrorResponse(res, error.message )
    }
})

const fetchHistory = asyncHandler(async (req,res)=>{
    try {

        const { userId , page , size } = req.query ;

        const history = await History.find({ userId });

        if (!history || history.length === 0) {
            sendSuccessResponse(res , {data : []})
        }
        
        sendSuccessResponse(res ,paginatedArray(history , page , size) )
        
    } catch (error) {
        sendErrorResponse(res, error.message )
    }
})

const getSummury = asyncHandler(async (req,res)=>{

    try {
        const { pdfUrl } = req.body;

        if(pdfUrl) {
            try {
                
            const resp  = await axios.post(`http://54.86.205.64:5002/summarize`,{
                s3_url : pdfUrl
            })
            if(resp?.data){
                sendSuccessResponse(res , { summury : resp?.data?.summary})
            }
            } catch (error) {
                sendErrorResponse(res, error.message )
            }
        }

        
    } catch (error) {
        sendErrorResponse(res, error.message )
    }
})

module.exports = {
    createHistory , updateHistory , fetchHistory , getSummury
}