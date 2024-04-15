import mongoose from 'mongoose';

const TrackerSchema = mongoose.Schema({
    email : {
        type: String ,
        required : true ,
        unique : true ,

    },

    company_data : {
        type : Array ,
        required : true ,
    },
})

export const Trackers = mongoose.model('trackers' , TrackerSchema);