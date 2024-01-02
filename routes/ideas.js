const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

const ideas = [
    {
        id: 1,
        text: 'AI-Powered Personal Assistant',
        tag: 'Technology',
        username: 'elon musk',
        date: '2023.01.15'
    },
    {
        id: 2,
        text: 'Green Energy Solutions',
        tag: 'Environment',
        username: 'greta thunberg',
        date: '2023.03.22'
    },

    {
        id: 3,
        text: 'Mars Colonization Plan',
        tag: 'Space',
        username: 'neil armstrong',
        date: '2023.05.10'
    },

]

//get all ideas
router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.json({ success: true, data: ideas });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Someting went wrong' });
    }
});


// get single idea 
router.get('/:id', async (req, res) => {
    // const idea = ideas.find((idea) => idea.id === +req.params.id);

    // if (!idea) {
    //     return res
    //         .status(404)
    //         .json({ sucess: false, error: 'Resource not found' });

    // }
    // res.json({ success: true, data: req.params.id });
    try {
        const idea = await Idea.findById(req.params.id);
        res.json({ success: true, data: idea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
});

// add an idea

router.post('/', async (req, res) => {
    const idea = new Idea({
        // id: ideas.length + 1,
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
        // date: new Date().toISOString().slice(0, 10),
    });

    try {
        const savedIdea = await idea.save();
        res.json({ success: true, data: savedIdea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
    //  ideas.push(idea);
    // res.json({ success: true, data: idea });
    //res.send(req.body.text);
});


// update idea
router.put('/:id', async (req, res) => {
    // const idea = ideas.find((idea) => idea.id === +req.params.id);
    // if (!idea) {
    //     return res
    //         .status(404)
    //         .json({ sucess: false, error: 'Resource not found' });
    // }
    // idea.text = req.body.text || idea.text;
    // idea.tag = req.body.tag || idea.tag;

    // res.json({ success: true, data: idea });
    try {
        const updatedIdea = await Idea.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    text: req.body.text,
                    tag: req.body.tag
                }
            },
            { new: true }
        );
        res.json({ sucess: true, data: updatedIdea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ succuess: false, data: 'Something went wrong' });
    }
});

// delete idea 

router.delete('/:id', async (req, res) => {
    // const idea = ideas.find((idea) => idea.id === +req.params.id);
    // if (!idea) {
    //     return res
    //         .status(404)
    //         .json({ sucess: false, error: 'Resource not found' });
    // }
    // const index = ideas.indexOf(idea);
    // ideas.splice(index, 1);
    // res.json({ success: true, data: {} });
    try {
        await Idea.findByIdAndDelete(req.params.id);
        res.json({ success: true, data: {} });
    } catch (error) {
        console.log(error);
        res.status(500).json({ succuess: false, data: 'Something went wrong' });
    }
});

module.exports = router;

