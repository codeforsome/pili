const mongoose=require('mongoose');

const schema=require('../schemas/figure');
module.exports=mongoose.model('Figure',schema);