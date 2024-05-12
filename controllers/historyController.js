const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
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
        sendSuccessResponse(res , { summury : "this is a static summury"})
        
    } catch (error) {
        sendErrorResponse(res, error.message )
    }
})

module.exports = {
    createHistory , updateHistory , fetchHistory , getSummury
}