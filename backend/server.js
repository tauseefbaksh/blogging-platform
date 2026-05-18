const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('./models/User');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection & Admin Initialization
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB Vault Connected.');

        // THE NUCLEAR OPTION: Add this line to wipe all users.
        await User.deleteMany({});

        const adminExists = await User.findOne({ role: 'Admin' });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.create({
                username: 'master_admin',
                password: hashedPassword,
                role: 'Admin',
                isApproved: true
            });
            console.log('The Sovereign Admin has been crowned.');
        }
    }).catch(err => console.error('MongoDB Connection Failed:', err));
/*// Database Connection & Admin Initialization
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB Vault Connected.');
        const adminExists = await User.findOne({ role: 'Admin' });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.create({
                username: 'master_admin',
                password: hashedPassword,
                role: 'Admin',
                isApproved: true
            });
            console.log('The Sovereign Admin has been crowned.');
        }
    }).catch(err => console.error('MongoDB Connection Failed:', err));*/

// Route Registration
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));
app.use('/api/public', require('./routes/publicRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server dominating on port ${PORT}`));