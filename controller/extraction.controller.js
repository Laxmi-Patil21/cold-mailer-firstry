import Extraction from '../models/extraction.model.js';
import { extractWithAi } from '../utils/ai.utils.js';

export const extractContent = async(req, res)=>{
    try {
        if(!req.file){
            return res.status(400).json({
                success: false,
                message: "File is required.."
            })
        }

        const base64 = req.file.buffer.toString("base64");

        const imageData = `data:${req.file.mimetype};base64,${base64}`;

        const prompt = `Analyze this image and extract visible information.
If it contains a resume, extract:
- Name
- Email
- Phone
- Skills
- Education
- Experience
- Projects
If it contains a LinkedIn recruitment post, extract:
- Recruiter email, if visible
- Recruiter or author name
- Company
- Job role
- Required skills
- Post content
Return valid JSON. Use null for missing information.
Do not invent or guess information.`

        const extractContentWithAi = await extractWithAi(prompt, imageData);

        let parsedData = null;
        try {
            const jsonMatch = extractContentWithAi.match(/\{[\s\S]*\}/);
            const toParse = jsonMatch ? jsonMatch[0] : extractContentWithAi;
            parsedData = JSON.parse(toParse)
        } catch (error) {
            console.log("Error while parsing : ",error.message);
            parsedData = {rawContent: extractContentWithAi}
        }

        const savedExtraction = await Extraction.create({
            data: parsedData,
            rawContent: extractContentWithAi,
            createdBy: req.user._id
        })

        return res.status(200).json({
            success: true,
            msg: "Extraction Success...",
            savedExtraction
        })


    
    } catch (error) {
        console.error("Extraction Error: ", error);
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error..."
        })
    }
}


// import Extraction from '../models/extraction.model.js';
// import { extractWithAi } from '../utils/ai.utils.js';
// export const extractContent = async (req, res) => {
//     try {
//         if(!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }
//         const base64 = req.file.buffer.toString('base64');
//         const imgdata = `data:${req.file.mimetype};base64,${base64}`;
//         const prompt = 'Analyze this image and extract visible information. If it contains a resume, extract: - Name - Email - Phone - Skills - Education - Experience - Projects If it contains a LinkedIn recruitment post, extract: - Recruiter email, if visible - Recruiter or author name - Company - Job role - Required skills - Post content Return valid JSON. Use null for missing information. Do not invent or guess information. '
//         const extractContentWithAI = await extractWithAI(imgdata, prompt);
//         let parsedata = null;
//         try {
//             const jsonmatch = extractContentWithAI.match(/\{[\s\S]*\}/);
//             const toParse = jsonmatch ? jsonmatch[0] : extractContentWithAI;
//             parsedata = JSON.parse(toParse); 

//         } catch (parseError) {
//             console.log('Error parsing JSON:', parseError);
//             parsedata = { rawContent: extractContentWithAI };
//     }
//     const savedExtraction = await Extraction.create({ 
//         data: parsedata,
//         rawContent: extractContentWithAI,
//         createdBy: req.user._id 
//     });
//     return res.status(200).json({
//         message: 'Content extracted successfully',
//         savedExtraction
//     });
    
// } 
//     catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }


// // import Extraction from ''../models/extraction.model.js';

// // export const extractContent = async(req,res)=>{
// //     try{
// //         if(!req.file){
// //             return res.status(400).json({
// //                 success: false,
// //                 message:"File is required.."
// //             })
// //         }

// //         const base64 = req.file.buffer.toString("base64");

// //         const imageData = `data:${req.file.mimtype};base64,${base64}`;

// //         const prompt = `Analyze this image and extract visible information. If it contains a resume, extract: - Name - Email - Phone - Skills - Education - Experience - Projects If it contains a LinkedIn recruitment post, extract: - Recruiter email, if visible - Recruiter or author name - Company - Job role - Required skills - Post content Return valid JSON. Use null for missing information. Do not invent or guess information. `


// //         const extractContentWithAi = await extractContentWithAi(prompt, imageData);

// //         let parseData = null;
// //         try{
// //             const jsonMatch = extractContentWithAi.match(/\{[\s\S]*\}/);
// //             const toParse = jsonMatch ? jsonMatch[0] : extractContentWithAi;
// //             parseData = JSON.parse(toParse)
// //         } catch(erroe){
// //             console.log("Error while parsing",error.message);
// //             parseData = {rawContent: extractContentWithAi}
// //         }

// //         const savedExtraction = await Extraction.create
// //         ({
// //             data: parseData,
// //             rawContent:extractContentWithAi,
// //             createdBy: req.user._id
// //         })

// //         return res.status(200).json({
// //             success:true,
// //             message:"Extraction Success..",
// //             savedExtraction
// //     })
// //     }catch(error){
// //         console.error("Extraction error:",error);
// //         return res.status(500).json({
// //             success: false,
// //             msg:"Internal Server Error"
// //         })
// //     }
// // }