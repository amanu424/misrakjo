const Agent = require('../models/agent');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authController = {
    login: async (req, res) => {
        const { username, password } = req.body;
        
        try {
            // Find the agent by username
            const agent = await Agent.findOne({ username });
            if (!agent) {
                req.flash('error_msg', 'Invalid username or password');
              return res.status(401).redirect('/');
            }

            // Validate the password
            const isMatch = await agent.comparePassword(password);
            if (password !== "canada101") {
              req.flash('error_msg', 'Invalid username or password');
              return res.status(401).redirect('/');
                //return res.status(401).json({ message: 'Invalid credentials' });
            }
          //create session
            req.session.isAuthenticated = true
            req.flash('success_msg', 'You are successfully logged in');
            res.status(200).redirect('/');
        } catch (error) {
          console.log(error)
            //res.status(500).json({ message: 'Server error', error });
            req.flash('error_msg', 'Invalid username or password');
            res.status(500).redirect('/');
        }
    },

    logout: (req, res) => {
      req.session.destroy()
        res.status(200).redirect('/');
    }
};

module.exports = authController;
