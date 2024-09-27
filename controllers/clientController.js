const cloudinary = require('../config/cloudinary');
const ClientRepository = require('../repositories/clientRepository');

const clientController = {
    addClient: async (req, res) => {
      
        try {
          console.log(req.body)
            const result = await cloudinary.uploader.upload(req.file.path);
            const newClient = {
                name: req.body.name,
                age: req.body.age,
                phone: req.body.phone,
                passportNumber: req.body.passportNumber,
                photo: result.secure_url,
                status: req.body.status,
            };
            const client = await ClientRepository.createClient(newClient);
            res.json(client);
        } catch (error) {
          console.log(error)
            res.status(500).json({ message: 'Error adding client', error });
        }
    },

    getClients: async (req, res) => {
        try {
            const clients = await ClientRepository.getAllClients();
            res.render('clients', { clients, isAuthenticated: req.session.isAuthenticated });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching clients', error });
        }
    },

    updateClient: async (req, res) => {
        try {
          
            const client = await ClientRepository.getClientById(req.params.id);
            await cloudinary.uploader.destroy(client.photo);  // Assuming photo is the public_id
           
            const result = await cloudinary.uploader.upload(req.file.path);
            const newClient = {
                name: req.body.name,
                age: req.body.age,
                phone: req.body.phone,
                passportNumber: req.body.passportNumber,
                photo: result.secure_url,
                status: req.body.status
            };
            const updatedClient = await ClientRepository.updateClient(req.params.id, newClient);
            console.log(updatedClient)
            res.json(updatedClient);
        } catch (error) {
          console.log(error)
            res.status(500).json({ message: 'Error updating client', error });
        }
    },

    deleteClient: async (req, res) => {
        try {
            const client = await ClientRepository.getClientById(req.params.id);
            await cloudinary.uploader.destroy(client.photo);  // Assuming photo is the public_id
            await ClientRepository.deleteClient(req.params.id);
            res.status(200).json({ message: 'Client deleted successfully', isDeleted: true });
        } catch (error) {
          console.log(error)
            res.status(500).json({ message: 'Error deleting client', error, isDeleted: false });
        }
    }
};

module.exports = clientController;